import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from 'components-ui'

export default {
    title: 'Example/Button',
    component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Example = Template.bind({})

Example.args = {
    children: 'Button',
    size: 'Medium',
    type: 'Primary',
    onClick: () => null,
}
