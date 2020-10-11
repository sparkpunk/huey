// ==================================================
// STAGING
// ==================================================
var hex, hue, mono, scale; 
var randomColor = chroma.random().set('hsl.l', 0.9).set('hsl.s', 0.5);

// ==================================================
// DOM ELEMENTS
// ==================================================
var palette_container = document.getElementById('palette');

var color_input = document.getElementById('hex-input');
var hue_input = document.getElementById('hue-input');
var scale_by = document.getElementsByName('scale-by');
var mono_input = document.getElementById('mono-input');

var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var box3 = document.getElementById('box3');

// ==================================================
// READY
// ==================================================
function ready() {
  var boxes = [ box1, box2, box3 ];
  
  boxes.forEach((box, b) => {
    if(b > 0) randomColor = chroma(randomColor).darken(1).saturate(2);
    box.style.backgroundColor = randomColor.hex();
  });

  hex = randomColor.hex();
  hue = 8;
  mono = 8;
  scale = 'intensity';

  makePalettes(hex, hue, mono, scale);

}

// ==================================================
// FUNCTIONS
// ==================================================
function grabValues() {

  // Grab all of the values
  hex = chroma(color_input.value).hex();
  hue = hue_input.value;
  mono = mono_input.value;
  scale = Object.values(scale_by).filter(i => i.checked)[0].value;

  if(hex == undefined || hue == undefined || mono == undefined || scale == undefined) return;

  makePalettes(hex, hue, mono, scale);
}

function makePalettes(hex, hue, mono, scale) {
  
  var color_wheel = defineColorWheel(hue, hex);
  var color_scales = makeColorScales(color_wheel, scale, mono);

  // Clear the palette container
  palette_container.innerHTML = "";
  palette_container.classList += ` grid grid-rows-${color_scales.length} row-gap-1 pb-8`
  
  color_scales.forEach((color_scale, s) => {
    
    var row = document.createElement('div');

    row.classList += ` grid grid-cols-${color_scale.length} col-gap-1`
    huepoint = Object.values(color_scales[0]).indexOf(`#${hex}`);
    
    color_scale.forEach((color, c) => {
      var shade_number = c == 0 ? 50 : c * 100;
      var swatch = document.createElement('div')
      var input = document.createElement('input')

      swatch.classList = "flex flex-col-reverse min-h-8 p-1 rounded shadow";
      swatch.style.backgroundColor = color;

      input.setAttribute('id', `color${s + 1}-${shade_number}`);
      input.classList = "text-xs text-center text-gray-800 rounded-sm opacity-50 focus:outline-none";
      input.value = color;

      swatch.append(input);
      row.append(swatch);
    })
    palette_container.append(row);
  })
}
// ==================================================
// FUNCTIONS
// ==================================================
function getColors() {
  var inputs = palette_container.querySelectorAll('input');
  var colors = Object.values(inputs).map(i => {
    var obj = {};
    obj[i.attributes.id] = i.value;
    return obj;
  });
  return colors;
}


function getCSS() {
  var css = ":root {\n";
  
  var colors = getColors();
  colors.forEach(color => {
    css += `--${Object.keys(color)[0]}: `;
    css += `${Object.values(color)[0]};`;
    css += `\n`;
  });
  css += "}";

  navigator.clipboard.writeText(css);
}

function getSCSS() {
  var scss = "";
  var colors = getColors();

  colors.forEach(color => {
    scss += `$${Object.keys(color)[0]}: `;
    scss += `${Object.values(color)[0]};`;
    scss += `\n`;
  });

  navigator.clipboard.writeText(scss);
}

function getJSON() {
  var tailwind = {};
  var colors = getColors();

  colors.forEach(color => {
    var color_key = Object.keys(color)[0].split('-');
    var color_val = Object.values(color)[0];
    var color_parent = color_key[0];
    var color_child = color_key[1];

    if(!tailwind[color_parent]) {
      tailwind[color_parent] = {};
    }

    tailwind[color_parent][color_child] = color_val;
  })

  navigator.clipboard.writeText(JSON.stringify(tailwind, null, 2));
}


ready();