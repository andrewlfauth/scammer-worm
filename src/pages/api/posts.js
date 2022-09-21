import getPageData from '../../utils/getPageData'

export async function get({request}) {
  const data = await Promise.all([
    getPageData("1"),
    getPageData("2"),
  ]).then()
  const merged = [].concat.apply([], data)

  return new Response(JSON.stringify(merged))
}