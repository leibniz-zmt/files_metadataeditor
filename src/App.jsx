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
import { showError } from '@nextcloud/dialogs'
import { generateUrl } from '@nextcloud/router'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import Dataset from './components/Dataset'
import { themeOptions } from './themeOptions'

/**
 * Load file contents through app API.
 * @constructor
 * @param {string} dir - directory name
 * @param {string} filename - filename
 */
function loadFile(dir, filename, success) {
  fetch(
    generateUrl(
      '/apps/webpack_test/ajax/loadfile?' +
        new URLSearchParams({
          filename: filename,
          dir: dir,
        })
    ),
    {
      headers: {
        requesttoken: OC.requestToken,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        showError(data.message)
        return null
      }
      // Call success callback
      success(data.filecontents)
    })
}

/**
 * Send the new file data back to the server
 */
function saveFile(data, file, success, failure) {
  // Send the post request
  var path = file.dir + file.name
  if (file.dir !== '/') {
    path = file.dir + '/' + file.name
  }
  fetch(generateUrl('/apps/webpack_test/ajax/savefile'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      requesttoken: OC.requestToken,
    },
    body: JSON.stringify({
      filecontents: data,
      path: path,
      mtime: file.mtime,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        failure(data.message)
      } else {
        success(data)
      }
    })
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function App(props) {
  const [open, setOpen] = React.useState(true)
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    ReactDOM.unmountComponentAtNode(document.getElementById(props.containerId))
  }

  useEffect(() => {
    fetch(
      generateUrl(
        '/apps/webpack_test/ajax/loadfile?' +
          new URLSearchParams({
            filename: props.filename,
            dir: props.context.dir,
          })
      ),
      {
        headers: {
          requesttoken: OC.requestToken,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then((data) => {
        setData(data.filecontents)
      })
      .catch((error) => {
        console.error('Error fetching schema: ', error.message)
        setError(error)
      })
      .finally(() => setLoading(false))
  }, [props.filename])

  let theme = createTheme(themeOptions)

  useEffect(() => {
    loadFile(props.context.dir, props.filename, setData), []
  })

  let content
  if (loading) {
    content = <div className="spinner-border" role="status"></div>
  } else {
    content = <Dataset initialData={data} />
    // content = <div className="spinner-border" role="status"></div>
    // content = <p>{data}</p>
  }
  if (error) {
    showError(error)
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
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <MuiThemeProvider theme={theme}>
        {/* <Dataset data={data} /> ? !loading :{' '} */}
        {/* <div className="spinner-border" role="status"></div> */}
        {content}
      </MuiThemeProvider>
    </Dialog>
  )
}

export default App
