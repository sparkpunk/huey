import chroma from 'chroma-js';
// import Color from './color';

export default function makeContrast(color) {
  var arr = [];
  var cols = Object.values(color[1]);
  var rows = Object.values(color[1]).reverse();

  cols.unshift('#ffffff');
  cols.push('#000000');

  rows.unshift('#000000');
  rows.push('#ffffff');

  cols.forEach((item, i) => {
    var color = cols[i];
    var background = rows[i];
    var contrast = chroma.contrast(color, background).toFixed(3);

    var obj = {};
    obj.color = color;
    obj.background = background;
    obj.contrast = contrast;

    arr.unshift(obj);
  })

  return arr;
}