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
var mono_input = document.getElementById('mono-input');
var scale_by = document.getElementsByName('scale-by');

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
  
  color_input.value = randomColor.hex();
  hue_input.value = 8;
  mono_input.value = 8;
  document.getElementById('intensity').checked = true;
  
  makePalettes();
  
}

// ==================================================
// FUNCTIONS
// ==================================================
function makePalettes() {
  
  // Grab all of the values
  var hex = chroma(color_input.value).hex();
  var hue = hue_input.value;
  var mono = mono_input.value;
  var scale = Object.values(scale_by).filter(i => i.checked)[0].value;
  
  if(hex == undefined || hue == undefined || mono == undefined || scale == undefined) return;
  
  var color_wheel = defineColorWheel(hue, hex);
  var color_scales = makeColorScales(color_wheel, scale, mono);
  
  // Clear the palette container
  palette_container.innerHTML = "";
  palette_container.classList = `flex-grow h-full grid grid-rows-${color_scales.length} row-gap-2 pb-8`

  // Find out where the source hex is
  Object.entries(color_scales).forEach(entry => {
    var arr = entry[1];
    if(arr.indexOf(hex) != -1) {
      huepoint = arr.indexOf(hex);
    }
  });
  
  Object.entries(color_scales).forEach((color_obj, s) => {

    var color_name = color_obj[0];
    var color_scale = color_obj[1];
    
    var row = document.createElement('div');
    
    row.classList = ` flex`
    // huepoint = Object.entries(color_scales)[0].indexOf(`#${hex}`);
    // console.log(Object.entries(color_scales[0]))
    
    color_scale.forEach((color, c) => {

      
      var suffix = c == 0 ? 50 : c * 100;
      var swatch = makeSwatch(suffix, color, color_name);
      
      row.append(swatch);
    })
    palette_container.append(row);
  })
}
// ==================================================
// UTILITIES
// ==================================================
function makeInput(num, color, color_name) {
  var input = document.createElement('input');
  input.setAttribute('data', `${color_name}-${num}`);
  input.setAttribute('id', `${color_name}-${num}`);
  input.classList = "text-xs text-center text-gray-800 rounded-sm opacity-50 focus:outline-none";
  input.value = color;
  return input;
}

function makeSwatch(num, color, color_name) {
  var input = makeInput(num, color, color_name);
  var swatch = document.createElement('div');
  
  swatch.classList = "flex flex-col-reverse w-20 mr-2 p-1 rounded-sm shadow-sm";
  swatch.style.backgroundColor = color;
  
  // This needs to be refactored
  var white_contrast = chroma.contrast('white', color);
  var white_contrast_text = document.createElement('div')
  
  if(white_contrast > 3 && white_contrast <= 4.5) {
    white_contrast_text.innerText = "AA18";
  } else if (white_contrast > 4.5 && white_contrast <= 7) {
    white_contrast_text.innerText = "AA";
  } else if (white_contrast > 7) {
    white_contrast_text.innerText = "AAA";
  }
  
  white_contrast_text.classList = "text-xs text-white"
  
  swatch.append(input);
  swatch.append(white_contrast_text);
  
  return swatch;
}
// ==================================================
// FUNCTIONS
// ==================================================
function getColors() {
  var inputs = palette_container.querySelectorAll('input');
  
  var colors = Object.values(inputs).map(i => {
    var obj = {};
    obj[i.attributes.data.value] = i.value;
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