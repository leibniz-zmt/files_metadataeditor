import React from 'react'
import ReactDOM from 'react-dom'
import { generateFilePath } from '@nextcloud/router'

import App from './App'
import Dataset from './Dataset'
import './App.css'

import { themeOptions } from './themeOptions'
import { ThemeProvider, createTheme } from '@mui/material/styles'
const theme = createTheme(themeOptions)

const containerId = 'files_metadataeditor'

let contentTag = document.getElementById('content')
let container = document.createElement('div')
container?.setAttribute('id', containerId)
contentTag?.append(container)

// check if we're running in Nextcloud
if ('OC' in window) {
  const script = document.querySelector('[nonce]')
  __webpack_require__.nc = script.nonce || script.getAttribute('nonce')
  __webpack_public_path__ = generateFilePath('files_metadataeditor', '', 'js/')
  __webpack_nonce__ = btoa(OC.requestToken)

  OCA.Files.fileActions.registerAction({
    name: 'files_metadataedit',
    displayName: 'Edit folder metadata',
    mime: 'application/json',
    filename: 'metadata.json',
    actionHandler: (filename, context) =>
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          <App
            filename={filename}
            context={context}
            containerId={containerId}
            open={true}
          />
        </ThemeProvider>,
        document.getElementById(containerId)
      ),
    permissions: OC.PERMISSION_READ,
    iconClass: 'icon-edit',
    type: OCA.Files.FileActions.TYPE_DROPDOWN, //
  })
} else {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Dataset initialData={null} setData={() => {}} />
    </ThemeProvider>,
    document.getElementById(containerId)
  )
}
