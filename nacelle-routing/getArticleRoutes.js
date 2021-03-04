import getData from './getData'

export default async (articleRoutePath) => {
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
      .filter((item) => item.type === 'article')
      .map((item) => `${articleRoutePath}${item.handle}`)
  }
  return []
}
