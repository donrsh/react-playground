import { addDecorator, configure } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'

addDecorator(
  withOptions({
    addonPanelInRight: true
  })
)

function loadStories() {
  require('../stories/FinalFormInMUI')
  require('../stories/DnD')
  require('../stories/Downshift')
  require('../stories/Hooks')
  // You can require as many stories as you need.
}

configure(loadStories, module)