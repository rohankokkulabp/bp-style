import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const BotpressWebChat = ({ botId, cssfilepath }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  console.log(window.botpressWebChat);

  useEffect(() => {
    if (!isInitialized) {
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
          botName: "Works"
        });
        window.botpressWebChat.onEvent(
          function () {
            window.botpressWebChat.sendEvent({ type: "show" });
          },

          ["LIFECYCLE.LOADED"]
        );
        setIsInitialized(true);
      };
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [botId, cssfilepath, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      const styleElement = document.getElementById("botpress-webchat-style");
      if (styleElement) {
        styleElement.innerHTML = `@import url('${cssfilepath}');`;
      }
    }
  }, [cssfilepath, isInitialized]);

  return (
    <>
      <Helmet>
        <script src="https://cdn.botpress.cloud/webchat/v0/inject.js"></script>
      </Helmet>
      <style id="botpress-webchat-style">@import url('{cssfilepath}');</style>
      <div id="botpress-webchat-container"></div>
    </>
  );
};

export default BotpressWebChat;
