function owoBig() {
  let flag = 1,
    owo_time = "",
    m = 3,
    div = document.createElement("div"),
    body = document.querySelector("body"),
    observer;
  (div.id = "owo-big"),
    body.appendChild(div),
    new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        let dom = mutations[i].addedNodes,
          owo_body = "";
        2 == dom.length &&
          "OwO-body" == dom[1].className &&
          ((owo_body = dom[1]),
          document.body.clientWidth <= 768 &&
            owo_body.addEventListener("contextmenu", (e) => e.preventDefault()),
          (owo_body.onmouseover = (e) => {
            flag &&
              "IMG" == e.target.tagName &&
              ((flag = 0),
              (owo_time = setTimeout(() => {
                let height = 3 * e.path[0].clientHeight,
                  width = 3 * e.path[0].clientWidth,
                  left = e.x - e.offsetX - (width - e.path[0].clientWidth) / 2,
                  top = e.y - e.offsetY;
                left + width > body.clientWidth &&
                  (left -= left + width - body.clientWidth + 10),
                  left < 0 && (left = 10),
                  (div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`),
                  (div.innerHTML = `<img src="${e.target.src}">`);
              }, 300)));
          }),
          (owo_body.onmouseout = () => {
            (div.style.display = "none"), (flag = 1), clearTimeout(owo_time);
          }));
      }
    }).observe(document.getElementById("post-comment"), {
      subtree: !0,
      childList: !0,
    });
}
document.getElementById("post-comment") && owoBig();
