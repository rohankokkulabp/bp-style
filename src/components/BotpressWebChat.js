import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const BotpressWebChat = ({ botId, cssfilepath }) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    script.async = true;
    script.onload = () => {
      window.botpressWebChat.init({
        botId,
        hostUrl: "https://cdn.botpress.cloud/webchat/v0",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: botId,
        disableAnimations: true,
        stylesheet: cssfilepath,
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [cssfilepath]);

  useEffect(() => {
    // Update the key value when the botId changes
    setKey((prevKey) => prevKey + 1);
  }, [botId]);

  return (
    <>
      <Helmet>
        <script src="https://cdn.botpress.cloud/webchat/v0/inject.js"></script>
      </Helmet>
      <div key={key} id="botpress-webchat-container"></div>
    </>
  );
};

export default BotpressWebChat;
