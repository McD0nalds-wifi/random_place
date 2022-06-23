import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CheckBox } from 'components-ui'

export default {
    title: 'Example/CheckBox',
    component: CheckBox,
} as ComponentMeta<typeof CheckBox>

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />

export const Example = Template.bind({})

Example.args = {
    isChecked: false,
    title: 'title',
    onChange: () => null,
}
