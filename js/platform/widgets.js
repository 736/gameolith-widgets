/*!
 * Gameolith Widget Collection
 * © 736 Computing Services Ltd 2012
 * Apache 2.0 licence - http://opensource.736cs.com/licenses/apache2
 * Uses TinyBox2 (CC-BY) - http://www.scriptiny.com/2011/03/javascript-modal-windows/
 */

window.Gameolith={};

Gameolith.tools={};

Gameolith.loaded=false;

Gameolith.tools.cssloader = function(url) {
    var d = document, f = d.createElement("link"), e = d.getElementsByTagName("head")[0];
    f.rel = "stylesheet";
    f.type = "text/css";
    f.media = "all";
    f.href = url;
    e.appendChild(f);
};

Gameolith.tools.box = function () {
    var j, m, b, g, v, p = 0;
    return {
        show: function (o) {
            v = {
                opacity: 70,
                close: 1,
                animate: 1,
                fixed: 1,
                mask: 1,
                maskid: '',
                boxid: '',
                topsplit: 2,
                url: 0,
                post: 0,
                height: 0,
                width: 0,
                html: 0,
                iframe: 0
            };
            for (var s in o) {
                v[s] = o[s];
            }
            if (!p) {
                j = document.createElement('div');
                j.className = 'gme-tbox';
                p = document.createElement('div');
                p.className = 'gme-tinner';
                b = document.createElement('div');
                b.className = 'gme-tcontent';
                m = document.createElement('div');
                m.className = 'gme-tmask';
                g = document.createElement('div');
                g.className = 'gme-tclose';
                g.v = 0;
                document.body.appendChild(m);
                document.body.appendChild(j);
                j.appendChild(p);
                p.appendChild(b);
                m.onclick = g.onclick = Gameolith.tools.box.hide;
                window.onresize = Gameolith.tools.box.resize;
            } else {
                j.style.display = 'none';
                clearTimeout(p.ah);
                if (g.v) {
                    p.removeChild(g);
                    g.v = 0;
                }
            }
            p.id = v.boxid;
            m.id = v.maskid;
            j.style.position = v.fixed ? 'fixed' : 'absolute';
            if (v.html && !v.animate) {
                p.style.backgroundImage = 'none';
                b.innerHTML = v.html;
                b.style.display = '';
                p.style.width = v.width ? v.width + 'px' : 'auto';
                p.style.height = v.height ? v.height + 'px' : 'auto';
            } else {
                b.style.display = 'none';
                if (!v.animate && v.width && v.height) {
                    p.style.width = v.width + 'px';
                    p.style.height = v.height + 'px';
                } else {
                    p.style.width = p.style.height = '100px';
                }
            }
            if (v.mask) {
                this.mask();
                this.alpha(m, 1, v.opacity);
            } else {
                this.alpha(j, 1, 100);
            }
            if (v.autohide) {
                p.ah = setTimeout(Gameolith.tools.box.hide, 1000 * v.autohide);
            } else {
                document.onkeyup = Gameolith.tools.box.esc;
            }
        },
        fill: function (c, u, k, a, w, h) {
            if (u) {
                if (v.image) {
                    var i = new Image();
                    i.onload = function () {
                        w = w || i.width;
                        h = h || i.height;
                        Gameolith.tools.box.psh(i, a, w, h);
                    };
                    i.src = v.image;
                } else if (v.iframe) {
                    this.psh('<iframe src="' + v.iframe + '" width="' + v.width + '" frameborder="0" height="' + v.height + '"></iframe>', a, w, h);
                } else {
                    var x = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    x.onreadystatechange = function () {
                        if (x.readyState === 4 && x.status === 200) {
                            p.style.backgroundImage = '';
                            Gameolith.tools.box.psh(x.responseText, a, w, h);
                        }
                    };
                    if (k) {
                        x.open('POST', c, true);
                        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        x.send(k);
                    } else {
                        x.open('GET', c, true);
                        x.send(null);
                    }
                }
            } else {
                this.psh(c, a, w, h);
            }
        },
        psh: function (c, a, w, h) {
            if (typeof c === 'object') {
                b.appendChild(c);
            } else {
                b.innerHTML = c;
            }
            var x = p.style.width,
                y = p.style.height;
            if (!w || !h) {
                p.style.width = w ? w + 'px' : '';
                p.style.height = h ? h + 'px' : '';
                b.style.display = '';
                if (!h) {
                    h = parseInt(b.offsetHeight, 10);
                }
                if (!w) {
                    w = parseInt(b.offsetWidth, 10);
                }
                b.style.display = 'none';
            }
            p.style.width = x;
            p.style.height = y;
            this.size(w, h, a);
        },
        esc: function (e) {
            e = e || window.event;
            if (e.keyCode === 27) {
                Gameolith.tools.box.hide();
            }
        },
        hide: function () {
            Gameolith.tools.box.alpha(j, -1, 0, 3);
            document.onkeypress = null;
            if (v.closejs) {
                v.closejs();
            }
        },
        resize: function () {
            Gameolith.tools.box.pos();
            Gameolith.tools.box.mask();
        },
        mask: function () {
            m.style.height = this.total(1) + 'px';
            m.style.width = this.total(0) + 'px';
        },
        pos: function () {
            var t;
            if (typeof v.top !== 'undefined') {
                t = v.top;
            } else {
                t = (this.height() / v.topsplit) - (j.offsetHeight / 2);
                t = t < 20 ? 20 : t;
            }
            if (!v.fixed && !v.top) {
                t += this.top();
            }
            j.style.top = t + 'px';
            j.style.left = typeof v.left !== 'undefined' ? v.left + 'px' : (this.width() / 2) - (j.offsetWidth / 2) + 'px';
        },
        alpha: function (e, d, a) {
            clearInterval(e.ai);
            if (d) {
                e.style.opacity = 0;
                e.style.filter = 'alpha(opacity=0)';
                e.style.display = 'block';
                Gameolith.tools.box.pos();
            }
            e.ai = setInterval(function () {
                Gameolith.tools.box.ta(e, a, d);
            }, 20);
        },
        ta: function (e, a, d) {
            var o = Math.round(e.style.opacity * 100);
            if (o === a) {
                clearInterval(e.ai);
                if (d === -1) {
                    e.style.display = 'none';
                    e === j ? Gameolith.tools.box.alpha(m, -1, 0, 2) : b.innerHTML = p.style.backgroundImage = '';
                } else {
                    if (e === m) {
                        this.alpha(j, 1, 100);
                    } else {
                        j.style.filter = '';
                        Gameolith.tools.box.fill(v.html || v.url, v.url || v.iframe || v.image, v.post, v.animate, v.width, v.height);
                    }
                }
            } else {
                var n = a - Math.floor(Math.abs(a - o) * 0.5) * d;
                e.style.opacity = n / 100;
                e.style.filter = 'alpha(opacity=' + n + ')';
            }
        },
        size: function (w, h, a) {
            if (a) {
                clearInterval(p.si);
                var wd = parseInt(p.style.width, 10) > w ? -1 : 1,
                    hd = parseInt(p.style.height, 10) > h ? -1 : 1;
                p.si = setInterval(function () {
                    Gameolith.tools.box.ts(w, wd, h, hd);
                }, 20);
            } else {
                p.style.backgroundImage = 'none';
                if (v.close) {
                    p.appendChild(g);
                    g.v = 1;
                }
                p.style.width = w + 'px';
                p.style.height = h + 'px';
                b.style.display = '';
                this.pos();
                if (v.openjs) {
                    v.openjs();
                }
            }
        },
        ts: function (w, wd, h, hd) {
            var cw = parseInt(p.style.width, 10),
                ch = parseInt(p.style.height, 10);
            if (cw === w && ch === h) {
                clearInterval(p.si);
                p.style.backgroundImage = 'none';
                b.style.display = 'block';
                if (v.close) {
                    p.appendChild(g);
                    g.v = 1;
                }
                if (v.openjs) {
                    v.openjs();
                }
            } else {
                if (cw !== w) {
                    p.style.width = (w - Math.floor(Math.abs(w - cw) * 0.6) * wd) + 'px';
                }
                if (ch !== h) {
                    p.style.height = (h - Math.floor(Math.abs(h - ch) * 0.6) * hd) + 'px';
                }
                this.pos();
            }
        },
        top: function () {
            return document.documentElement.scrollTop || document.body.scrollTop;
        },
        width: function () {
            return self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        },
        height: function () {
            return self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        },
        total: function (d) {
            var b = document.body,
                e = document.documentElement;
            return d ? Math.max(Math.max(b.scrollHeight, e.scrollHeight), Math.max(b.clientHeight, e.clientHeight)) : Math.max(Math.max(b.scrollWidth, e.scrollWidth), Math.max(b.clientWidth, e.clientWidth));
        }
    };
}();
Gameolith.tools.link = function(path) {
  var a, b, c;
  if (/^https/.test(location)) {
    a = 'https';
  } else {
    a = 'http';
  }
  b = "://www.gameolith.com/";
  if (path.charAt(0) === "/") {
    c = path.slice(1);
  } else {
    c = path;
  }
  return a + b + c;
};

