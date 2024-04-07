'use client'
import { useEffect, useState } from 'react'

export default function Home() {

  const [input, setInput] = useState<string>('')
  const [searchResults, setSearchResults] = useState<{
    results: string[]
    duration: number
  }>()

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined)
      // once deployed, prefix this with your cloudflare worker url
      // i.e.: https://<name>.<account-name>.workers.dev/api/search?q=${input}

      const res = await fetch(`/api/search?q=${input}`)
      const data = (await res.json()) as { results: string[]; duration: number }
      setSearchResults(data)
    }

    fetchData()
  }, [input])



  return (
   <div>
    <input 
    value={input}
    onChange={(e) => {
      setInput(e.target.value)
    }}

    className='text-zinc-900'
    type="text" />
   </div>
   
  );
}
