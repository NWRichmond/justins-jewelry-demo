import getData from './getData'

export default async (pageRoutePath) => {
  const pageData = await getData(`
    query {
      getContent {
        items {
          type
          handle
        }
      }
    }
  `)
  if (pageData.getContent && pageData.getContent.items) {
    return pageData.getContent.items
      .filter((item) => item.type === 'page')
      .map((item) => `${pageRoutePath}${item.handle}`)
  }
  return []
}
