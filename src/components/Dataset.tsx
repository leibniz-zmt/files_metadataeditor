import React, { useState, useEffect } from 'react'
import { JsonForms } from '@jsonforms/react'
import { dump } from 'js-yaml'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'

import uischema from './zmt-metadata.uischema.json'
import metadataSchema from './zmt-metadata.schema.json'

const initialData = null

export default function Dataset() {
  const [displayDataAsString, setDisplayDataAsString] = useState('')
  const [data, setData] = useState<any>(initialData)
  const [schema, setSchema] = useState<any>({})
  const [schemaUrl, setSchemaUrl] = useState(
    'https://www.zmt-datalab.de/_static/dataset.schema.json'
  )
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(schemaUrl, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': ' text/plain' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then((schema) => {
        setSchema(schema)
      })
      .catch((error) => {
        console.error('Error fetching schema: ', error.message)
        setError(error)
      })
      .finally(() => setLoading(false))
  }, [schemaUrl])

  useEffect(() => {
    // setDisplayDataAsString(JSON.stringify({ dataset: data }, null, 4))
    setDisplayDataAsString(dump({ dataset: data }))
  }, [data])

  if (loading) {
    return <div className="spinner-border" role="status"></div>
  }
  if (error) {
    return (
      <div className="alert alert-primary" role="alert">
        An error fetching the schema from {schemaUrl} occurred:
      </div>
    )
  }

  return (
    <div className="form row">
      <h1>
        <img src="logo.png" className="logo" alt="logo" />
        Metadata for ZMT Dataset
      </h1>

      <JsonForms
        schema={metadataSchema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => {
          return setData(data)
        }}
      />

      <div className="dataContent">
        <pre id="datasetdata">{displayDataAsString}</pre>
      </div>
    </div>
  )
}
