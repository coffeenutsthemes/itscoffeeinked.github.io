// (C) 2025 : Preeya - CoffeeInked.com

$(function () {
    // Ensure FitVids plugin is loaded before using it
    if ($.fn.fitVids) {
        $("#wrap").fitVids();
    }

    // Ensure the tooltip plugin is loaded before using it
    if ($.fn.style_my_tooltips) {
        $("a[title], [title]").style_my_tooltips({
            tip_follows_cursor: true,
            tip_delay_time: 90,
            tip_fade_speed: 700,
            attribute: "title"
        });
    }

    // Random Header Image (Removed duplicate URLs)
    var images = [
        "https://64.media.tumblr.com/690cd606eeb63953e1f1760e87645a6f/tumblr_mhr8dcI0kf1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/92b89d86b491d4d2538e9a5946441247/tumblr_mhr62hz5un1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/8a7c78db6536e2f33ede4d5ad4a925c0/tumblr_mfw7m2FJRt1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/1f21dc574802d637afadf9567578f8dc/tumblr_mfw3izKjyi1rpkdcfo1_250.png"
    ];
    
    var selection = images[Math.floor(Math.random() * images.length)];

    // Ensure the element exists before applying CSS
    if ($(".header-image").length) {
        $(".header-image").css("background-image", "url(" + selection + ")");
        $(".header-image > img").attr("src", selection);
    }

    // Check if the `imagesLoaded` plugin exists before using it
    if ($.fn.imagesLoaded) {
        $(".header-image").imagesLoaded(function () {
            $("header").addClass("on");
        });
    }

    // Image Hover Opacity Effect
    $(".post img").css("opacity", 1);
    $(".post img").hover(
        function () {
            $(this).stop().fadeTo("slow", 0.7);
        },
        function () {
            $(this).stop().fadeTo("slow", 1);
        }
    );

    // Back-to-top Button
    var offset = 220;
    var duration = 500;

    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $(".back-to-top").fadeIn(duration);
        } else {
            $(".back-to-top").fadeOut(duration);
        }
    });

    $(".back-to-top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, duration);
        return false;
    });

    // Date & Time Updater (Auto-refreshes every second)
    function updateDateTime() {
        var dateSticker = $(".currentDate");

        if (dateSticker.length) {
            var today = new Date();

            // Date Values
            var day = today.getDate().toString().padStart(2, "0"); 
            var month = today.toLocaleString("en-sg", { month: "short" }); 
            var year = today.getFullYear(); 

            // Time Values (12-hour format with AM/PM)
            var hours = today.getHours();
            var minutes = today.getMinutes().toString().padStart(2, "0");
            var seconds = today.getSeconds().toString().padStart(2, "0");
            var ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12; // Converts 0 to 12 for midnight

            // Update the content inside the HTML elements
            dateSticker.find(".day").text(day);
            dateSticker.find(".month").text(month);
            dateSticker.find(".year").text(year);
            dateSticker.find(".hours").text(hours);
            dateSticker.find(".minutes").text(minutes);
            dateSticker.find(".seconds").text(seconds);
            dateSticker.find(".ampm").text(ampm);
        }
    }

    // Initial update & auto-refresh every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// New Lightbox & Video Resize Code
$(document).ready(function () {
    $.localScroll();

   $('.post img').each(function () {
        var img = $(this);
        var parentLink = img.parent('a');

        // Ensure it's wrapped in an <a> tag
        if (!parentLink.length) {
            img.wrap('<a href="#"></a>');
            parentLink = img.parent('a');
        }

        // Assign the necessary lightbox attributes
        var photoWidth = img.width();
        var photoHeight = img.height();
        var lowRes = img.attr('src');
        var highRes = img.attr('src'); // Ideally, replace this with a larger version URL

        parentLink.attr('onclick', "Tumblr.Lightbox.init([{ width: " + photoWidth + ", height: " + photoHeight + ", low_res: '" + lowRes + "', high_res: '" + highRes + "' }]); $('body').toggleClass('tumblr_lightbox_active'); return false;");
    });
});

$(function () {
    // Resize videos
    var videoWrappers = document.getElementsByClassName('videoWrapper');
    [].forEach.call(videoWrappers, function (el, i) {
        var width = el.getElementsByTagName('iframe')[0].width,
            height = el.getElementsByTagName('iframe')[0].height;

        el.style.paddingBottom = (height / width * 100) + '%';
    });
});

// Open external links in a new window
function external_new_window() {
    for (var c = document.getElementsByTagName("a"), a = 0; a < c.length; a++) {
        var b = c[a];
        if (b.getAttribute("href") && b.hostname !== location.hostname) {
            b.target = "_blank";
            b.rel = "noopener";
        }
    }
}

// Open PDF and DOC links in a new window
function pdf_new_window() {
    if (!document.getElementsByTagName) return false;
    var links = document.getElementsByTagName("a");
    for (var eleLink = 0; eleLink < links.length; eleLink++) {
        if ((links[eleLink].href.indexOf('.pdf') !== -1) ||
            (links[eleLink].href.indexOf('.doc') !== -1) ||
            (links[eleLink].href.indexOf('.docx') !== -1)) {
            links[eleLink].onclick = function () {
                window.open(this.href);
                return false;
            };
        }
    }
}

pdf_new_window();
external_new_window();

// Redirect unwanted paths
const redirectRules = {
    '^/search/(reblogs|unblock|shorten)(/chrono)?$': '/',
    '^/tagged/(reblogs|unblock|shorten)(/chrono)?$': '/',
};

const path = document.location.pathname;

for (const [pattern, target] of Object.entries(redirectRules)) {
    if (new RegExp(pattern).test(path)) {
        location.replace(target);
        break;
    }
}
