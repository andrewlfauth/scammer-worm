import {useState, useEffect} from 'preact/hooks'

export default function Data({inital}) {
  const getData = async () => {
    const res = await fetch('/api/posts')
    const data = await res.json()
  }

  return (
    <div class="flex flex-col space-y-2 items-center mt-14">
      <button
        onClick={getData}
      >
        Genereate
      </button>
      
      {inital.map(d => (
        <div key={d} className="flex justify-between w-full p-4 rounded bg-gray-700 font-semibold items-center">
          <span className="text-white text-lg">{d.number}</span>
          <span className="text-center max-w-sm text-sm">{d.title}</span>
          <span className="text-emerald-400">{d.timeSincePosted}</span>
        </div>
      ))}
    </div>
  )
}
