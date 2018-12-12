import * as React from 'react'

import TogglerExample from './examples/Toggler'
import AsyncJobExample from './examples/AsyncJob'

class HookExamples extends React.Component {
  render() {
    return (
      <>
        <AsyncJobExample />
        <TogglerExample />
      </>
    )
  }
}

export default HookExamples