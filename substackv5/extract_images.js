const fs = require('fs');
const path = require('path');

for (let page = 1; page <= 19; page++) {
  const svgPath = path.join(__dirname, `s${page}.svg`);
  let svg = fs.readFileSync(svgPath, 'utf8');
  let imgIndex = 0;

  svg = svg.replace(
    /(<image[^>]*xlink:href=")data:image\/png;base64,([A-Za-z0-9+/=]+)(")/g,
    (match, pre, b64, post) => {
      const outName = `s${page}_img${imgIndex}.png`;
      fs.writeFileSync(path.join(__dirname, outName), Buffer.from(b64, 'base64'));
      imgIndex++;
      return `${pre}${outName}${post}`;
    }
  );

  fs.writeFileSync(svgPath, svg);
  console.log(`s${page}.svg → ${imgIndex} images extracted`);
}
