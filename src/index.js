import { createTheme, ThemeProvider } from '@mui/material/styles'
import { generateFilePath } from '@nextcloud/router'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.css'
import Dataset from './Dataset'
import { themeOptions } from './themeOptions'

const theme = createTheme(themeOptions)

const containerId = 'files_metadataeditor'

let contentTag = document.getElementById('content')
let container = document.createElement('div')
container?.setAttribute('id', containerId)
contentTag?.append(container)

const generateToken = (size) =>
	[...Array(size)]
		.map(() => Math.floor(Math.random() * 16).toString(16))
		.join('')

// if we're running in Nextcloud register and render App
if ('OC' in window) {
	const script = document.querySelector('[nonce]')
	// eslint-disable-next-line no-undef
	__webpack_require__.nc = script.nonce || script.getAttribute('nonce')
	// eslint-disable-next-line no-undef
	__webpack_public_path__ = generateFilePath('files_metadataeditor', '', 'js/')
	// eslint-disable-next-line no-undef
	__webpack_nonce__ = btoa(OC.requestToken)

	const renderEditor = (filename, context) => {
		ReactDOM.render(
			<ThemeProvider theme={theme}>
				<App
					filename={filename}
					context={context}
					containerId={containerId}
					open={true}
					sessionToken={generateToken(32)}
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

	const newFileMenuPlugin = {
		attach: function (menu) {
			let fileList = menu.fileList

			// only attach to main file list
			if (fileList.id !== 'files') {
				return
			}
			menu.addMenuEntry({
				id: 'new-metadata-file',
				displayName: 'New metadata.json file',
				templateName: 'metadata.json',
				iconClass: 'icon-filetype-text',
				fileType: 'application/json',
				actionHandler: function (name) {
					let dir = fileList.getCurrentDirectory()
					fileList.createFile(name).then(function () {
						renderEditor(name, { dir: dir })
					})
				},
			})
		},
	}
	OC.Plugins.register('OCA.Files.NewFileMenu', newFileMenuPlugin)
} else {
	// Render only Dataset JSONForms
	ReactDOM.render(
		<ThemeProvider theme={theme}>
			<Dataset initialData={null} setData={() => {}} />
		</ThemeProvider>,
		document.getElementById(containerId)
	)
}
