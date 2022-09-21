import {useState, useEffect, useRef, useCallback} from 'preact/hooks'
import Spinner from './Spinner'

function Data({inital}) {
  const loader = useRef()
  const [data, setData] = useState(inital)
  const nextPages = useRef([2,3])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const handleObserver = useCallback(async (entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setLoading(true)
      
      let res = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({pages: nextPages.current})
      })
      
      let newData = await res.json()
      
      if (newData?.error) {
        setLoading(false)
        return setError(newData.error)
      }

      setData(cur => [...cur, ...newData])
      setLoading(false)
      
      nextPages.current = [
        nextPages.current[0] + 2, 
        nextPages.current[1] + 2
      ]
 
    }
  }, [nextPages])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    }
    const observer = 
      new IntersectionObserver(handleObserver, options)
    
    if (loader.current && !error) observer.observe(loader.current)
    
  }, [handleObserver, error])

  return (
    <div class="flex flex-col space-y-2 items-center mt-14">
      <div className='absolute top-2 left-2'>{nextPages[0]} {nextPages[1]}</div> 
      {data.map(d => (
        <div key={d} className="flex justify-between w-full p-4 rounded bg-gray-700 font-semibold items-center lg:w-[800px]">
          <span className="text-white text-lg">{d.number}</span>
          <span className="text-center max-w-sm text-sm">{d.title}</span>
          <span className="text-emerald-400">{d.timeSincePosted}</span>
        </div>
      ))}
      <div ref={loader}>
        {error ? error : 
          loading ? <Spinner /> : ""
        }
      </div>
    </div>
  )
}

export default Data