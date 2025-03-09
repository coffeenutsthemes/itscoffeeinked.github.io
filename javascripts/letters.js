$(document).ready(function() {
    // Define the content to be inserted above and below the Ask Form
    const askAbove = `
        <div class="text-body" style="border-radius: 3px; padding: 10px; background:#FFFFFF url('https://static.tumblr.com/sjbnexx/os2sss6ad/florals.png') repeat center fixed;">
            <h3>Hi, nice to meet you!</h3>
            <p>
                <ol>
                    <li>Same old person who ran coffeeStainedBooks and coffeeInked.</li>
                    <li>Yes, I did contact Tumblr but they didn't reply to my ticket!</li>
                    <li>It's the Year of the Snake—a sign to shed the old!</li>
                </ol>
            </p>
        </div>
    `;

    const askBelow = `
        <div class="text-body">
            <h4><em>Thanks for dropping by!</em></h4>
        </div>
    `;

    // Insert content above and below the Ask Box (if #ask_form exists)
    if ($("#ask_form").length) {
        $("#ask_form").before(askAbove);
        $("#ask_form").after(askBelow);
    }
});
