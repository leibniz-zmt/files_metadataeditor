'use strict'

export const themeOptions = {
	palette: {
		type: 'light',
		primary: {
			main: 'rgb(9, 118, 186)',
		},
		secondary: {
			main: '#000000',
		},
	},
	typography: {
		fontSize: 13,
		h6: {
			fontSize: '0.9rem',
			fontWeight: 'bold',
		},
	},
	spacing: 8,

	components: {
		MuiTable: {
			defaultProps: {
				size: 'small',
			},
			styleOverrides: {
				root: {
					backgroundColor: 'rgb(240,240,240)',
					borderSpacing: 0,
					borderStyle: 'dotted',
					borderWidth: '1px',
					borderColor: 'lightgray',
					margin: '3px',
				},
			},
		},
		MuiInputLabel: {
			defaultProps: {
				shrink: true,
				margin: 'dense',
				disableAnimation: false,
			},
		},
		MuiList: {
			defaultProps: {
				dense: false,
			},
		},
		MuiFormControl: {
			defaultProps: {
				size: 'small',
				margin: 'dense',
			},
		},
	},
}
