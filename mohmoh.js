Object.defineProperty(window, "vultr", {
  get() {
    return {
      __proto__: null,
      "scheme": "mm_exp",
      "servers": [{
        __proto__: null,
        "ip": "mohmohx",
        "scheme": "mm_exp",
        "region": "0",
        "index": 0,
        "games": [{
          "playerCount": 0,
          "isPrivate": false
        }]
      }, {
        __proto__: null,
        "ip": "p2p",
        "scheme": "mm_exp",
        "region": "vultr:1",
        "index": 0,
        "games": [{
          "playerCount": ~~(Math.random() * 50),
          "isPrivate": false
        }]
      }],
      "regionInfo": [{
        "name": "Pulsar's server"
      }, {
        "name": "Experimental P2P Network"
      }]
    };
  }, set(_) { }
});

function chooseTab(n) {
  const menuCards = document.querySelectorAll(".menuCard");
  const slider = document.querySelector(".slider");

  Array.from(menuCards, _ => _.style.display = "none");

  menuCards[n].style.display = "block";
  slider.style.left = (20 * n + 4 * n) + "%";
}

window.setInterval = new Proxy(window.setInterval, {
  __proto__: null,

  apply(targetObj, thisObj, argsArr) {
    if (/for\s\(let\s(\w+)\sof\svultr\.servers/gm.test(argsArr[0].toString())) {
      console.debug("Trying to remove reducant fixId by it's performant alternative");
      
      argsArr[0] = function adequateFixId() {
        let _Object$values;

        let copyServers = {};

        for (let s of window.vultr.servers) {
          copyServers[s.region] || (copyServers[s.region] = []);
          copyServers[s.region].push(s);
        }

        try {
          vultrClient.servers = copyServers;
        } catch(e) { }

        if (typeof vultrClient !== "undefined")
          clearInterval(fixId);
      }
    }

    return targetObj.apply(thisObj, argsArr);
  }
});

XMLHttpRequest.prototype.open = new Proxy(XMLHttpRequest.prototype.open, {
  __proto__: null,
  apply(target, that, args) {
    if (/ping/gm.test(args[1])) args[1] = "data:,";

    if (/serverData/gm.test(args[1])) args[1] = "data:," + JSON.stringify(window.vultr);

    return target.apply(that, args);
  }
});

let __socket__;

WebSocket = new Proxy(WebSocket, {
  __proto__: null,
  construct(target, args) {
    if (__socket__) return __socket__;

    __socket__ = new target(location.href.includes("127.0.0.1") ? "ws://127.0.0.1:10000" : "wss://mohmohx.onrender.com", ["antibot-xss", "v3.penguin-stats.live+proto"]);

    let el = document.createElement("iframe");

    el.src = "./local.html";
    el.style = "width: 100%; height: 100%; z-index: 9999; position: fixed; top: 0; left: 0; border: 0; backdrop-filter: blur(5px); transition: all 2s";

    __socket__.addEventListener("open", e => {
      el.style.opacity = 0;
      el.style.transform = "scale(2)";
      el.style.pointerEvents = "none";

      el.contentWindow.noDev = true;
      
      try {
        el.contentWindow.document.getElementsByTagName("dev-card")[0].remove();
      } catch(e) { }

      el = null;
    });

    __socket__.addEventListener("close", e => {
      if (el) {
        el.contentWindow.document.getElementById("connMs").innerHTML = "Disconnected";
      }
    });

    document.documentElement.appendChild(el);

    window.__socket__ = __socket__;

    return window.__socket__;
  }
})

class Hook {
  constructor(object, prop, newVal) {
    try {
      Object.defineProperty(object, prop, {
        configurable: true,
        get() {
          return newVal;
        }, set(value) { }
      })
    } catch(e) { }
  }
}

window._css_updatePingCounter = new Function;
window._css_updateVariantProgress = new Function;
window.consentBlock = { style: {} };
window.cpmstarAPI = () => {};

new Hook(Object.prototype, "maxPlayers", 55);
new Hook(Object.prototype, "snowBiomeTop", 600);
new Hook(Object.prototype, "mapScale", 8000);
new Hook(Object.prototype, "riverWidth", 100);

try {
  Object.defineProperty(window, "captchaCallback", {
    __proto__: null,
    set(callback) {
      callback({ });
    }, get() {
      return window.cpmstarAPI;
    }
  });
} catch(e) { }

localStorage.setItem("consent", true);

window.consentBlock = { style: { } };

window.grecaptcha = new class {
  constructor() {
    this.maxCalls = 3;
  }

  async execute(token, options) {
    if (!this.maxCalls--) throw new SyntaxError("Failed to accumulate beta photons for byte 0xC3");

    return "flowerpro";
  }
};

let mouseY, mouseX, lastMove = 0;

window.addEventListener("mousemove", event => {
  [mouseX, mouseY] = [event.clientX, event.clientY];

  lastMove = Date.now();
});

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("skinPreview");

  canvas.width = 680;
  canvas.height = 200;

  const context = canvas.getContext("2d");

  let initX = 240 - 35 / 2;
  let initY = 100;

  (function render() {
    try {
      const color = [...document.querySelectorAll(".activeSkin")][0].style.backgroundColor;

      const angle = Math.atan2(window.innerHeight / 2 - mouseY, window.innerWidth / 2 - mouseX) - Math.PI;

      context.clearRect(0, 0, 680, 200);

      context.lineWidth = 5.5;
      context.fillStyle = color;
      context.strokeStyle = "#3d3f42";

      const power = Date.now() - lastMove;

      if (initX > 35 && initX < 400) initX += Math.cos(angle || 0);
      else initX = 240 - 35 / 2;

      if (initY > 35 && initY < 165) initY += Math.sin(angle || 0);
      else initY = 100;

      context.beginPath();
      context.arc(initX + Math.cos(angle - Math.PI / 3) * 35, initY + Math.sin(angle - Math.PI / 3) * 35, 15, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      context.closePath();

      context.beginPath();
      context.arc(initX + Math.cos(angle + Math.PI / 3) * 35, initY + Math.sin(angle + Math.PI / 3) * 35, 15, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      context.closePath();

      context.beginPath();
      context.arc(initX, initY, 35, 0, 2 * Math.PI); 
      context.fill();
      context.stroke();
      context.closePath();
    } catch(e) { }

    requestAnimationFrame(render);
  })();
});

setTimeout(() => {
  if (!__socket__) {
    if (confirm(` == ACHTUNG ==
MohMoh Vanilla is meant to be played with a hack

This is enforced to reduce chances of DMCA takedowns
You have to supply the game code yourself
MohMoh Vanilla doesn't use any of FRVR's code by default

MohMoh Vanilla is not affiliated with FRVR in any way

To prevent 'gotchas' from FRVR, Pulsar doesn't distribute any hacks or the game code himself.
`)) location.href = `https://dsc.gg/mva-official`;
  }
}, 2000);

window.history.replaceState = new Function();