Gameolith.tools.strip = function(html) {
  var el;
  el = document.createElement("div");
  el.innerHTML = html;
  return el.textContent || el.innerText;
};

Gameolith.tools.createBox = function(number, slug) {
  var iframe, src;
  iframe = document.createElement("iframe");
  src = Gameolith.tools.link("/try/" + (escape(slug)) + "/?type=widget&utm_source=widgets&utm_medium=demo_box");
  iframe.setAttribute("frameborder", 0);
  iframe.setAttribute("style", "overflow:hidden");
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("width", 500);
  iframe.setAttribute("height", 215);
  iframe.setAttribute("name", "__gameolith_box_" + number);
  iframe.setAttribute("id", "__gameolith_box_" + number);
  iframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
  iframe.setAttribute("seamless", "seamless");
  iframe.setAttribute("src", src);
  return iframe;
};

Gameolith.tools.createButton = function(number, slug, text) {
  var iframe, src;
  iframe = document.createElement("iframe");
  if (text === "undefined") text = "";
  src = Gameolith.tools.link("/try/" + (escape(slug)) + "/?type=button&utm_source=widgets&utm_medium=demo_button&button=" + number + "&text=" + (Gameolith.tools.strip(text)));
  iframe.setAttribute("frameborder", 0);
  iframe.setAttribute("style", "overflow:hidden");
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("height", 28);
  iframe.setAttribute("style", "width:1px");
  iframe.setAttribute("name", "__gameolith_button_" + number);
  iframe.setAttribute("id", "__gameolith_button_" + number);
  iframe.setAttribute("src", src);
  iframe.style.visibility = "hidden";
  return iframe;
};

