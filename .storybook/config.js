import { addParameters, configure } from '@storybook/react'

addParameters({
  options: {
    panelPosition: 'right',
  }
})

function loadStories() {
  require('../stories/FinalFormInMUI')
  require('../stories/DnD')
  require('../stories/Downshift')
  require('../stories/Hooks')
  require('../stories/MUIReactTables')
  // You can require as many stories as you need.
}

configure(loadStories, module)