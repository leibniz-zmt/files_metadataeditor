import React from 'react'
import ReactDOM from 'react-dom'
import { generateFilePath } from '@nextcloud/router'

import App from './ExampleForm'

// check if we're running in Nextcloud
if ('OC' in window) {

  const script = document.querySelector('[nonce]')
  __webpack_require__.nc = script.nonce || script.getAttribute('nonce')
  __webpack_public_path__ = generateFilePath('webpack_test', '', 'js/')
  __webpack_nonce__ = btoa(OC.requestToken)

  $('#app-content').append('<div id=webpack_test></div>')

  // ReactDOM.render(<div>{title}</div>, document.getElementById('webpack_test'))

  alert('Running in Nextcloud!')

  OCA.Files.fileActions.registerAction({
    name: 'webpack_test',
    displayName: 'Test Webpack and React',
    mime: 'application/json',
    filename: 'metadata.json',
    actionHandler: () => alert('Tada'),
    permissions: OC.PERMISSION_READ,
    iconClass: 'icon-edit',
    type: OCA.Files.FileActions.TYPE_DROPDOWN, //
  })
}
else {
  ReactDOM.render( React.createElement(App, null), document.getElementById('app'))
}
