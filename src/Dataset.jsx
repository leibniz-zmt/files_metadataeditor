import React, { useState, useEffect } from 'react'
import { JsonForms } from '@jsonforms/react'
// import { dump } from 'js-yaml'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import './App.css'

// import schema from './schemas/zmt-metadata.schema.json'
import uischema from './schemas/zmt-metadata.uischema.json'
import metadataSchema from './schemas/zmt-metadata.schema.json'

export default function Dataset(props) {
  const [displayDataAsString, setDisplayDataAsString] = useState('')
  const [data, setData] = useState(props.initialData)

  useEffect(() => {
    setDisplayDataAsString(JSON.stringify({ dataset: data }, null, 4))
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
