export default (
  numberOfRings = 3,
  ringRadius = 90,
  lineWidthDraw = 3,
  maxWavesAmplitude = 4,
  numberOfWaves = 7,
  colors = [`#FEFE00`,`#9D649D`, `#46A4B5`],
  ringRadiusOffset = 0,
  waveOffset = 15,
  startAngle = 0
) => {
  const cnv = document.getElementById(`cnvWaveRings`);
  const ctx = cnv.getContext(`2d`);

  let centerX = 0;
  let centerY = 0;
  function init() {
    cnv.width  = cnv.offsetWidth;
    cnv.height = cnv.offsetHeight;
    centerX = cnv.width  / 2;
    centerY = cnv.height / 2;
  }
  init();

  function updateRings() {
    for (let i = 0; i < numberOfRings; i++) {
      let radius = i * ringRadiusOffset + ringRadius;
      let offsetAngle = i * waveOffset * Math.PI / 180;
      drawRing(radius, colors[i], offsetAngle);
    }

    startAngle >= 360? startAngle = 0 : startAngle++;
  }

  function drawRing(radius, color, offsetAngle) {
    ctx.strokeStyle = color;
    ctx.lineWidth   = lineWidthDraw;

    ctx.beginPath();

    for (let j = -180; j < 180; j++) {
      let currentAngle  = (j + startAngle) * Math.PI / 180;
      let displacement  = 0;
      let now = Math.abs(j);

      if (now > 70) {
        displacement = (now - 70) / 70;
      }

      if (displacement >= 1) {
        displacement = 1;
      }

      let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
      let x = centerX + Math.cos(currentAngle) * waveAmplitude;
      let y = centerY + Math.sin(currentAngle) * waveAmplitude;
      j > -180? ctx.lineTo(x, y) : ctx.moveTo(x, y);

    }
    ctx.closePath();
    ctx.stroke();
  }

  function loop() {
    cnv.width |= 0; // ctx.clearRect(0, 0, cnv.width, cnv.height);
    updateRings();
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener(`resize`, init);

}