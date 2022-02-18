import React, { useState, useEffect } from 'react'
import { JsonForms } from '@jsonforms/react'
// import { dump } from 'js-yaml'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import './App.css'

import uischema from './schemas/metadata.uischema.json'
import metadataSchema from './schemas/metadata.schema.json'

export default function Dataset(props) {
  const [displayDataAsString, setDisplayDataAsString] = useState('')
  const [data, setData] = useState(props.initialData)

  useEffect(() => {
    setDisplayDataAsString(JSON.stringify({ dataset: data }, null, 4))
    props.setData(data)
  }, [data])

  return (
    <div className="form">
      <JsonForms
        schema={metadataSchema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => {
          return setData(data)
        }}
        validationMode="NoValidation"
      />

      <div className="dataContent">
        <pre id="datasetdata">{displayDataAsString}</pre>
      </div>
    </div>
  )
}
