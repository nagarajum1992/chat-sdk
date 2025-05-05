import React from "react";
import ChatComponent from "../src/components/Dashboard/ChatComponent"; // import your component directly

function App() {
  return (
    <ChatComponent
      serverUrl={{
        chatURL:
          "https://dwyte-gcp-dev.soham.ai/agent-conversation-service/v1/get_conversation_history",
        audioURL:
          "https://dwyte-gcp-dev.soham.ai/agent-conversation-service/v1/speech-to-text-translate ",
        audioOutputURL:
          "https://dwyte-gcp-dev.soham.ai/agent-conversation-service/v1/get_agent_audio",
        webSocketURL:
          "wss://dwyte-gcp-dev.soham.ai/agent-conversation-service/v1/ws/agent-chat?user_id=pankaj.gaur@jukshio.com&agent_id=223",
      }}
      headers={{
        Authorization: `Bearer eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.Ck0POJXxRgFHj-2KpJ8NS9G0qEep4RzFF3b_afjwzeBlkKrj-XDW6A.QHWZEXEMWQO1-BemdX7VgQ.uomosS6mO1rf8UYjc5Hl2WRGN570esUFYrwJZj97kmP2dSKEUsYejIIHt96nhPUEuWLzZDjAU075Xk-bo4NCzTu0_72yE3qCjIH9Ra2V_OurtWg2p_nTVNu7h1YWusMBDwhMzjyf7S3QjXSPSCz171YJ-wuC3wHdIegOscYnDHBIJGxIJeu9zek3IZDsmaYQ.-3AQqTiS7DKbZmGnR0XdGg`,
      }}
      userName={"Pankaj Gaur"}
      userId={"pankaj.gaur@jukshio.com"}
      entityId={"2c376b86-ec69-43c6-801a-bc4160ab8617"}
      format={"engToEng"}
    />
  );
}

export default App;
