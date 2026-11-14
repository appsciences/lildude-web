const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
const items = [
  { path: 'M8 7a4 4 0 0 1 8 0M6 9h12a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9a1 1 0 0 1 1-1zM9 15h6',
    title: 'sheds to cafés', text: 'fold it, pack it, carry it. shed at home, busk in the park, jam at the café.' },
  { path: 'M12 3c1.5 2.5 1.5 4.5 0 6.5C10.5 7.5 10.5 5.5 12 3zM12 14.5c1.5 2.5 1.5 4.5 0 6.5-1.5-2-1.5-4 0-6.5zM3 12c2.5-1.5 4.5-1.5 6.5 0C7.5 13.5 5.5 13.5 3 12zM14.5 12c2-1.5 4-1.5 6.5 0-2.5 1.5-4.5 1.5-6.5 0z',
    title: 'soft as a whisper', text: 'play late, play loud in spirit, not in decibels. neighbors, roommates and baristas will thank you.' },
  { path: 'M3 18a9 9 0 0 1 18 0M7 18a5 5 0 0 1 10 0M11 18a1 1 0 0 1 2 0',
    title: 'small stage, big sound', text: 'made for intimate venues where a full kit would steal the room.' },
  { path: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
    title: 'drums for every kid', text: 'a fraction of the cost of a drumset, so more kids can feel the beat in their hands.' },
]

export default function Vibes() {
  return (
    <section className="section vibes" id="vibes">
      <h2>good vibes, small footprint</h2>
      <div className="grid">
        {items.map((i) => (
          <article className="card" key={i.title}>
            <svg className="card-icon" width="44" height="44" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d={i.path} /></svg>
            <h3>{i.title}</h3>
            <p>{i.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
