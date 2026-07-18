import { useState } from 'react'
import { subscribe } from '../../utils/api'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await subscribe(email)
      toast.success('Subscribed successfully!')
      setEmail('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to subscribe')
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-black rounded-2xl p-6 sm:p-8 text-center">
      <div className="text-white text-xs font-bold uppercase tracking-widest mb-2 border border-white/20 inline-block px-3 py-1 rounded">Newsletter</div>
      <h2 className="text-white text-2xl font-black mt-3 mb-2">Stay Informed. Every Day.</h2>
      <p className="text-gray-400 text-sm mb-6">Get the biggest stories from Nigeria, Africa and the world — delivered free to your inbox.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 bg-white text-black px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none outline-none text-sm w-full"
        />
        <button type="submit" disabled={loading}
          className="bg-white text-black px-5 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 sm:border-l sm:border-gray-300 whitespace-nowrap w-full sm:w-auto">
          {loading ? '...' : 'Subscribe Free'}
        </button>
      </form>
    </div>
  )
}