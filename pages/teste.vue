<template>
  <p class="text-color-alfa">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium
    cupiditate ullam atque eius saepe? Esse ipsum, consequatur, dolorum sed
    labore distinctio quo a expedita quisquam, cupiditate sequi magni nesciunt
    autem?
  </p>
</template>

<script setup>
import { mount } from '@vue/test-utils'
// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

test('displays message', () => {
  const wrapper = mount(MessageComponent, {
    props: {
      msg: 'Hello world'
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')
})
</script>
