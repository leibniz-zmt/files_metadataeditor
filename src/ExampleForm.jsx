import React, { useState } from 'react'
import { JsonForms } from '@jsonforms/react'

import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { person } from '@jsonforms/examples'

const schema = person.schema
const uischema = person.uischema
const initialData = person.data
const title = 'React with Webpack and Babel'

export default function App(props) {
  const [data, setData] = useState(initialData)
  return (
    <div className="App">
      <h1>{props.filename}</h1>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, _errors }) => setData(data)}
      />
    </div>
  )
}
