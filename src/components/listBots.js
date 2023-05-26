import React, { useState, useEffect } from "react";
import BotpressWebChat from "./BotpressWebChat";

export const ListBots = ({ cssContent }) => {
  const [apiToken, setApiToken] = useState(
    localStorage.getItem("apiToken") || ""
  );
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    localStorage.getItem("selectedWorkspace") || ""
  );
  const [bots, setBots] = useState([]);
  const [selectedBotId, setSelectedBotId] = useState(
    localStorage.getItem("selectedBotId") || ""
  );
  const [selectedBot, setSelectedBot] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(true); // Track token validity
  const [showToken, setShowToken] = useState(false);
  const [generatedCSSPath, setGeneratedCSSPath] = useState("");

  const handleApiTokenChange = (event) => {
    const token = event.target.value;
    setApiToken(token);
    setIsTokenValid(true);
    localStorage.setItem("apiToken", token);
  };

  const handleWorkspaceChange = (event) => {
    const workspaceId = event.target.value;
    setSelectedWorkspace(workspaceId);
    localStorage.setItem("selectedWorkspace", workspaceId);
    setSelectedBotId("");
    localStorage.removeItem("selectedBotId");
  };

  const handleBotChange = (event) => {
    const botId = event.target.value;
    setSelectedBotId(botId);
    localStorage.setItem("selectedBotId", botId);
  };

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await fetch(
          "https://api.botpress.cloud/v1/admin/workspaces",
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setWorkspaces(data.workspaces);
          setIsTokenValid(true); // Token is valid
        } else {
          setWorkspaces([]); // Reset workspaces when token is invalid
          setIsTokenValid(false); // Token is invalid
        }
      } catch (error) {
        console.log("Error fetching workspaces:", error);
      }
    };

    if (apiToken) {
      fetchWorkspaces();
    }
  }, [apiToken]);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch(
          "https://api.botpress.cloud/v1/admin/bots",
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
              "x-workspace-id": selectedWorkspace,
            },
          }
        );
        const data = await response.json();
        console.log("API response:", data);
        setBots(data.bots);
      } catch (error) {
        console.log("Error fetching bots:", error);
      }
    };

    if (selectedWorkspace && apiToken) {
      fetchBots();
    }
  }, [selectedWorkspace, apiToken]);

  useEffect(() => {
    const selectedBot = bots.find((bot) => bot.id === selectedBotId);
    setSelectedBot(selectedBot);
  }, [selectedBotId, bots]);

  const handleGenerateCSS = async () => {
    console.log(selectedBotId);
    try {
      const response = await fetch("http://localhost:3000/generate-css", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ botId: selectedBotId, cssContent }),
      });

      if (response.ok) {
        const filePath = await response.text();
        const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
        const filePathWithRandom = `${filePath}?random=${randomNum}`; // Append the random number to the filePath
        console.log(`CSS generation successful : ${filePathWithRandom}`);
        setGeneratedCSSPath(filePathWithRandom);
      } else {
        console.log("CSS generation failed");
      }
    } catch (error) {
      console.log("Error generating CSS:", error);
    }

    if (window.botpressWebChat) {
      window.botpressWebChat.configure({
        botId: selectedBotId,
        hostUrl: "https://cdn.botpress.cloud/webchat/v0",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: selectedBotId,
        disableAnimations: true,
        stylesheet: generatedCSSPath,
        botName: "Works"
      });
      window.botpressWebChat.onEvent(
        function () {
          window.botpressWebChat.sendEvent({ type: "show" });
        },

        ["LIFECYCLE.LOADED"]
      );
    }
    if (window.botpressWebChat.configure) {
      window.botpressWebChat.configure({
        botId: selectedBotId,
        hostUrl: "https://cdn.botpress.cloud/webchat/v0",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: selectedBotId,
        disableAnimations: true,
        stylesheet: generatedCSSPath,
        botName: "Works"
      });
      window.botpressWebChat.onEvent(
        function () {
          window.botpressWebChat.sendEvent({ type: "show" });
        },

        ["LIFECYCLE.LOADED"]
      );
    }
  };

  const handleToggleTokenVisibility = () => {
    setShowToken(!showToken);
  };

  return (
    <div>
      <input
        type={showToken ? "text" : "password"}
        value={apiToken}
        className="bot-id-input"
        onChange={handleApiTokenChange}
        placeholder="Paste your Botpress API Token"
      />
      <button
        className="show-token-button"
        onClick={handleToggleTokenVisibility}
      >
        {showToken ? "Hide" : "Show"}
      </button>
      {workspaces.length > 0 && (
        <div className="dropdown">
          <select
            value={selectedWorkspace}
            onChange={handleWorkspaceChange}
            disabled={!isTokenValid}
          >
            <option value="">Select your workspace</option>
            {workspaces.map((workspace) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {bots.length > 0 && (
        <div className="dropdown">
          <select
            value={selectedBotId}
            onChange={handleBotChange}
            disabled={!isTokenValid}
          >
            <option value="">Select a bot</option>
            {bots.map((bot) => (
              <option key={bot.id} value={bot.id}>
                {bot.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleGenerateCSS}
        className={isTokenValid ? "generate-button" : "generate-button-invalid"}
        disabled={!isTokenValid}
      >
        Generate Stylesheet URL
      </button>
      <p>{generatedCSSPath}</p>
      <BotpressWebChat botId={selectedBotId} cssfilepath={generatedCSSPath} />
    </div>
  );
};
