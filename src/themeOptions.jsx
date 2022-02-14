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
    },
  },
  spacing: 8,
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
        backgroundColor: '#d1e6f4',
      },
    },
  },

  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#000000',
            color: '#000000',
            borderRadius: '25px',
          },
        },
      },
    },
  },
}
