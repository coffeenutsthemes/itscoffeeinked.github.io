/*
=====================================
 Tumblr Custom Scripts (CoffeeInked.com)
 Includes:
    1. Tooltip Styling & UI Effects
    2. Shortened Note Counts
    3. Remove Tumblr Redirects
    4. Remove Reblog Blockquotes & Cleanup
=====================================
*/

$(document).ready(function () {
    initTooltips();
    setRandomHeaderImage();
    addImageHoverEffect();
    setupBackToTop();
    shortenNoteCounts();
    removeTumblrRedirects();
    cleanupReblogBlockquotes();
});

/* ==============================
   PART 1: UI Effects & Styling
============================== */

// Tooltip Styling
function initTooltips() {
    $("a[title], [title]").style_my_tooltips({
        tip_follows_cursor: true,
        tip_delay_time: 90,
        tip_fade_speed: 700,
        attribute: "title"
    });
}

// Random Header Image
function setRandomHeaderImage() {
    var images = [
        "https://64.media.tumblr.com/690cd606eeb63953e1f1760e87645a6f/tumblr_mhr8dcI0kf1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/92b89d86b491d4d2538e9a5946441247/tumblr_mhr62hz5un1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/8a7c78db6536e2f33ede4d5ad4a925c0/tumblr_mfw7m2FJRt1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/1f21dc574802d637afadf9567578f8dc/tumblr_mfw3izKjyi1rpkdcfo1_250.png"
    ];
    var selection = images[Math.floor(Math.random() * images.length)];

    $(".header-image").css("background-image", "url(" + selection + ")");
    $(".header-image > img").attr("src", selection);

    $(".header-image").imagesLoaded(function () {
        $("header").addClass("on");
    });
}

// Image Opacity Hover Effect
function addImageHoverEffect() {
    $(".post img").css("opacity", 1);
    $(".post img").hover(
        function () { $(this).stop().fadeTo("slow", 0.7); },
        function () { $(this).stop().fadeTo("slow", 1); }
    );
}

// Back-to-Top Button
function setupBackToTop() {
    var offset = 220, duration = 500;
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
}

/* ==============================
   PART 2: Tumblr Functionalities
============================== */
// http://shythemes.tumblr.com/post/156021137818/hello-i-was-wondering-if-you-knew-how-to-shorten
// Shorten Note Counts
function shortenNoteCounts() {
    $('.postwrap').find('.notecount').each(function () {
        var n = parseFloat($(this).text().split(' ')[0].replace(/\.0$/, ''));
        if (n >= 1000000) {
            n = (n / 1000000).toFixed(1).replace(/\.0$/, '');
            $(this).text(n + 'm N°');
        } else if (n >= 1000) {
            n = (n / 1000).toFixed(1).replace(/\.0$/, '');
            $(this).text(n + 'k N°');
        }
    });
}

// Tumblr Redirect Remover V1 - Updated
// Original source: magnusthemes.tumblr.com
// StackOverflow reference: https://stackoverflow.com/questions/35023389/tumblr-injecting-new-code-into-my-links/35270586
// Remove Tumblr Redirects
function removeTumblrRedirects() {
    $('a[href*="t.umblr.com/redirect"]').each(function () {
        try {
            var originalURL = new URLSearchParams($(this).attr("href").split("?")[1]).get("z");
            if (originalURL) {
                $(this).attr("href", decodeURIComponent(originalURL));
            }
        } catch (error) {
            console.error("Tumblr Redirect Remover V1 Error:", error);
        }
    });
    
    // Tumblr Redirect Remover V2 - Updated
    // Removes 'href.li' redirect
    document.querySelectorAll('a[href*="href.li/?"]').forEach((el) => {
        try {
            var theLink = el.getAttribute("href").split("href.li/?")[1];
            if (theLink) {
                el.setAttribute("href", decodeURIComponent(theLink));
            }
        } catch (error) {
            console.error("Tumblr Redirect Remover V2 Error:", error);
        }
    });
}

/* ==============================
   PART 3: Tumblr Reblog Cleanup
============================== */
// by Preeya - CoffeeInked.com
// Remove Reblog Blockquotes
function cleanupReblogBlockquotes() {
    $("blockquote").each(function () {
        try {
            var $this = $(this);
            if ($this.find("a.tumblr_blog, .npf_row, .tumblr_blog").length) {
                $this.replaceWith($this.html()); 
            }
        } catch (error) {
            console.error("Reblog Blockquote Cleanup Error:", error);
        }
    });

    // Remove Empty <p> and <blockquote> Elements
    $("p, blockquote").each(function () {
        if (!$(this).text().trim() && $(this).children().length === 0) {
            $(this).remove();
        }
    });

    // Unwrap Blockquotes inside Specific Containers
    $(".shorten blockquote, .reblogs blockquote, .poetry blockquote").each(function () {
        $(this).replaceWith($(this).html());
    });

    // Remove Tumblr Attribution & "via" Mentions
    $("p:has(a.tumblr_blog), p:contains('Source:'), p:contains('via')").remove();
    $("a.tumblr_blog").remove();

    // Clean Quote Citations
    $(".qsource:contains('via'), .qsource:contains('Source:')").remove();
    $(".qsource").each(function () {
        var $this = $(this);
        var text = $this.text().replace(/\bvia\b/g, '').replace(/\(via|\)/g, '');
        $this.text(text);
    });
}
