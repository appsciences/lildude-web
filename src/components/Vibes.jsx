const items = [
  { icon: '🌼', title: 'Soft as a whisper', text: 'Play late, play loud in spirit, not in decibels. Neighbors, roommates and baristas will thank you.' },
  { icon: '🎒', title: 'Drums on the go', text: 'Fold it, pack it, carry it. Busk in the park, jam at the café, shed at home.' },
  { icon: '🌈', title: 'Small stage, big sound', text: 'Made for intimate venues where a full kit would steal the room.' },
  { icon: '💛', title: 'Drums for every kid', text: 'A fraction of the cost of a drumset, so more kids can feel the beat in their hands.' },
]

export default function Vibes() {
  return (
    <section className="section vibes" id="vibes">
      <h2>Good vibes, <span className="script">small footprint</span></h2>
      <div className="grid">
        {items.map((i) => (
          <article className="card" key={i.title}>
            <div className="card-icon">{i.icon}</div>
            <h3>{i.title}</h3>
            <p>{i.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
