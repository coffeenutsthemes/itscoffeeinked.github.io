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
    shortenNoteCounts();
    removeTumblrRedirects();
    cleanupReblogBlockquotes();
});

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
