import getData from './getData'

export default async (nextToken) => {
  const productResults = await getData(`
    query {
      getProducts(first: 200, after:"${nextToken}") {
        items {
          handle
        }
        nextToken
      }
    }
  `)

  return productResults.getProducts
}
