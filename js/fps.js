if (
  null == window.localStorage.getItem("fpson") ||
  "1" == window.localStorage.getItem("fpson")
) {
  var rAF =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1e3 / 60);
      },
    frame = 0,
    allFrameCount = 0,
    lastTime = Date.now(),
    lastFameTime = Date.now(),
    loop = function () {
      var now = Date.now(),
        fs = now - lastFameTime,
        fps = Math.round(1e3 / fs);
      if (
        ((lastFameTime = now), allFrameCount++, frame++, now > 1e3 + lastTime)
      ) {
        var fps;
        if ((fps = Math.round((1e3 * frame) / (now - lastTime))) <= 5)
          var kd = '<span style="color:#bd0000">卡成ppt🤢</span>';
        else if (fps <= 15)
          var kd = '<span style="color:red">电竞级帧率😖</span>';
        else if (fps <= 25)
          var kd = '<span style="color:orange">有点难受😨</span>';
        else if (fps < 35)
          var kd = '<span style="color:#9338e6">不太流畅🙄</span>';
        else if (fps <= 45)
          var kd = '<span style="color:#08b7e4">还不错哦😁</span>';
        else var kd = '<span style="color:#39c5bb">十分流畅🤣</span>';
        (document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`),
          (frame = 0),
          (lastTime = now);
      }
      rAF(loop);
    };
  loop();
} else document.getElementById("fps").style = "display:none!important";
