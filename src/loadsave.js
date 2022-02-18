import { showError, showSuccess } from '@nextcloud/dialogs'
import { generateUrl } from '@nextcloud/router'

/**
 * Send the new file data back to the server
 * @param data
 * @param {{name: string, dir: string, mtime: integer, mime:string, filecontents: object}} file
 * @param {function} setFileInfoFunc
 */
export function saveFile(data, file, setFileInfoFunc) {
  // Send the post request
  var path = file.dir + file.name
  if (file.dir !== '/') {
    path = file.dir + '/' + file.name
  }
  fetch(generateUrl('/apps/files_metadataeditor/ajax/savefile'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      requesttoken: OC.requestToken,
    },
    body: JSON.stringify({
      filecontents: JSON.stringify({ dataset: data }, null, 4),
      path: path,
      mtime: file.mtime,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        showError(data.message)
      } else {
        setFileInfoFunc({
          mtime: data.mtime,
          dir: file.dir,
          name: file.name,
          writeable: file.writeable,
          mime: file.mime,
        })
        showSuccess('Saved!')
      }
    })
}

/**
 * Load file through AJAX
 *
 * @param {string} filename
 * @param {string} dir
 * @param {function} successFunc
 * @param {function} setFileInfoFunc
 * @param {function} failureFunc
 * @param {function} finalFunc
 */
export function loadFile(
  filename,
  dir,
  successFunc,
  setFileInfoFunc,
  failureFunc,
  finalFunc
) {
  fetch(
    generateUrl(
      '/apps/files_metadataeditor/ajax/loadfile?' +
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
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw response
    })
    .then((data) => {
      if ('dataset' in data.filecontents) {
        setFileInfoFunc({
          mtime: data.mtime,
          dir: dir,
          name: filename,
          writeable: data.writeable,
          mime: data.mime,
        })
        successFunc(data.filecontents['dataset'])
      } else {
        throw 'JSON data does not contain a dataset object'
      }
    })
    .catch((error) => {
      showError(`Error loading file: ${filename}: ${error}`)
      failureFunc()
    })
    .finally(() => finalFunc())
}
