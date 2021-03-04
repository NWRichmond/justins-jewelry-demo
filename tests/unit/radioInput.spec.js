import { shallowMount } from '@vue/test-utils'
import RadioInput from '@/components/nacelle/RadioInput'

const wrapper = shallowMount(RadioInput, {})
const input = wrapper.find('input')

describe('RadioInput.vue', () => {
  it('renders a radio input', () => {
    expect(input.exists()).toBe(true)
    expect(input.attributes().type).toBe('radio')
  })

  it('is checked when passed a checked prop', async () => {
    await wrapper.setProps({
      checked: true
    })
    expect(wrapper.vm.checked).toBe(true)
  })

  // TODO: [DRAMS-1340] expect(input.attributes('aria-checked')).toBe('true')
})
