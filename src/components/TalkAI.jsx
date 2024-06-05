import React from "react";
import AIInput from "./TalkAI/AIInput";
import Conversations from "./TalkAI/Conversations";

function TalkAI() {
    return (
        <div className="main-dashboard-container talkai-container">
            <Conversations className="talkai-chat-container" />
            <AIInput />
        </div>
    );
}

export default TalkAI;
