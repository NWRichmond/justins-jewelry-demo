import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'

import ProductOptionSwatch from '@/components/nacelle/ProductOptionSwatch'
import storeConfig from '@/tests/storeConfig'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(storeConfig())

describe('ProductOptionSwatch.vue', () => {
  const wrapper = shallowMount(ProductOptionSwatch, {
    store,
    localVue,
    propsData: {
      value: 'Small',
      optionName: 'Size',
      swatchStyle: 'tab',
      selectedOptions: [],
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODg3MjA2MTcxNDUzNw==',
          price: '43.0',
          availableForSale: true,
          selectedOptions: [
            {
              name: 'Size',
              value: 'Small'
            },
            {
              name: 'Color',
              value: 'Red'
            }
          ]
        }
      ]
    }
  })

  it('renders a swatch', () => {
    expect(wrapper.findAll('div').exists()).toBe(true)
    expect(wrapper.text()).toBe('Small')
  })
})
