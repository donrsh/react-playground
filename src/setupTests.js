import * as R from 'ramda'

// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each'

// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect'

import { prettyDOM } from 'dom-testing-library'

console.dom = R.pipe(prettyDOM, console.log)
