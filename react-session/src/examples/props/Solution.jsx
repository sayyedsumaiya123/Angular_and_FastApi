function PricingCard({ plan, price, features, popular }) {
  return (
    <div className="card">
      <span className="badge">{popular ? 'Most Popular' : 'Plan'}</span>
      <h1 className="ev-title">{plan}</h1>
      <p className="going">₹{price} / month</p>
      {features.map((feature) => (
        <p key={feature} className="desc">✓ {feature}</p>
      ))}
      <button className="btn">Choose {plan}</button>
    </div>
  )
}

function App() {
  return (
    <main className="page">
      <PricingCard
        plan="Basic"
        price={0}
        features={['Campus events', 'Clubs & societies']}
      />
      <PricingCard
        plan="Pro"
        price={99}
        features={['Campus events', 'Clubs & societies', 'Reward points']}
        popular
      />
    </main>
  )
}

export default App