# React Chat SDK

A simple, reusable React Chat Component!

## Install

```bash
npm install react-chat-sdk
# or
yarn add react-chat-sdk
```

## Getting Started

```js
import ChatComponent from "react-chat-sdk";

<ChatComponent
  serverUrl={{
    chatURL: "API endpoint that fetches history",
    audioURL: "Audio transcript endpoint",
    webSocketURL: "WebSocket URL that can load live messages",
  }}
  headers={{
    Authorization: "Auth token if needed",
  }}
  userName={"Full Name"}
  userId={"Mail ID"}
/>;
```

## Request and response for chaturl that fetches history (chatURL)

```json

Request params (which already being sent from sdk)

{
"user_id": "mail-id",
"page": 1,
"page_size": 10,
"order": "desc"
}

Response

"data": {
        "history": [
            {
                "id": "uuid",
                "session_id": "uuid",
                "user_id": "mail-id",
                "agent_id": 0,
                "user_type": "agent || user",
                "action_type": "",
                "message_type": "text",
                "message": "",
                "meta_data": null,
                "created_at": "",
                "parent_message_id": "",
                "message_read": false
            }
        ],
        "total": 58
    },
```

## Options

```js

serverUrl={{
        chatURL:
          "url that fetches history",
        audioURL:
          "audio url that translate audio",
        audioOutputURL:
          "url that gives audio transcript should be wav file",
        webSocketURL:
          "url?user_id=example@gmail.comi&agent_id=0",
      }}
      headers={{
        Authorization: `Bearer token`,
      }}
      userName={"Full Name"}
      userId={"example@gmail.com"}
      entityId={"uuid"}
      showLanguageSelector={false}
      format={"engToEng | regLangToEng | regLangToRegLang | regLangToBoth"}
```

engToEng, // English Input -> English Output
regLangToEng, // Regional Language Input -> English Output
regLangToRegLang, // Regional Language Input -> Regional Language Output
regLangToBoth, // Regional Language Input -> Both English & Regional Language Output
