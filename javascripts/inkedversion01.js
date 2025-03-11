$(function () {
    // Tooltip Styling
    $("a[title], [title]").style_my_tooltips({
        tip_follows_cursor: true,
        tip_delay_time: 90,
        tip_fade_speed: 700,
        attribute: "title"
    });

    // Random Header Image
    var images = [
        "https://64.media.tumblr.com/690cd606eeb63953e1f1760e87645a6f/tumblr_mhr8dcI0kf1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/92b89d86b491d4d2538e9a5946441247/tumblr_mhr62hz5un1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/8a7c78db6536e2f33ede4d5ad4a925c0/tumblr_mfw7m2FJRt1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/1f21dc574802d637afadf9567578f8dc/tumblr_mfw3izKjyi1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/690cd606eeb63953e1f1760e87645a6f/tumblr_mhr8dcI0kf1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/92b89d86b491d4d2538e9a5946441247/tumblr_mhr62hz5un1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/8a7c78db6536e2f33ede4d5ad4a925c0/tumblr_mfw7m2FJRt1rpkdcfo1_250.png",
        "https://64.media.tumblr.com/1f21dc574802d637afadf9567578f8dc/tumblr_mfw3izKjyi1rpkdcfo1_250.png"
    ];
    
    var selection = images[Math.floor(Math.random() * images.length)];

    // Apply background image to the header
    $(".header-image").css("background-image", "url(" + selection + ")");

    // Change the <img> src inside .header-image (if it exists)
    $(".header-image > img").attr("src", selection);

    // When images finish loading, add the 'on' class to <header>
    $(".header-image").imagesLoaded(function () {
        $("header").addClass("on");
    });

    // Add opacity effect on images
    $(".post img").css("opacity", 1);
    $(".post img").hover(
        function () {
            $(this).stop().fadeTo("slow", 0.7);
        },
        function () {
            $(this).stop().fadeTo("slow", 1);
        }
    );

    ("#wrap").fitVids();
    
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
});
