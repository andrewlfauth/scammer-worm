import getPageData from '../../utils/getPageData'

export async function post({request}) {
  const {pages} = await request.json()
  let data = await Promise.all([
    getPageData(pages[0]),
    getPageData(pages[1]),
  ])
  let merged = [].concat.apply([], data)

  return new Response(JSON.stringify({d: 0}))
}