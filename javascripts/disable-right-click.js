// (c) modern, optimized version - 2025 - CoffeeInked.com

document.addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Disable right-click
}, false);

document.addEventListener("keydown", function (e) {
    // Disable common shortcuts: Ctrl+U (View Source), Ctrl+Shift+I (DevTools), F12, Ctrl+S, Ctrl+P
    if (
        (e.ctrlKey && e.key === "u") || 
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.key === "F12") || 
        (e.ctrlKey && e.key === "s") ||
        (e.ctrlKey && e.key === "p")
    ) {
        e.preventDefault();
    }
}, false);

document.addEventListener("selectstart", function (e) {
    e.preventDefault(); // Disable text selection
}, false);

document.addEventListener("dragstart", function (e) {
    e.preventDefault(); // Disable dragging
}, false);
