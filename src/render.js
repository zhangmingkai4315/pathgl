function addToBuffer(datum) {
  return extend(datum.path = [], { coords: [], id: datum.id })
}

function addLine(x1, y1, x2, y2) {
  var index = this.push(ctx.createBuffer()) - 1
  var vertices = [x1, y1, 0, x2, y2, 0]

  ctx.bindBuffer(ctx.ARRAY_BUFFER, this[index])
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW)

  this[index].itemSize = 3
  this[index].numItems = vertices.length / 3
}

d3.timer(function () {
  if (rerender)
    scene.forEach(drawPath), rerender = false
})

function drawPath(node) {
  setStroke(d3.rgb(node.attr.stroke))
  var path = node.path

  for (var i = 0; i < path.length; i++) {
    ctx.bindBuffer(ctx.ARRAY_BUFFER, path[i])
    ctx.vertexAttribPointer(program.vertexPositionLoc, path[i].itemSize, ctx.FLOAT, false, 0, 0)
    ctx.drawArrays(ctx.LINE_STRIP, 0, path[i].numItems)
  }
}

function render() {
  rerender= true
}

function setStroke (rgb){
  ctx.uniform1f(r, rgb.r / 256)
  ctx.uniform1f(g, rgb.g / 256)
  ctx.uniform1f(b, rgb.b / 256)
}
