const example = {}

example.rotate = function (ctx) {
  ctx.strokeRect(100, 10, 150, 100)
  ctx.rotate(20 * Math.PI / 180)
  ctx.strokeRect(100, 10, 150, 100)
  ctx.rotate(20 * Math.PI / 180)
  ctx.strokeRect(100, 10, 150, 100)

  ctx.draw()
}

example.translate = function (ctx) {
  ctx.strokeRect(10, 10, 150, 100)
  ctx.translate(20, 20)
  ctx.strokeRect(10, 10, 150, 100)
  ctx.translate(20, 20)
  ctx.strokeRect(10, 10, 150, 100)

  ctx.draw()
}

example.saveAndRestore = function (ctx) {
  // save the default fill style
  ctx.save()
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 100)

  // restore to the previous saved state
  ctx.restore()
  ctx.fillRect(50, 50, 150, 100)

  ctx.draw()
}

example.drawImage = function (context) {
  context.drawImage('../canvas/car.png', 0, 0)
  context.draw()
}

example.fillText = function (ctx) {
  ctx.setFontSize(20)
  ctx.fillText('Hello', 20, 20)
  ctx.fillText('MINA', 100, 100)

  ctx.draw()
}

example.fill = function (ctx) {
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 10)
  ctx.lineTo(100, 100)
  ctx.fill()
  ctx.draw()
}

example.stroke = function (ctx) {
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 10)
  ctx.lineTo(100, 100)
  ctx.stroke()
  ctx.draw()
}

example.clearRect = function (ctx) {
  ctx.setFillStyle('red')
  ctx.fillRect(0, 0, 150, 200)
  ctx.setFillStyle('blue')
  ctx.fillRect(150, 0, 150, 200)
  ctx.clearRect(10, 10, 150, 75)
  ctx.draw()
}

example.beginPath = function (ctx) {
  // begin path
  ctx.rect(10, 10, 100, 30)
  ctx.setFillStyle('yellow')
  ctx.fill()

  // begin another path
  ctx.beginPath()
  ctx.rect(10, 40, 100, 30)

  // only fill this rect, not in current path
  ctx.setFillStyle('blue')
  ctx.fillRect(10, 70, 100, 30)

  ctx.rect(10, 100, 100, 30)

  // it will fill current path
  ctx.setFillStyle('red')
  ctx.fill()
  ctx.draw()
}

example.closePath = function (ctx) {
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 10)
  ctx.lineTo(100, 100)
  ctx.closePath()
  ctx.stroke()
  ctx.draw()
}

example.moveTo = function (ctx) {
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 10)

  ctx.moveTo(10, 50)
  ctx.lineTo(100, 50)
  ctx.stroke()
  ctx.draw()
}

example.lineTo = function (ctx) {
  ctx.moveTo(10, 10)
  ctx.rect(10, 10, 100, 50)
  ctx.lineTo(110, 60)
  ctx.stroke()
  ctx.draw()
}

example.rect = function (ctx) {
  ctx.rect(10, 10, 150, 75)
  ctx.setFillStyle('red')
  ctx.fill()
  ctx.draw()
}

