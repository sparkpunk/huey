function makeBlack(scale_by) {
  if(scale_by == 'intensity') return {
    mode: 'hsi.i',
    multiplier: '1' 
  }
  
  if(scale_by == 'lightness') return {
    mode: 'hsl.l',
    multiplier: '.1' 
  }

  if(scale_by == 'lumi') return {
    mode: 'lch.l',
    multiplier: '.1' 
  }

  if(scale_by == 'value') return {
    mode: 'hsv.v',
    multiplier: '.01' 
  }
}

function makeColorScales(color_wheel, scale_by, monochromes) {

  var { mode, multiplier } = makeBlack(scale_by);
  var huepoint;

  return color_wheel.map(color => {
    // Analyze the input color to access color makeup
    var Local_Color = new Color(color);
    var scale_value = Local_Color[scale_by];

    var shift_down;
    var h = Local_Color.hue;

    if ((h > 0 && h <= 60) || (h > 120 && h <= 180) || (h > 240 && h <= 300)) {
      shift_down = true;
    } else {
      shift_down = false;
    }

    // We pass #fff because colors lose saturation as they get lighter
    let white = chroma('#fff').set('hsl.s', 0.05);

    // If we pass plain ol' black, we get desaturated darks :( No bueno!
    let black = chroma(color).set('hsl.l', 0.05);
    // var black = chroma(color).set(mode, multiplier).set('hsv.v', 0.1);

    // Set scale parameters. Also use domain weights to ensure proper color placement,
    // otherwise ${color} will always be in the middle, even if it's already very light or dark
    var scale_colors = [white, color, black];
    var scale_domains = [0, 1 - scale_value, 1];

    // Make our scale with more than we need (will always lead with pure white)
    var color_scale = chroma.scale(scale_colors).domain(scale_domains).colors(monochromes * 2 + 1);

    // Shrink our scale colors, which will remove pure white at the beginning of each one
    color_scale = color_scale.filter((hex, i) => i % 2 != 0 );

    // If our original ${color} isn't included, find where it should go and replace it
    if(color_scale.indexOf(color) == -1) {
      huepoint = getClosest(scale_value, color_scale, scale_by);
      huepoint = huepoint.index;
    } else {
      huepoint = color_scale.indexOf(color);
    }
    color_scale[huepoint] = color;
    
    // Depending on where ${color}'s hue is, we need to shift it towards or away from luminosity "buckets"
    color_scale = hueShift(color_scale, huepoint, shift_down);

    // Ding! Pizza's ready
    return color_scale;
  })
}


// Make us a color wheel!
function defineColorWheel(num, color) {

  // set space between each hue family
  var degree_step = 360 / num;

  // Chroma-fy the original hex to get color makeup
  color = new Color(color);

  return Array.from({length: num}).map((n, i) => {
    // Always return the original brand color
    if(i == 0) return color.hex;
    
    var hue = color.hue;
    var saturation = color.saturation;
    var value = color.value;
    var intensity = color.intensity;

    var local_hue = hue;
    // Step around the color wheel at regular intervals
    if(i != 0) {
      local_hue = hue + (degree_step * i);
      local_hue = local_hue < 360 ? local_hue : local_hue - 360;
    }
    // Craft a new color with similar luminance as input color
    return chroma(local_hue, saturation, value, 'hsv').hex();
    // return chroma(local_hue, saturation, intensity, 'hsi').hex();
  });
}


// This looks for the item in an array with a value closest to ${num}
function getClosest(num, arr, arg) {
  // Set the current variable
  var current = { index: 0, color: "#ffffff" };
  // Loop around the array
  for(var i = 0; i < arr.length; i++) {
    var defender = new Color(current.color)[arg];
    var challenger = new Color(arr[i])[arg];
    if(Math.abs(num - challenger) < Math.abs(num - defender)) {
      current = { index: i, color: arr[i] };
    };
  };
  return current;
}


// Hues shift as their luminosity darkens
function hueShift(color_scale, huepoint, shift_down) {
  return color_scale.map((color, i) => {
    var c = chroma(color);
    
    var h = c.get('hsv.h');
    var s = c.get('hsv.s');
    var v = c.get('hsv.v');
    var j = h;

    var distance = Math.abs(i - huepoint);
    var multiplier = h / 180;
    var shift_distance = distance * multiplier;

    
    var hue_down = h - shift_distance;
    var hue_up = h + shift_distance;
    
    if(shift_down) {
      h = i < huepoint ? hue_up : hue_down;
    } else {
      h = i < huepoint ? hue_down : hue_up;
    }
  
    var hsv = chroma(h, s, v, 'hsv');
    var hex = hsv.hex();

    return hex;
  });
}