$(document).ready(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Speech Recognition API is not supported in your browser.");
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'he-IL'; // Set language to Hebrew (Israel)
    recognition.interimResults = false; // Only get the final result
    recognition.continuous = true; // Keep recognizing continuously

    let restartTimeout; // Timer variable to track inactivity

    const restartRecognition = () => {
        console.log("Restarting recognition due to inactivity...");
        recognition.start();
    };

    recognition.onresult = (event) => {
        clearTimeout(restartTimeout); // Clear the timer since we got a result
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log("Recognized Speech:", transcript);
        $('body').append(`<h2>${transcript.toLowerCase()}</h2>`)
        if (transcript.toLowerCase().includes("שמע ישראל")) {
            $('body').append(`<h2>אמרת שמע ישראל</h2>`);
            $('body').css('background', 'blue')
            window.open('https://www.youtube.com/', '_blank')
        }
        if (transcript.toLowerCase().includes("אנא בכוח גדולת ימינך")) {
            $('body').append(`<h2>אמרת את אנא בכוח...תתמודד</h2>`);
            window.open('https://www.photopea.com/', '_blank')
        }
        
        // Restart the timer for inactivity
        restartTimeout = setTimeout(restartRecognition, 5000);
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
    };

    recognition.onend = () => {
        console.log("Speech recognition stopped. Waiting to restart...");
        restartTimeout = setTimeout(restartRecognition, 5000); // Restart after 5 seconds
    };

    // Start speech recognition and initialize inactivity timer
    recognition.start();
    restartTimeout = setTimeout(restartRecognition, 5000);
});
