import React from 'react'

import Button from './Button'

export default {
  title: 'Button',
  component: Button,
  argTypes: { handleClick: { action: 'handleClick' } }
}

const Template = args => <Button {...args} />

export const Red = Template.bind({})
Red.args = {
  color: 'red',
  name: 'red'
}

export const Blue = Template.bind({})
Blue.args = {
  color: 'blue',
  name: 'blue'
}

export const Yellow = Template.bind({})
Yellow.args = {
  color: 'yellow',
  name: 'yellow'
}
