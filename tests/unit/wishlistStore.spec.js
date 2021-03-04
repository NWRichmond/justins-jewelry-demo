import Vue from 'vue'
import Vuex from 'vuex'
import storeConfig from '@/tests/storeConfig'
Vue.use(Vuex)

describe('Wishlist Store', () => {
  it('adds a product to items array', () => {
    const store = new Vuex.Store(storeConfig())
    const variant = {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
    }
    store.dispatch('wishlist/addToWishlist', {
      product: {
        priceRange: {
          min: '10.99',
          max: '29.99'
        },
        title: 'Awesome T-Shirt',
        category: "Men's Shirts",
        featuredMedia: {
          src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
          thumbnailSrc:
            'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        description:
          "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        availableForSale: true,
        variants: [variant],
        options: [
          {
            name: 'Size',
            values: ['xs', 's']
          }
        ]
      },
      variant
    })
    expect(store.state.wishlist.items.length).toEqual(1)
  })

  it('removes a product from the items array', () => {
    const store = new Vuex.Store(storeConfig())
    const variant = {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
    }
    store.state.wishlist.items = [
      {
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          availableForSale: true,
          variants: [variant],
          options: [
            {
              name: 'Size',
              values: ['xs', 's']
            }
          ]
        },
        variant
      }
    ]
    store.dispatch('wishlist/removeFromWishlist', {
      variantId: store.state.wishlist.items[0].variant.id
    })
    expect(store.state.wishlist.items).toEqual([])
  })

  it('clears items from wishlist', () => {
    const store = new Vuex.Store(storeConfig())
    const variant = {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
    }
    store.state.wishlist.items = [
      {
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          availableForSale: true,
          variants: [variant],
          options: [
            {
              name: 'Size',
              values: ['xs', 's']
            }
          ]
        },
        variant
      }
    ]
    store.dispatch('wishlist/resetWishlist')
    expect(store.state.wishlist.items).toEqual([])
  })

  it('returns item by variant Id', () => {
    const store = new Vuex.Store(storeConfig())
    const variant = {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
    }
    store.state.wishlist.items = [
      {
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          availableForSale: true,
          variants: [variant],
          options: [
            {
              name: 'Size',
              values: ['xs', 's']
            }
          ]
        },
        variant
      }
    ]
    const item = store.getters['wishlist/getItemByVariantId'](variant.id)
    expect(item.variant.id).toEqual(variant.id)
  })

  it('returns quantity total', () => {
    const store = new Vuex.Store(storeConfig())
    const variant = {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
    }
    store.state.wishlist.items = [
      {
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          availableForSale: true,
          variants: [variant],
          options: [
            {
              name: 'Size',
              values: ['xs', 's']
            }
          ]
        },
        variant
      }
    ]

    expect(store.getters['wishlist/quantityTotal']).toEqual(1)
  })
})
