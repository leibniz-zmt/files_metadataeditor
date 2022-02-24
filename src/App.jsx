'use strict'
import CloseIcon from '@mui/icons-material/Close'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import '@nextcloud/dialogs/styles/toast.scss'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import './App.css'
import Dataset from './Dataset'
import { loadFile, saveFile } from './loadsave'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function App(props) {
	const [open, setOpen] = React.useState(true)
	const [data, setData] = React.useState(null)
	const [error, setError] = React.useState(null)
	const [loading, setLoading] = React.useState(true)
	const [fileInfo, setFileInfo] = React.useState({
		dir: null, // string
		name: null, // string
		writeable: null, // bool
		mime: null, // int
	})

	const handleClose = () => {
		setOpen(false)
		// ReactDOM.unmountComponentAtNode(document.getElementById(props.containerId))
	}

	useEffect(() => {
		loadFile(
			props.filename,
			props.context.dir,
			setData,
			setFileInfo,
			() => setError(true),
			() => setLoading(false)
		)
		setOpen(true)
	}, [props.context.dir, props.filename, props.sessionToken])

	let content
	if (loading) {
		content = <div className="spinner-border" role="status"></div>
	} else {
		content = <Dataset initialData={data} setData={setData} />
	}
	if (error) {
		handleClose()
	}

	return (
		<Dialog
			fullScreen={true}
			open={open}
			onClose={handleClose}
			style={{ zIndex: 2001 }} // Nextcloud header is 2000
			TransitionComponent={Transition}
			id={'metadataeditor'}
			className={'remove-all-styles'}
		>
			<AppBar>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						{props.filename}
					</Typography>
					<Button
						autoFocus
						color="inherit"
						onClick={() => saveFile(data, fileInfo, setFileInfo)}
					>
						save
					</Button>
				</Toolbar>
			</AppBar>
			{content}
		</Dialog>
	)
}

App.propTypes = {
	filename: PropTypes.string.isRequired,
	open: PropTypes.bool,
	context: PropTypes.object,
	sessionToken: PropTypes.string,
}
