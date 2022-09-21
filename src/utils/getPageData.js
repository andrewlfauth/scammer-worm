import { dateToTimeAgo, formatPhoneNumber } from "./formatting"

export default async function getPageData(page) {
  const url = `https://scammer.info/latest.json?no_definitions=true&page=${page}`

  const res = await fetch(url)
  const data = await res.json()
  let regexp = new RegExp(
    "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+","g"
    )
    
  const topics = data.topic_list.topics

  const posts = topics.map(p => {
    let title = p.title
    
    // use regexp to extract a phone number if present
    let matches = regexp.exec(p.title)
  
    if (!matches || matches[0].length <10) return 
  
    // format phone number match
    let rawNumber = matches[0]
    let strippedNumber = 
      rawNumber.replaceAll(/-|\(|\)|\+| /g, '')       
    let formattedNumber = formatPhoneNumber(strippedNumber)
  
    // format posted at date
    let unformattedDate = p['last_posted_at']
    
    return {
      title,
      number: formattedNumber,
      unformattedDate,
      timeSincePosted: dateToTimeAgo(new Date(unformattedDate))
    }
  })
  return posts.filter(p => p)
}