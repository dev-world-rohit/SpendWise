import React, { useState, useEffect } from "react";

function AIInput() {
    const [inputValue, setInputValue] = useState("");
    const [isListening, setIsListening] = useState(false);
    const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();

    useEffect(() => {
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");

            setInputValue(transcript);
        };

        recognition.onerror = (event) => {
            console.error(event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    }, [recognition]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleMicrophoneClick = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="talkai-container">
            <div className="input-button-container">
                <textarea
                    type="text"
                    name="aiinput"
                    id="ai"
                    placeholder="type your conversation here..."
                    className="talk-ai-input"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button className="arrow-button">→</button>
                <button
                    className={`microphone-button ${
                        isListening ? "listening" : ""
                    }`}
                    onClick={handleMicrophoneClick}
                >
                    🎤
                </button>
            </div>
        </div>
    );
}

export default AIInput;
