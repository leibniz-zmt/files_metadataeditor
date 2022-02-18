import { createTheme, ThemeProvider } from '@mui/material/styles'
import { generateFilePath } from '@nextcloud/router'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.css'
import Dataset from './Dataset'
// import { newFileMenuPlugin } from './newfileplugin'
import { themeOptions } from './themeOptions'

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

  const renderEditor = (filename, context) => {
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
    )
  }

  OCA.Files.fileActions.registerAction({
    name: 'files_metadataedit',
    displayName: 'Edit folder metadata',
    mime: 'application/json',
    filename: 'metadata.json',
    actionHandler: (filename, context) => {
      renderEditor(filename, context)
    },
    permissions: OC.PERMISSION_READ,
    iconClass: 'icon-edit',
    type: OCA.Files.FileActions.TYPE_DROPDOWN, //
  })

  // FIXME: this doesn't work yet.
  const newFileMenuPlugin = {
    attach: function (menu) {
      let fileList = menu.fileList

      // only attach to main file list
      if (fileList.id !== 'files') {
        return
      }
      menu.addMenuEntry({
        id: 'file',
        displayName: 'New metadata.json file',
        templateName: 'metadata.json',
        iconClass: 'icon-filetype-text',
        fileType: 'file',
        actionHandler: function (name) {
          let dir = fileList.getCurrentDirectory()
          // first create the file
          fileList.createFile(name).then(function () {
            // once the file got successfully created,
            // open the editor
            renderEditor(name, { dir: dir })
          })
        },
      })
    },
  }
  // OC.Plugins.register('OCA.Files.NewFileMenu', newFileMenuPlugin)
} else {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Dataset initialData={null} setData={() => {}} />
    </ThemeProvider>,
    document.getElementById(containerId)
  )
}
