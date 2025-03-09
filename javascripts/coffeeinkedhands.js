// By Preeya from CoffeeInked Tumblr

// Remove reblog blockquotes and unwrap content
$("blockquote").each(function() {
    var $this = $(this);
    if ($this.find("a.tumblr_blog, .npf_row, .tumblr_blog").length) {
        $this.replaceWith($this.html()); // Unwrap only reblogged blockquotes
    }
});

// Remove empty <p> and <blockquote> elements
$("p, blockquote").each(function() {
    if (!$(this).text().trim() && $(this).children().length === 0) {
        $(this).remove();
    }
});

// Unwrap blockquotes inside specific containers (.shorten, .reblogs, .poetry)
$(".shorten blockquote, .reblogs blockquote, .poetry blockquote").each(function() {
    $(this).replaceWith($(this).html());
});

// Remove Tumblr attribution links & Source/via mentions
$("p:has(a.tumblr_blog), p:contains('Source:'), p:contains('via')").remove();
$("a.tumblr_blog").remove();

// Remove "via" and "Source:" in quote citations properly
$(".qsource:contains('via'), .qsource:contains('Source:')").remove();

// Remove "via" inside .qsource but preserve text formatting
$(".qsource").each(function() {
    var $this = $(this);
    var text = $this.text().replace(/\bvia\b/g, '').replace(/\(via|\)/g, '');
    $this.text(text);
});
