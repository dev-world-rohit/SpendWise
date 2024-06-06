import React, { useState, useEffect, useMemo } from "react";
import { IoSend } from "react-icons/io5";

function AIInput() {
    const [inputValue, setInputValue] = useState("");
    const [isListening, setIsListening] = useState(false);

    const recognition = useMemo(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        return recog;
    }, []);

    useEffect(() => {
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
        <div className="talkai-input-container">
            <textarea
                type="text"
                name="aiinput"
                id="ai"
                placeholder="type your conversation here..."
                className="talk-ai-input"
                value={inputValue}
                onChange={handleInputChange}
            />
            <div className="input-talkai-buttons">
                <button className="arrow-button">
                    <IoSend />
                </button>
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
