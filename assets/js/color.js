// Names taken from http://www.procato.com/rgb+index/ 
// and https://en.wikipedia.org/wiki/Hue
var color_names = {
  "scarlet": 7.500,
  "vermillion": 15.00,
  "tangelo": 22.50,
  "orange": 30.00,
  "gamboge": 37.50,
  "amber": 45.00,
  "gold": 52.50,
  "yellow": 60.00,
  "apple_green": 67.50,
  "lime_green": 75.00,
  "spring_bud": 82.50,
  "chartreuse": 90.00,
  "pistachio": 97.50,
  "harlequin": 105.0,
  "sap_green": 112.5,
  "green": 120.0,
  "emerald_green": 127.5,
  "malachite_green": 135.0,
  "sea_green": 142.5,
  "spring_green": 150.0,
  "aquamarine": 157.5,
  "turquoise": 165.0,
  "opal": 172.5,
  "cyan": 180.0,
  "arctic_blue": 187.5,
  "cerulean": 195.0,
  "cornflower_blue": 202.5,
  "azure": 210.0,
  "cobalt_blue": 217.5,
  "sapphire_blue": 225.0,
  "phthalo_blue": 232.5,
  "blue": 240.0,
  "persian_blue": 247.5,
  "indigo": 255.0,
  "blue_violet": 262.5,
  "violet": 270.0,
  "purple": 277.5,
  "mulberry": 285.0,
  "heliotrope": 292.5,
  "magenta": 300.0,
  "orchid": 307.5,
  "fuschia": 315.0,
  "cerise": 322.5,
  "rose": 330.0,
  "raspberry": 337.5,
  "crimson": 345.0,
  "amaranth": 352.5,
  "red": 360.0,
}

class Color {
  
  constructor(c) {
    this.hex = chroma(c).hex();
    this.hue = this.getHue(c);
    this.intensity = this.getIntensity(c);
    this.khroma = this.getChroma(c);
    this.lightness = this.getLightness(c);
    this.lumi = this.getLuminance(c);
    this.saturation = this.getSaturation(c);
    this.value = this.getValue(c);
  }

  getChroma(color) {
    return chroma(color).get('hcl.c');
  }

  getHue(color) {
    return chroma(color).get('hsi.h');
  }

  getIntensity(color) {
    return chroma(color).get('hsi.i');
  }

  getLuminance(color) {
    return chroma(color).luminance();
  }

  getLightness(color) {
    return chroma(color).get('hsl.l');
  }

  getSaturation(color) {
    return chroma(color).get('hsv.s');
  }

  getValue(color) {
    return chroma(color).get('hsv.v');
  }

}