Gameolith.messageRead = function(event) {
  var button, split_message;
  split_message = event.data.split("=");
  button = {};
  button.id = split_message[0].replace("#", "");
  button.request = split_message[1];
  button.dom_object = document.getElementById("__gameolith_button_" + button.id);
  button.replaced_object = document.querySelector("[data-gameolith-object-id='__gameolith_button_" + button.id + "']");
  button.slug = button.replaced_object.getAttribute("data-game");
  if (Gameolith.debug) console.log(event.data);
  if (button.request === "overlay") {
    return Gameolith.tools.box.show({
      iframe: Gameolith.tools.link("/try/" + button.slug + "/?type=widget&utm_source=widgets&utm_medium=demo_overlay"),
      width: 500,
      height: 215
    });
  } else {
    button.width = parseInt(button.request, 10) + 10;
    button.dom_object.style.visibility = "visible";
    return button.dom_object.style.width = "" + button.width + "px";
  }
};

Gameolith.init = function() {
  var box, boxframe, button, buttonframe, demo_boxes, demo_buttons, num, slug, text, _len, _len2;
  demo_boxes = document.querySelectorAll(".gameolith-demo[data-widget='box']");
  demo_buttons = document.querySelectorAll(".gameolith-demo[data-widget='button']");
  for (num = 0, _len = demo_boxes.length; num < _len; num++) {
    box = demo_boxes[num];
    slug = box.getAttribute("data-game");
    boxframe = Gameolith.tools.createBox(num, slug);
    box.parentNode.insertBefore(boxframe, box);
    box.setAttribute("data-gameolith-object-id", "__gameolith_box_" + num);
    box.style.display = "none";
  }
  for (num = 0, _len2 = demo_buttons.length; num < _len2; num++) {
    button = demo_buttons[num];
    text = button.innerHTML;
    slug = button.getAttribute("data-game");
    buttonframe = Gameolith.tools.createButton(num, slug, text);
    button.parentNode.insertBefore(buttonframe, button);
    button.setAttribute("data-gameolith-object-id", "__gameolith_button_" + num);
    button.style.display = "none";
  }
  if (window._gmecssoverride === void 0) {
    Gameolith.tools.cssloader("https://widgets.gameolith.com/css/platform/style.min.css");
  } else {
    Gameolith.tools.cssloader(window._gmecssoverride);
  }
  window.addEventListener("message", Gameolith.messageRead, false);
  return demo_boxes.length + demo_buttons.length;
};

if (document.readyState === "complete") Gameolith.init();

if (window.addEventListener) {
  window.addEventListener("load", Gameolith.init, false);
} else if (document.attachEvent) {
  window.attachEvent("load", Gameolith.init);
} else {
  window.onload = Gameolith.init;
}
