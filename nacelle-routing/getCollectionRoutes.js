import getData from './getData'

export default async (collectionRoutePath) => {
  const collectionData = await getData(`
    query {
      getCollections {
        items {
          handle
        }
      }
    }
  `)

  return collectionData.getCollections.items.map(
    (item) => `${collectionRoutePath}${item.handle}`
  )
}
