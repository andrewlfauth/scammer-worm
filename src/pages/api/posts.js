import getPageData from '../../utils/getPageData'

export async function post({request}) {
  const {pages} = await request.json()
  const data = await Promise.all([
    getPageData(pages[0]),
    getPageData(pages[1]),
  ]).then()
  const merged = [].concat.apply([], data)

  return new Response(JSON.stringify({pages: merged}))
}