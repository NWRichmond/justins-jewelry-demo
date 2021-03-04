import getProductResults from './getProductResults'

export default async (productRoutePath) => {
  let nextToken = ''
  const productResults = []
  do {
    const resultsPage = await getProductResults(nextToken)
    productResults.push(resultsPage.items.map((item) => item.handle))
    nextToken = resultsPage.nextToken
  } while (nextToken !== '')

  return productResults
    .reduce((acc, curr) => {
      return acc.concat(curr)
    }, [])
    .map((item) => `${productRoutePath}${item}`)
}
