/*
2025 - upgraded Snowflakes
coffeeinked.com
*/

var speed = 38; // Lower number for faster flakes
var flakes = 80; // Number of flakes
var colour = "#FFFFFF"; // Colour of flakes
var slush = 0; // Set to '0' for no slush, or adjust melting height

var flks = [];
var flkx = [];
var flky = [];
var fldy = [];
var swide, shigh;

window.onload = function () {
    if (document.getElementById) {
        var b = document.createElement("div");
        b.id = "bod";
        b.style.position = "absolute";
        document.body.appendChild(b);
        set_scroll();
        set_size();

        for (var i = 0; i < flakes; i++) {
            flks[i] = createDiv(3, 3);
            flkx[i] = Math.floor(Math.random() * swide);
            flky[i] = Math.floor(Math.random() * shigh);
            fldy[i] = 2 + Math.floor(Math.random() * 4);
            flks[i].style.left = flkx[i] + "px";
            flks[i].style.top = flky[i] + "px";
            b.appendChild(flks[i]);
        }

        setInterval(let_it_snow, speed);
    }
};

function createDiv(height, width) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.borderRadius = "50%"; // ✅ Makes flakes circular
    div.style.backgroundColor = colour;
    return div;
}

window.onresize = set_size;
function set_size() {
    swide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    shigh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

window.onscroll = set_scroll;
function set_scroll() {
    var sdown = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var sleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    
    var s = document.getElementById("bod").style;
    s.top = sdown + "px";
    s.left = sleft + "px";
}

function let_it_snow() {
    for (var i = 0; i < flakes; i++) {
        flky[i] += fldy[i];

        if (flky[i] >= shigh) {
            flky[i] = 0;
            fldy[i] = 2 + Math.floor(Math.random() * 4);
            flkx[i] = Math.floor(Math.random() * swide);
        }

        flks[i].style.top = flky[i] + "px";
        flks[i].style.left = flkx[i] + "px";
    }

}
