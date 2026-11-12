import { useState } from 'react'
import { submit } from '../firebase.js'
import { links, PRICE } from '../config.js'

function useForm(collectionName, source) {
  const [state, setState] = useState({ status: 'idle', error: '' })
  const send = async (data) => {
    setState({ status: 'loading', error: '' })
    try {
      await submit(collectionName, source ? { ...data, source } : data)
      setState({ status: 'done', error: '' })
      return true
    } catch (e) {
      setState({ status: 'error', error: e.message || 'Something went sideways. Try again?' })
      return false
    }
  }
  return [state, send]
}

function Status({ state, thanks }) {
  if (state.status === 'done') return <p className="ok">{thanks}</p>
  if (state.status === 'error') return <p className="err">{state.error}</p>
  return null
}

function Waitlist() {
  const [state, send] = useForm('waitlist', 'site')
  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    send({ name: f.get('name').trim(), email: f.get('email').trim() })
  }
  return (
    <form onSubmit={onSubmit} className="form">
      <p>Be first in line when the next batch of Lil Dudes is ready.</p>
      <input name="name" placeholder="Your name" required maxLength={80} />
      <input name="email" type="email" placeholder="Email" required maxLength={200} />
      <button className="btn btn-primary" disabled={state.status === 'loading'}>
        {state.status === 'loading' ? 'Sending good vibes…' : 'Put me on the list'}
      </button>
      <Status state={state} thanks="You're on the list! Peace ✌️ We'll be in touch." />
    </form>
  )
}

function Preorder() {
  const [state, send] = useForm('preorders')
  const onSubmit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const ok = await send({
      name: f.get('name').trim(),
      email: f.get('email').trim(),
      color: f.get('color'),
      quantity: Number(f.get('quantity')),
    })
    if (ok && links.preorder) window.location.href = links.preorder
  }
  return (
    <form onSubmit={onSubmit} className="form">
      <p>Reserve yours from the first batch — about <strong>${PRICE}</strong> each (placeholder price).</p>
      <input name="name" placeholder="Your name" required maxLength={80} />
      <input name="email" type="email" placeholder="Email" required maxLength={200} />
      <div className="row">
        <select name="color" defaultValue="Sunrise">
          <option>Sunrise</option><option>Forest</option><option>Ocean</option><option>Natural wood</option>
        </select>
        <input name="quantity" type="number" min="1" max="10" defaultValue="1" aria-label="Quantity" />
      </div>
      <button className="btn btn-primary" disabled={state.status === 'loading'}>
        {state.status === 'loading' ? 'Reserving…' : 'Pre-order'}
      </button>
      <Status state={state} thanks="Reserved! Check your inbox for next steps. 🌻" />
    </form>
  )
}

function Donate() {
  const amounts = [10, 25, 50, 100]
  return (
    <div className="form">
      <p>Chip in so a kid can have a Lil Dude of their own. Every drum counts.</p>
      <div className="amounts">
        {amounts.map((a) => (
          <a key={a} className={`btn btn-ghost ${links.donate ? '' : 'disabled'}`}
            href={links.donate ? `${links.donate}?prefilled_amount=${a * 100}` : undefined}
            target="_blank" rel="noopener noreferrer">${a}</a>
        ))}
      </div>
      <a className={`btn btn-primary ${links.donate ? '' : 'disabled'}`}
        href={links.donate || undefined} target="_blank" rel="noopener noreferrer">
        {links.donate ? 'Donate any amount' : 'Donations opening soon'}
      </a>
    </div>
  )
}

const tabs = [
  { id: 'waitlist', label: '🌀 Waiting list', Comp: Waitlist },
  { id: 'preorder', label: '🥁 Pre-order', Comp: Preorder },
  { id: 'donate', label: '💛 Donate', Comp: Donate },
]

export default function Join() {
  const [tab, setTab] = useState('waitlist')
  const Active = tabs.find((t) => t.id === tab).Comp
  return (
    <section className="section join" id="join">
      <h2>Join the <span className="script">circle</span></h2>
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id}
            className={tab === t.id ? 'tab on' : 'tab'} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      <div className="panel"><Active /></div>
    </section>
  )
}
