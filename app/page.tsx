'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage(error.message)
    else setMessage('Check your email for the login link!')
  }

  return (
    <main className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">PokePrice 🔥</h1>
      <input
        className="p-2 border rounded w-full mb-4"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Get Login Link
      </button>
      <p className="mt-4 text-green-600">{message}</p>
    </main>
  )
}
