import getProductRoutes from './getProductRoutes'
import getCollectionRoutes from './getCollectionRoutes'
import getPageRoutes from './getPageRoutes'
import getArticleRoutes from './getArticleRoutes'

const productRoutePath = '/products/'
const collectionRoutePath = '/collections/'
const pageRoutePath = '/pages/'
const articleRoutePath = '/articles/'

export default async () => {
  const routesArrays = await Promise.all([
    getProductRoutes(productRoutePath),
    getCollectionRoutes(collectionRoutePath),
    getPageRoutes(pageRoutePath),
    getArticleRoutes(articleRoutePath)
  ])
  return routesArrays.reduce((acc, curr) => {
    return acc.concat(curr)
  }, [])
}
