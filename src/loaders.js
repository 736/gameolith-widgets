Gameolith.tools.cssloader = function(url) {
    var d = document, f = d.createElement("link"), e = d.getElementsByTagName("head")[0];
    f.rel = "stylesheet";
    f.type = "text/css";
    f.media = "all";
    f.href = url;
    e.appendChild(f);
};

