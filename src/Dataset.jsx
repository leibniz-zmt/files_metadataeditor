import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
// import { createAjv } from '@jsonforms/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import './App.css'
import metadataSchema from './schemas/metadata.schema.json'
import uischema from './schemas/metadata.uischema.json'

export default function Dataset(props) {
	const [displayDataAsString, setDisplayDataAsString] = useState('')
	const [data, setData] = useState(props.initialData)

	useEffect(() => {
		setDisplayDataAsString(JSON.stringify({ dataset: data }, null, 4))
		props.setData(data)
	}, [data])

	// const handleDefaultsAjv = createAjv({ useDefaults: true })

	return (
		<div id="metadataform">
			<JsonForms
				schema={metadataSchema}
				uischema={uischema}
				data={data}
				renderers={materialRenderers}
				cells={materialCells}
				onChange={({ data }) => {
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
Dataset.propTypes = {
	initialData: PropTypes.object,
	setData: PropTypes.func,
}
