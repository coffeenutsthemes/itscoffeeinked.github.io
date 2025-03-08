// Link: https://fukuo.tumblr.com/post/163044570400/
// Shorten Caption By Faiz @ fukuo.tumblr.com 

// tweaked by Jay Preeya @ coffeeinked.com (flawed but eh ^.^) 
// Sources I referred to:
// https://demos.jquerymobile.com/1.0a2/experiments/api-viewer/docs/fadeOut/index.html
// https://css-tricks.com/snippets/jquery/animate-heightwidth-to-auto/ 
// https://stackoverflow.com/questions/5003220/animate-element-to-auto-height-with-jquery


$(document).ready(function() {
    // Iterate over each element with the class 'shorten' inside elements with the class 'postwrap'
    $('.postwrap').find('.shorten').each(function() {
        var truncate = $(this); 
        var distance = 600; // Height threshold for truncating the post
        var time = 1100; // Animation time in milliseconds
        var fadeTime = 600; // Fade-in time in milliseconds for the "Read Full Post" button
        var adaptiveHeight = truncate.height(), // Get the height of the current element
            toggleBtnText = 'Read Full Post', // Text for the "Read Full Post" button
            toggleUpBtnText = 'Read Less', // Text for the "Read Less" button
            toggleLinkClass = 'togglelink', // Class name for the "Read Full Post" button
            toggleUpLinkClass = 'toggleuplink'; // Class name for the "Read Less" button

        // Check if the element's height exceeds the threshold
        if (adaptiveHeight >= distance) {
            // Add the 'toggleWrapper' class to the element
            truncate.addClass('toggleWrapper');

            // Create and append the "Read Full Post" button
            var toggleLink = $('<button>', {
                type: 'button',
                class: toggleLinkClass,
                text: toggleBtnText
            }).appendTo(truncate);

            // Create and append the "Read Less" button, initially hidden
            var toggleUpLink = $('<button>', {
                type: 'button',
                class: toggleUpLinkClass,
                text: toggleUpBtnText,
                style: 'display: none;'
            }).appendTo(truncate);

            // Event handler for the "Read Full Post" button click
            toggleLink.on('click', function(event) {
                event.preventDefault(); // Prevent the default button behavior
                toggleLink.hide(); // Immediately hide the "Read Full Post" button
                toggleUpLink.show(); // Immediately show the "Read Less" button
                truncate.addClass('toggleUnwrap'); // Add the 'toggleUnwrap' class to the element

                // Animate the height of the element to its full height
                truncate.animate({
                    height: truncate.get(0).scrollHeight
                }, time, function() {
                    $(this).height('auto'); // Set height to auto after animation completes
                });
            });

            // Event handler for the "Read Less" button click
            toggleUpLink.on('click', function(event) {
                event.preventDefault(); // Prevent the default button behavior
                toggleUpLink.hide(); // Immediately hide the "Read Less" button
                truncate.removeClass('toggleUnwrap'); // Remove the 'toggleUnwrap' class from the element

                // Scroll the webpage back to the post
                $('html, body').animate({
                    scrollTop: truncate.offset().top
                }, time);

                // Animate the height of the element back to the threshold height
                truncate.animate({
                    height: distance
                }, time, function() {
                    $(this).height(distance); // Set the height to the threshold after animation completes
                    toggleLink.fadeIn(fadeTime); // Fade in the "Read Full Post" button gently
                });
            });
        }
    });
});




