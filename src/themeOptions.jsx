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
    fontSize: 12,
    h6: {
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
  },
  spacing: 5,
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiTab: {
      style: {
        minWidth: '72px',
      },
    },
    MuiTableHead: {
      style: {
        backgroundColor: '#000000',
      },
    },
    MuiTable: {
      style: {
        backgroundColor: '#000000',
      },
    },
  },

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
  },
}
