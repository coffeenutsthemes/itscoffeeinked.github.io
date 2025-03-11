// By Preeya for CoffeeInked.com


$(function() {
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

    // Initial update
    updateDateTime();

    // Ensure the time updates every second
    setInterval(updateDateTime, 1000);
});
