'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function CardsPage() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase.from('cards').select('*')
      if (error) {
        console.error('Error fetching cards:', error.message)
      } else {
        setCards(data)
      }
      setLoading(false)
    }

    fetchCards()
  }, [])

  if (loading) return <p className="p-4 text-center">Loading cards...</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Cards</h1>
      {cards.length === 0 && <p>No cards found.</p>}
      {cards.map(card => (
        <div
            key={card.id}
            className="border p-4 mb-4 rounded shadow flex gap-4 items-center"
        >
            <img
            src={card.image_url}
            alt={card.name}
            className="w-20 h-auto rounded"
            />
            <div className="flex-1">
            <h2 className="font-semibold">{card.name}</h2>
            <p className="text-sm text-gray-500">
                {card.set} • {card.language}
            </p>
            </div>
            <button
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            onClick={() => alert(`TODO: Add ${card.name} to portfolio`)}
            >
            + Add
            </button>
        </div>
        ))}
    </div>
  )
}
