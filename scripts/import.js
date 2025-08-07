import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })


// 🔧 CHANGE THIS SET ID TO WHATEVER YOU WANT
const SET_ID = 'base1' // Example: celebrations set

// 🔑 Supabase config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// 🔑 Pokémon TCG API config
const POKEMON_API_KEY = process.env.POKEMON_TCG_API_KEY

async function importSetCards(setId) {
  console.log(`🔄 Importing cards from set: ${setId}`)

  const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`, {
    headers: {
      'X-Api-Key': POKEMON_API_KEY
    }
  })

  const { data } = await response.json()

  for (const card of data) {
    const { name, set, images, rarity, id } = card

    const { error } = await supabase.from('cards').insert({
      name,
      set: set.name,
      language: 'English',
      rarity: rarity || 'Unknown',
      tcgplayer_id: id,
      image_url: images?.small || null
    })

    if (error) {
      console.error(`❌ Failed to insert ${name}:`, error.message)
    } else {
      console.log(`✅ Inserted: ${name}`)
    }
  }

  console.log(`✅ Finished importing ${data.length} cards from set: ${setId}`)
}

importSetCards(SET_ID)
