module.exports = {
  purge: {
    content: ['./layouts/**/*.html'],
    whitelist: [
      '/^grid-cols/',
      '/^col-gap/',
      '/^row-gap/'
    ],
  },
  theme: {
    colors: {
      "transparent": 'rgba(255,255,255,0.0)',
      "white": 'rgba(255,255,255,1)',
      "gray": {
        "50": "#f2f0fa",
        "100": "#d8d6e0",
        "200": "#bfbdc8",
        "300": "#a6a5b0",
        "400": "#8e8d98",
        "500": "#767480",
        "600": "#5c5c67",
        "700": "#44434f",
        "800": "#2c2b37",
        "900": "#12121f"
      },
      "indigo": {
        "50": "#eceeff",
        "100": "#c5cbfe",
        "200": "#9ea6fe",
        "300": "#787ffd",
        "400": "#6368fd",
        "500": "#4b4cc5",
        "600": "#3b3a9f",
        "700": "#2d2a79",
        "800": "#1c1952",
        "900": "#0a082c"
      },
      "purple": {
        "50": "#f9e2ff",
        "100": "#e8a7fe",
        "200": "#d263fd",
        "300": "#b858e3",
        "400": "#9c4ac4",
        "500": "#803da5",
        "600": "#642f86",
        "700": "#4a2267",
        "800": "#311448",
        "900": "#190729"
      },
      "red": {
        "50": "#ffe5f5",
        "100": "#feb2df",
        "200": "#fd7fc5",
        "300": "#fd63b4",
        "400": "#cd4e8d",
        "500": "#ad4072",
        "600": "#8c3259",
        "700": "#6b2440",
        "800": "#4a1529",
        "900": "#290713"
      },
      "orange": {
        "50": "#ffeeea",
        "100": "#fecdbf",
        "200": "#feac94",
        "300": "#fd8563",
        "400": "#df7456",
        "500": "#bb6046",
        "600": "#974c37",
        "700": "#733827",
        "800": "#4f2417",
        "900": "#2b1008"
      },
      "yellow": {
        "50": "#fffedb",
        "100": "#fefc92",
        "200": "#fdf963",
        "300": "#d6d152",
        "400": "#b9b545",
        "500": "#9c9739",
        "600": "#7f7b2c",
        "700": "#625e20",
        "800": "#454213",
        "900": "#282606"
      },
      "green": {
        "50": "#f0ffe9",
        "100": "#d0febd",
        "200": "#b0fe91",
        "300": "#8efd63",
        "400": "#79db54",
        "500": "#63b845",
        "600": "#4d9536",
        "700": "#387126",
        "800": "#234e17",
        "900": "#0f2b08"
      },
      "aqua": {
        "50": "#e6fff3",
        "100": "#b5fed9",
        "200": "#83fdbf",
        "300": "#63fdac",
        "400": "#4fd08a",
        "500": "#41af72",
        "600": "#338e5a",
        "700": "#246c42",
        "800": "#164b2b",
        "900": "#072a15"
      },
      "blue": {
        "50": "#e0f9ff",
        "100": "#a3ecfe",
        "200": "#63dbfd",
        "300": "#56bfe0",
        "400": "#49a3c1",
        "500": "#3c87a2",
        "600": "#2e6b84",
        "700": "#215165",
        "800": "#143747",
        "900": "#071d28"
      }
    },
    fontFamily: {
      'como': [ 'como', 'sans-serif' ]
    },
    minHeight: {
      '16': '4rem',  
    },
    minWidth: {
      '16': '4rem',
    },
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '21': 'repeat(21, minmax(0, 1fr))',
        '22': 'repeat(22, minmax(0, 1fr))',
        '23': 'repeat(23, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '21': 'repeat(21, minmax(0, 1fr))',
        '22': 'repeat(22, minmax(0, 1fr))',
        '23': 'repeat(23, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
      },
    },
  },
  variants: {
    minWidth: ['responsive'],
  },
  plugins: [],
};