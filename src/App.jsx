'use strict'
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CloseIcon from '@mui/icons-material/Close'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import '@nextcloud/dialogs/styles/toast.scss'
import React, { useEffect } from 'react'
import './App.css'
import Dataset from './Dataset'
import { saveFile, loadFile } from './loadsave'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function App(props) {
  const [open, setOpen] = React.useState(props.open)
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [fileInfo, setFileInfo] = React.useState({
    mtime: null,
    dir: null,
    name: null,
    writeable: null,
    mime: null,
  })

  const handleClickOpen = () => {
    setOpen(true)
  }
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
  }, [props.context.dir, props.filename])

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
      fullScreen
      open={open}
      onClose={handleClose}
      style={{ zIndex: 3000 }} // Nextcloud header is 2000
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
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
      {/* <MuiThemeProvider theme={theme}>{content}</MuiThemeProvider> */}
      <div>{content}</div>
    </Dialog>
  )
}

export default App
