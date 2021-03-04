import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import MainNavWishlist from '@/components/nacelle/MainNavWishlist'
import createStoreConfig from '@/tests/storeConfig'

describe('Main Nav Wishlist Button', () => {
  it('renders the button', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)
    const wrapper = shallowMount(MainNavWishlist, {
      localVue,
      store,
      propsData: {},
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.find('.main-nav-wishlist').exists()).toBe(true)
  })

  it('shows wishlist item count', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)

    const variant = {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQwMQ==',
      price: '29.99',
      availableForSale: true,
      selectedOptions: [
        {
          name: 'Size',
          value: 'Small'
        }
      ]
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
              values: ['Small']
            }
          ]
        },
        variant
      }
    ]

    const wrapper = shallowMount(MainNavWishlist, {
      localVue,
      store,
      propsData: {},
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(+wrapper.find('.wishlist-count').text()).toBe(1)
  })
})
