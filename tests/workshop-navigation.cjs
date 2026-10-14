const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    for (const port of [5174, 5175]) {
      const page = await browser.newPage();
      const errors = [];
      page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      await page.goto(`http://127.0.0.1:${port}/`);
      const output = page.locator('.interactive-preview');
      const code = page.locator('.theory-and-code');
      const next = page.getByRole('button', { name: 'Next →', exact: true });
      await output.waitFor({ state: 'visible' });
      assert.equal(await code.isVisible(), false, 'First screen must hide the code');
      assert.equal(await page.getByRole('button', { name: port === 5174 ? 'Solution UI' : 'Solution API', exact: true }).getAttribute('aria-pressed'), 'true');
      await page.getByRole('button', { name: 'See code & explanation →', exact: true }).click();
      assert.equal(await code.isVisible(), true);
      assert.equal(await output.isVisible(), false);
      await page.getByRole('button', { name: 'Expand view', exact: true }).click();
      assert.equal(await page.getByRole('dialog', { name: 'Lesson workspace' }).count(), 1);
      await next.click();
      assert.equal(await output.isVisible(), true, 'Next must start with output');
      assert.equal(await code.isVisible(), false);
      assert.equal(await page.getByRole('dialog').count(), 1, 'Next must keep expanded view');
      await page.getByRole('button', { name: 'Previous', exact: true }).click();
      assert.match(await page.locator('.lesson-progress').innerText(), /Lesson 1 of/);
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('dialog').count(), 0);

      // Demo state survives code/output switches and expanding/closing the same lesson.
      if (port === 5174) {
        await next.click();
        await output.getByRole('button', { name: 'Register Now', exact: true }).click();
        assert.match(await output.innerText(), /You are registered/);
      } else {
        await output.getByRole('button', { name: /Send Request/ }).click();
        await output.getByRole('button', { name: 'Send Request', exact: true }).waitFor();
        await page.waitForTimeout(250);
        await next.click();
        await output.locator('input').first().fill('99');
        await output.getByRole('button', { name: 'Test', exact: true }).click();
      }
      const before = await output.innerText();
      await page.getByRole('button', { name: '2. Code & explanation', exact: true }).click();
      await page.getByRole('button', { name: 'Expand view', exact: true }).click();
      await page.getByRole('button', { name: '1. Output', exact: true }).click();
      assert.equal(await output.innerText(), before, 'Expanding should preserve demo state');
      await page.keyboard.press('Escape');
      await page.getByRole('button', { name: 'Reset demo', exact: true }).click();
      assert.notEqual(await output.innerText(), before, 'Reset should restore the demo');

      // Every core lesson, including part boundaries and the final disabled Next.
      await page.getByRole('button', { name: /Part 1 · Basics/ }).click();
      await page.getByRole('button', { name: 'Expand view', exact: true }).click();
      let steps = 0;
      while (await next.count()) {
        assert.equal(await output.isVisible(), true);
        await page.getByRole('button', { name: '2. Code & explanation', exact: true }).click();
        assert.equal(await code.isVisible(), true);
        await next.click();
        assert.equal(await page.getByRole('dialog').count(), 1);
        assert.ok(++steps < 30, 'Navigation must terminate');
      }
      assert.equal(await page.getByRole('button', { name: 'Workshop complete', exact: true }).isDisabled(), true);
      assert.match(await page.locator('.lesson-progress').innerText(), /Part 2/);
      await page.keyboard.press('Escape');
      // Optional topics must render and hiding them must return to a valid output.
      await page.getByRole('button', { name: 'Show optional topics', exact: true }).click();
      const sidebarItems = page.locator('.sidebar .nav-item');
      const itemCount = await sidebarItems.count();
      for (let index = 0; index < itemCount; index++) {
        await sidebarItems.nth(index).click();
        assert.equal(await output.isVisible(), true);
        await page.getByRole('button', { name: '2. Code & explanation', exact: true }).click();
        assert.equal(await code.isVisible(), true);
      }
      await page.getByRole('button', { name: 'Hide optional topics', exact: true }).click();
      assert.equal(await output.isVisible(), true);

      // The expanded toolbar remains accessible on phones with no horizontal overflow.
      await page.setViewportSize({ width: 390, height: 844 });
      await page.getByRole('button', { name: 'Expand view', exact: true }).click();
      assert.equal(await next.isVisible(), true);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
      await next.click();
      assert.equal(await output.isVisible(), true);
      await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(() => document.querySelector('.expanded-workspace').contains(document.activeElement)));
      assert.deepEqual(errors, [], 'Browser errors: ' + errors.join('\n'));
      console.log(`PASS: workshop ${port} — screens, state, expanded navigation, ${steps + 1} core lessons, optional topics, mobile, keyboard`);
      await page.close();
    }

    const angularApp = await browser.newPage();
    const angularErrors = [];
    angularApp.on('pageerror', error => angularErrors.push(error.message));
    angularApp.on('console', message => { if (message.type() === 'error') angularErrors.push(message.text()); });
    await angularApp.goto('http://127.0.0.1:4200/');
    await angularApp.getByRole('heading', { name: 'Event Management System' }).waitFor();
    const eventCard = angularApp.locator('app-event-card').filter({ hasText: 'Angular 18 & Signals Masterclass' });
    const registered = eventCard.getByRole('button', { name: 'Registered' });
    const rsvp = eventCard.getByRole('button', { name: 'RSVP Now' });
    const initialSeats = await eventCard.innerText();
    await registered.click();
    const cancelledSeats = await eventCard.innerText();
    assert.notEqual(cancelledSeats, initialSeats, 'Canceling an RSVP restores capacity');
    await rsvp.click();
    const rsvpSeats = await eventCard.innerText();
    assert.equal(rsvpSeats, initialSeats, 'RSVP restores the initial seat count');
    await rsvp.click();
    assert.equal(await eventCard.innerText(), initialSeats, 'A duplicate RSVP must not consume a second seat');
    await angularApp.getByRole('button', { name: '+ Publish Event' }).click();
    assert.equal(await angularApp.getByRole('button', { name: 'Publish Event' }).isDisabled(), true);
    await angularApp.getByRole('button', { name: 'Cancel', exact: true }).click();
    assert.deepEqual(angularErrors, [], 'Standalone Angular app must have no browser errors');
    console.log('PASS: standalone Angular � rendering, seat restoration, RSVP guards, form validation');
    await angularApp.close();
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