example.arc = function (ctx) {
  // Draw coordinates
  ctx.arc(100, 75, 50, 0, 2 * Math.PI)
  ctx.setFillStyle('#EEEEEE')
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(40, 75)
  ctx.lineTo(160, 75)
  ctx.moveTo(100, 15)
  ctx.lineTo(100, 135)
  ctx.setStrokeStyle('#AAAAAA')
  ctx.stroke()

  ctx.setFontSize(12)
  ctx.setFillStyle('black')
  ctx.fillText('0', 165, 78)
  ctx.fillText('0.5*PI', 83, 145)
  ctx.fillText('1*PI', 15, 78)
  ctx.fillText('1.5*PI', 83, 10)

  // Draw points
  ctx.beginPath()
  ctx.arc(100, 75, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('lightgreen')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(100, 25, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('blue')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(150, 75, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('red')
  ctx.fill()

  // Draw arc
  ctx.beginPath()
  ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
  ctx.setStrokeStyle('#333333')
  ctx.stroke()

  ctx.draw()
}

example.quadraticCurveTo = function (ctx) {
  // Draw points
  ctx.beginPath()
  ctx.arc(20, 20, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('red')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(200, 20, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('lightgreen')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(20, 100, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('blue')
  ctx.fill()

  ctx.setFillStyle('black')
  ctx.setFontSize(12)

  // Draw guides
  ctx.beginPath()
  ctx.moveTo(20, 20)
  ctx.lineTo(20, 100)
  ctx.lineTo(200, 20)
  ctx.setStrokeStyle('#AAAAAA')
  ctx.stroke()

  // Draw quadratic curve
  ctx.beginPath()
  ctx.moveTo(20, 20)
  ctx.quadraticCurveTo(20, 100, 200, 20)
  ctx.setStrokeStyle('black')
  ctx.stroke()

  ctx.draw()
}

example.bezierCurveTo = function (ctx) {
  // Draw points
  ctx.beginPath()
  ctx.arc(20, 20, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('red')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(200, 20, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('lightgreen')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(20, 100, 2, 0, 2 * Math.PI)
  ctx.arc(200, 100, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('blue')
  ctx.fill()

  ctx.setFillStyle('black')
  ctx.setFontSize(12)

  // Draw guides
  ctx.beginPath()
  ctx.moveTo(20, 20)
  ctx.lineTo(20, 100)
  ctx.lineTo(150, 75)

  ctx.moveTo(200, 20)
  ctx.lineTo(200, 100)
  ctx.lineTo(70, 75)
  ctx.setStrokeStyle('#AAAAAA')
  ctx.stroke()

  // Draw quadratic curve
  ctx.beginPath()
  ctx.moveTo(20, 20)
  ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
  ctx.setStrokeStyle('black')
  ctx.stroke()

  ctx.draw()
}

example.setFillStyle = function (ctx) {
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 75)
  ctx.draw()
}

example.setStrokeStyle = function (ctx) {
  ctx.setStrokeStyle('red')
  ctx.strokeRect(10, 10, 150, 75)
  ctx.draw()
}

example.setGlobalAlpha = function (ctx) {
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 100)
  ctx.setGlobalAlpha(0.2)
  ctx.setFillStyle('blue')
  ctx.fillRect(50, 50, 150, 100)
  ctx.setFillStyle('yellow')
  ctx.fillRect(100, 100, 150, 100)

  ctx.draw()
}

example.setShadow = function (ctx) {
  ctx.setFillStyle('red')
  ctx.setShadow(10, 50, 50, 'blue')
  ctx.fillRect(10, 10, 150, 75)
  ctx.draw()
}

example.setFontSize = function (ctx) {
  ctx.setFontSize(20)
  ctx.fillText('20', 20, 20)
  ctx.setFontSize(30)
  ctx.fillText('30', 40, 40)
  ctx.setFontSize(40)
  ctx.fillText('40', 60, 60)
  ctx.setFontSize(50)
  ctx.fillText('50', 90, 90)

  ctx.draw()
}

example.setLineCap = function (ctx) {
  ctx.beginPath()
  ctx.moveTo(10, 10)
  ctx.lineTo(150, 10)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineCap('butt')
  ctx.setLineWidth(10)
  ctx.moveTo(10, 30)
  ctx.lineTo(150, 30)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineCap('round')
  ctx.setLineWidth(10)
  ctx.moveTo(10, 50)
  ctx.lineTo(150, 50)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineCap('square')
  ctx.setLineWidth(10)
  ctx.moveTo(10, 70)
  ctx.lineTo(150, 70)
  ctx.stroke()

  ctx.draw()
}

example.setLineJoin = function (ctx) {
  ctx.beginPath()
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 50)
  ctx.lineTo(10, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineJoin('bevel')
  ctx.setLineWidth(10)
  ctx.moveTo(50, 10)
  ctx.lineTo(140, 50)
  ctx.lineTo(50, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineJoin('round')
  ctx.setLineWidth(10)
  ctx.moveTo(90, 10)
  ctx.lineTo(180, 50)
  ctx.lineTo(90, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineJoin('miter')
  ctx.setLineWidth(10)
  ctx.moveTo(130, 10)
  ctx.lineTo(220, 50)
  ctx.lineTo(130, 90)
  ctx.stroke()

  ctx.draw()
}

example.setLineWidth = function (ctx) {
  ctx.beginPath()
  ctx.moveTo(10, 10)
  ctx.lineTo(150, 10)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(5)
  ctx.moveTo(10, 30)
  ctx.lineTo(150, 30)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.moveTo(10, 50)
  ctx.lineTo(150, 50)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(15)
  ctx.moveTo(10, 70)
  ctx.lineTo(150, 70)
  ctx.stroke()

  ctx.draw()
}

example.setMiterLimit = function (ctx) {
  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.setLineJoin('miter')
  ctx.setMiterLimit(1)
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 50)
  ctx.lineTo(10, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.setLineJoin('miter')
  ctx.setMiterLimit(2)
  ctx.moveTo(50, 10)
  ctx.lineTo(140, 50)
  ctx.lineTo(50, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.setLineJoin('miter')
  ctx.setMiterLimit(3)
  ctx.moveTo(90, 10)
  ctx.lineTo(180, 50)
  ctx.lineTo(90, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.setLineJoin('miter')
  ctx.setMiterLimit(4)
  ctx.moveTo(130, 10)
  ctx.lineTo(220, 50)
  ctx.lineTo(130, 90)
  ctx.stroke()

  ctx.draw()
}

example.scale = function (ctx) {
  ctx.strokeRect(10, 10, 25, 15)
  ctx.scale(2, 2)
  ctx.strokeRect(10, 10, 25, 15)
  ctx.scale(2, 2)
  ctx.strokeRect(10, 10, 25, 15)

  ctx.draw()
}

example.arcTo = function (ctx) {
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(100, 20);
  ctx.arcTo(150, 20, 150, 70, 50);
  ctx.lineTo(150, 120);
  ctx.setStrokeStyle('#000000');
  ctx.stroke()
  ctx.closePath();
  ctx.draw();
}

example.clip = function (ctx) {
  wx.downloadFile({
    url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
    success(res) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(50, 50, 25, 0, 2 * Math.PI)
      ctx.clip()
      ctx.drawImage(res.tempFilePath, 25, 25)
      ctx.restore()
      ctx.draw()
    }
  })
}

example.createCircularGradient = function (ctx) {
  // Create circular gradient
  const grd = ctx.createCircularGradient(75, 50, 50)
  grd.addColorStop(0, 'red')
  grd.addColorStop(1, 'white')

  // Fill with gradient
  ctx.setFillStyle(grd)
  ctx.fillRect(10, 10, 150, 80)
  ctx.draw()
}

example.createPattern = function (ctx) {
  const pattern=ctx.createPattern('../../../image/icon_foot_en.png','repeat-y')
  ctx.fillStyle=pattern
  ctx.fillRect(0,0,300,150)
  ctx.draw()
}

example.setTextAlign = function (ctx) {
  ctx.setStrokeStyle('red')
  ctx.moveTo(150, 20)
  ctx.lineTo(150, 170)
  ctx.stroke()
  
  ctx.setFontSize(15)
  ctx.setTextAlign('left')
  ctx.fillText('textAlign=left', 150, 60)
  
  ctx.setTextAlign('center')
  ctx.fillText('textAlign=center', 150, 80)
  
  ctx.setTextAlign('right')
  ctx.fillText('textAlign=right', 150, 100)
  
  ctx.draw()
}

example.setTextBaseline = function (ctx) {
  ctx.setStrokeStyle('red')
  ctx.moveTo(5, 75)
  ctx.lineTo(295, 75)
  ctx.stroke()
  
  ctx.setFontSize(20)
  ctx.setTextBaseline('top')
  ctx.fillText('top', 5, 75)
  
  ctx.setTextBaseline('middle')
  ctx.fillText('middle', 50, 75)
  
  ctx.setTextBaseline('bottom')
  ctx.fillText('bottom', 120, 75)
  
  ctx.setTextBaseline('normal')
  ctx.fillText('normal', 200, 75)
  
  ctx.draw()
}

example.setTransform = function (ctx) {
  ctx.rect(20, 20, 100, 50);
  ctx.setFillStyle('red');
  ctx.fill();

  ctx.setTransform(1, 0, 0, 1, 100, 100);

  ctx.rect(20, 20, 100, 50);
  ctx.setFillStyle('blue');
  ctx.fill();

  ctx.draw();
}

example.strokeRect = function (ctx) {
  ctx.setStrokeStyle('red')
  ctx.strokeRect(10, 10, 150, 75)
  ctx.draw()
}

example.strokeText = function (ctx) {
  ctx.setFontSize(20);
  ctx.setStrokeStyle('#000000');
  ctx.moveTo(100,100)
  ctx.strokeText('Hello, Canvas!', 50, 50);

  ctx.draw();
}

example.transform = function (ctx) {
  ctx.rect(20, 20, 100, 50);
  ctx.setFillStyle('red');
  ctx.fill();

  ctx.transform(1, 0.5, 0.5, 1, 0, 0);

  ctx.rect(20, 20, 100, 50);
  ctx.setFillStyle('blue');
  ctx.fill();

  ctx.draw();
}


module.exports = example
