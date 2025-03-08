// glittertrail 2025 
// NEW AND IMPORVED : COFFEEINKED.COM

// ✅ Fetch sparkle color from the <meta> tag (defaults to "#eea795" if not set)
var metaColor = document.querySelector('meta[name="text:Sparkle Color"]');
var colour = metaColor ? metaColor.getAttribute("content") : "#eea795";

var sparkles = 200; // Number of sparkles
var x = ox = 400, y = oy = 300;
var swide = window.innerWidth, shigh = window.innerHeight;
var sleft = 0, sdown = 0;
var tiny = [], star = [], starv = [], starx = [], stary = [], tinyx = [], tinyy = [], tinyv = [];

window.onload = function() {
    if (document.getElementById) {
        for (var i = 0; i < sparkles; i++) {
            tiny[i] = createDiv(2, 2);
            tiny[i].style.visibility = "hidden";
            tiny[i].style.zIndex = "999";
            document.body.appendChild(tiny[i]);

            starv[i] = 0;
            tinyv[i] = 0;

            star[i] = createDiv(5, 5);
            star[i].style.backgroundColor = "transparent";
            star[i].style.visibility = "hidden";
            star[i].style.zIndex = "999";

            var rlef = createDiv(1, 5);
            var rdow = createDiv(5, 1);
            star[i].appendChild(rlef);
            star[i].appendChild(rdow);
            rlef.style.top = "2px";
            rlef.style.left = "0px";
            rdow.style.top = "0px";
            rdow.style.left = "2px";
            document.body.appendChild(star[i]);
        }
        window.addEventListener("resize", set_width);
        document.addEventListener("mousemove", mouse);
        sparkle();
    }
};

// Creates the sparkle effect
function sparkle() {
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;
        for (var c = 0; c < sparkles; c++) {
            if (!starv[c]) {
                starx[c] = x; 
                stary[c] = y;
                star[c].style.left = `${starx[c]}px`;
                star[c].style.top = `${stary[c]}px`;
                star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor =
                    colour === "random" ? newColour() : colour;
                star[c].style.visibility = "visible";
                starv[c] = 80; // ⭐ Slower fading effect
                break;
            }
        }
    }
    for (var c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }
    setTimeout(sparkle, 30); // ✅ Controlled speed
}

// Update sparkle movement (trailing effect)
function update_star(i) {
    if (--starv[i] === 40) star[i].style.opacity = "0.7"; // ⭐ Smooth fading instead of disappearing
    if (starv[i]) {
        stary[i] += 1.1; // ✅ Slower movement down
        star[i].style.top = `${stary[i]}px`;
        starx[i] += (i % 5 - 2) / 5;
        star[i].style.left = `${starx[i]}px`;
    } else {
        star[i].style.visibility = "hidden";
        tinyv[i] = 80; // ⭐ Longer fade effect
        tiny[i].style.top = `${stary[i]}px`;
        tiny[i].style.left = `${starx[i]}px`;
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.visibility = "visible";
    }
}

// Update tiny sparkles (soft fade effect)
function update_tiny(i) {
    if (--tinyv[i] === 40) {
        tiny[i].style.opacity = "0.5"; // ⭐ Gradual fading
    }
    if (tinyv[i]) {
        tinyy[i] += 0.4; // ✅ Slow natural fall
        tiny[i].style.top = `${tinyy[i]}px`;
        tinyx[i] += (i % 5 - 2) / 5;
        tiny[i].style.left = `${tinyx[i]}px`;
    } else {
        tiny[i].style.visibility = "hidden";
    }
}

// Track cursor movement (creates sparkles at the cursor position)
function mouse(e) {
    x = e.pageX;
    y = e.pageY;
}

// Adjust width/height on resize
function set_width() {
    swide = window.innerWidth;
    shigh = window.innerHeight;
}

// Creates a new div for sparkles
function createDiv(height, width) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.borderRadius = "50%"; // ✨ Smooth round sparkle
    div.style.overflow = "hidden";
    return div;
}

// Generates a random color
function newColour() {
    var c = [255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    c.sort(() => Math.random() - 0.5);
    return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
}
