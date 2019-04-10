var text = document.querySelector("text");
var svg = document.querySelector("svg");

function getTransformedPts(el) {
  var m = el.getCTM();
  //var m = el.getScreenCTM();
  var bb = el.getBBox();
  var tpts = [
    matrixXY(m, bb.x, bb.y),
    matrixXY(m, bb.x + bb.width, bb.y),
    matrixXY(m, bb.x + bb.width, bb.y + bb.height),
    matrixXY(m, bb.x, bb.y + bb.height)
  ];

  return tpts;
}

function matrixXY(m, x, y) {
  return { x: x * m.a + y * m.c + m.e, y: x * m.b + y * m.d + m.f };
}

var pts = getTransformedPts(text);
console.log(pts);

for (pt in pts) {
  var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", pts[pt].x);
  c.setAttribute("cy", pts[pt].y);
  c.setAttribute("r", 3);
  svg.append(c);
}

var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
let points = "";
for (pt in pts) {
  points += `${pts[pt].x}, ${pts[pt].y} `;
  poly.setAttributeNS(null, "points", points);
}

svg.appendChild(poly);
