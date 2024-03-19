let loaded = false;
import { i18n, lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'canvas',
      path: 'packageComponent/pages/canvas/canvas-2d-new/canvas-2d-new'
    }
  },
  data: {
    theme: 'light',
    canIUse: true,
    testMethods: [
      'arcTo',
      'bezierCurveTo',
      'clip',
      'createConicGradient',
      'createLinearGradient',
      'createPattern',
      'createRadialGradient',
      'drawImage',
      'ellipse',
      'getContextAttributes',
      'getLineDash',
      'quadraticCurveTo',
      'reset',
      'direction',
      'setTransform',
      'roundRect',
      'drawFace',
      'setLineDash',
      'getImageData',
      'putImageData',
      'isPointInStroke',
      'isPointInPath'
    ].sort(),
    testMethodIndex: 0,
    imgReady: false
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang
    })
  },
  onReady() {
    loaded = true;
    const {
      SDKVersion
    } = wx.getSystemInfoSync();
    console.log({
      SDKVersion
    });
    const query = wx.createSelectorQuery();
    const missingProps = [];
    const missingMethods = [];
    const experimentProps = ['fontStretch', 'fontVariantCaps'];
    const experimentMethods = ['isContextLost'];
    const expectPropString = 'canvas direction fillStyle filter font fontKerning fontStretch fontVariantCaps globalAlpha globalCompositeOperation imageSmoothingEnabled imageSmoothingQuality lineCap lineDashOffset lineJoin lineWidth miterLimit shadowBlur shadowColor shadowOffsetX shadowOffsetY strokeStyle textAlign textBaseline';
    const expectMethodString = 'arc arcTo beginPath bezierCurveTo clearRect clip closePath createConicGradient createImageData createLinearGradient createPattern createRadialGradient drawFocusIfNeeded drawImage ellipse fill fillRect fillText getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke lineTo measureText moveTo putImageData quadraticCurveTo rect reset resetTransform restore rotate roundRect save scale setLineDash setTransform stroke strokeRect strokeText transform translate';
    query.select('#mycanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        expectPropString.split(' ').forEach(prop => {
          if (!(prop in ctx)) {
            // Missing properties in ctx
            if (!experimentProps.includes(prop)) {
              missingProps.push(prop);
            }
          }
        });
        expectMethodString.split(' ').forEach(method => {
          if (!(method in ctx && typeof ctx[method] === 'function')) {
            // Missing methods in ctx
            if (!experimentMethods.includes(method)) {
              missingMethods.push(method);
            }
          }
        });
        console.log({
          missingMethods,
          missingProps
        });
        canvas.width = res[0].width;
        canvas.height = res[0].height;
        const img = canvas.createImage();
        img.src = './car.png';
        img.onload = () => {
          this.setData({
            imgReady: true
          });
        };
        // Test Functions
        const functions = {
          arcTo() {
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(150, 20);
            ctx.arcTo(150, 100, 50, 20, 30);
            ctx.stroke();

            ctx.fillStyle = 'blue';
            // base point
            ctx.fillRect(150, 20, 10, 10);

            ctx.fillStyle = 'red';
            // control point one
            ctx.fillRect(150, 100, 10, 10);
            // control point two
            ctx.fillRect(50, 20, 10, 10);
            //
            ctx.setLineDash([5, 5]);
            ctx.moveTo(150, 20);
            ctx.lineTo(150, 100);
            ctx.lineTo(50, 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(120, 38, 30, 0, 2 * Math.PI);
            ctx.stroke();
          },
          bezierCurveTo() {
            ctx.beginPath();
            ctx.moveTo(50, 20);
            ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
            ctx.stroke();

            ctx.fillStyle = 'blue';
            // start point
            ctx.fillRect(50, 20, 10, 10);
            // end point
            ctx.fillRect(50, 100, 10, 10);

            ctx.fillStyle = 'red';
            // control point one
            ctx.fillRect(230, 30, 10, 10);
            // control point two
            ctx.fillRect(150, 70, 10, 10);
          },
          clip() {
            // Create circular clipping region
            ctx.beginPath();
            ctx.arc(100, 75, 50, 0, Math.PI * 2);
            ctx.clip();

            // Draw stuff that gets clipped
            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'orange';
            ctx.fillRect(0, 0, 100, 100);
          },
          drawImage() {
            ctx.drawImage(img, 50, 50, 100, 50);
          },
          getContextAttributes() {
            console.log('ctx.getContextAttributes()', ctx.getContextAttributes());
          },
          getLineDash() {
            ctx.setLineDash([10, 20]);
            console.log('getLineDash===', ctx.getLineDash()); // [10, 20]

            // Draw a dashed line
            ctx.beginPath();
            ctx.moveTo(0, 50);
            ctx.lineTo(300, 50);
            ctx.stroke();
          },
          quadraticCurveTo() {
            // Quadratic Bézier curve
            ctx.beginPath();
            ctx.moveTo(50, 20);
            ctx.quadraticCurveTo(230, 30, 50, 100);
            ctx.stroke();

            // Start and end points
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            ctx.arc(50, 20, 5, 0, 2 * Math.PI); // Start point
            ctx.arc(50, 100, 5, 0, 2 * Math.PI); // End point
            ctx.fill();

            // Control point
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(230, 30, 5, 0, 2 * Math.PI);
            ctx.fill();
          },
          reset() {
            console.log('ctx.reset()', ctx.reset());
          },
          direction() {
            console.log('original ctx.direction', ctx.direction);
            ctx.direction = 'rtl';
            ctx.fillText('Yes?', 200, 150);
            ctx.direction = 'ltr';
          },
          setTransform() {
            ctx.setTransform(1, 0.1, 0.1, 1, 0, 0);
            const gradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(0.25, 'orange');
            gradient.addColorStop(0.5, 'yellow');
            gradient.addColorStop(0.75, 'green');
            gradient.addColorStop(1, 'blue');
            ctx.fillStyle = gradient;
            ctx.fillRect(20, 20, 260, 260);
            ctx.resetTransform();
          },
          roundRect() {
            ctx.roundRect(190, 190, 40, 40, [5, 10]);
            ctx.stroke();
          },
          drawFace() {
            // Test some common graphics
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 5;
            ctx.rect(0, 0, 200, 200);
            ctx.stroke();
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2
            ctx.moveTo(160, 100)
            ctx.arc(100, 100, 60, 0, 2 * Math.PI, true)
            ctx.moveTo(140, 100)
            ctx.arc(100, 100, 40, 0, Math.PI, false)
            ctx.moveTo(85, 80)
            ctx.arc(80, 80, 5, 0, 2 * Math.PI, true)
            ctx.moveTo(125, 80)
            ctx.arc(120, 80, 5, 0, 2 * Math.PI, true)
            ctx.stroke();
          },
          setLineDash() {
            ctx.beginPath();
            ctx.setLineDash([5, 15]); // iOS real devices support setLineDash
            ctx.moveTo(0, 50);
            ctx.lineTo(300, 50);
            ctx.stroke();
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(0, 100);
            ctx.lineTo(300, 100);
            ctx.stroke();
          },
          ellipse() {
            ctx.ellipse(50, 100, 50, 100, 0, 0, 2 * Math.PI);
            ctx.stroke();
          },
          createRadialGradient() {
            // Create a radial gradient
            // The inner circle is at x=110, y=90, with radius=30
            // The outer circle is at x=100, y=100, with radius=70
            const gradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);

            // Add three color stops
            gradient.addColorStop(0, 'pink');
            gradient.addColorStop(0.9, 'white');
            gradient.addColorStop(1, 'green');

            // Set the fill style and draw a rectangle
            ctx.fillStyle = gradient;
            ctx.fillRect(20, 20, 160, 160);
          },
          createConicGradient() {
            // Create a conic gradient
            // The start angle is 0
            // The center position is 100, 100
            const gradient = ctx.createConicGradient(0, 100, 100);

            // Add five color stops
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(0.25, 'orange');
            gradient.addColorStop(0.5, 'yellow');
            gradient.addColorStop(0.75, 'green');
            gradient.addColorStop(1, 'blue');

            // Set the fill style and draw a rectangle
            ctx.fillStyle = gradient;
            ctx.fillRect(20, 20, 200, 200);
          },
          createLinearGradient() {
            // Create a linear gradient
            // The start gradient point is at x=20, y=0
            // The end gradient point is at x=220, y=0
            const gradient = ctx.createLinearGradient(20, 0, 220, 0);

            // Add three color stops
            gradient.addColorStop(0, 'green');
            gradient.addColorStop(0.5, 'cyan');
            gradient.addColorStop(1, 'green');

            // Set the fill style and draw a rectangle
            ctx.fillStyle = gradient;
            ctx.fillRect(20, 20, 200, 100);
          },
          createPattern() {
            const img = canvas.createImage();
            img.src = './car.png';
            img.onload = () => {
              // Only use the image after it's loaded
              const pattern = ctx.createPattern(img, 'repeat');
              ctx.fillStyle = pattern;
              ctx.fillRect(0, 0, 250, 250);
            };
          },
          getImageData() {
            const gradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(0.25, 'orange');
            gradient.addColorStop(0.5, 'yellow');
            gradient.addColorStop(0.75, 'green');
            gradient.addColorStop(1, 'blue');
            ctx.fillStyle = gradient;
            ctx.fillRect(20, 20, 200, 200);
            console.log('getImageData：', ctx.getImageData(20, 20, 100, 100));
          },
          putImageData() {
            const gradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(0.25, 'orange');
            gradient.addColorStop(0.5, 'yellow');
            gradient.addColorStop(0.75, 'green');
            gradient.addColorStop(1, 'blue');
            ctx.fillStyle = gradient;
            ctx.fillRect(20, 20, 200, 200);
            const imageData = ctx.getImageData(20, 20, 100, 100);
            ctx.putImageData(imageData, 100, 100);
          },
          isPointInStroke() {
            ctx.rect(10, 10, 100, 100);
            ctx.stroke();
            console.log('isPointInStroke expect to be true, in fact =', ctx.isPointInStroke(50, 10));
          },
          isPointInPath() {
            ctx.rect(10, 10, 100, 100);
            ctx.fill();
            console.log('isPointInPath expect to be true, in fact =', ctx.isPointInPath(30, 70));
          }
        };

        this.bindPickerChangeInner = function (selectedIndex = this.data.testMethodIndex) {
          this.setData({
            testMethodIndex: +selectedIndex
          });
          ctx.resetTransform();
          ctx.clearRect(0, 0, 300, 300);
          ctx.closePath();
          ctx.beginPath();
          const fn = functions[this.data.testMethods[+selectedIndex]];
          fn.call(this);
        };
        functions.arcTo();
      });
  },
  runtest(arg) {
    let value;
    try {
      value = arg.detail.value;
    } catch (e) { }
    this.bindPickerChangeInner(value);
  },
  onShow() { },
  onUnload() {
    // clearInterval(this.interval)
    loaded = false;
  }
});