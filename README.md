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

## Request and Response for chaturl that fetches history (chatURL)

```json

Request formdata that accept at server side (which already being sent from sdk)


"user_id": "mail-id",
"page": 1,
"page_size": 10,
"order": "desc"


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

## Request and Response for audioURL

```json

Request formdata that accept at server side (which already being sent from sdk)

"audio": binary
"user_id":"mail-id"
"src_lang":"en-IN"

Response

{
    "language_code": "en-IN",
    "provider": "sarvam",
    "success": true,
    "transcript": "",
    "translation": ""
}
```

## Request and Response for websocket

```json

Request params thatb accept st server side (which already being sent from sdk)

{
  "user_id": "userId",
  "query": "message",
  "transcript_query": "translated_message",
  "entity_id": "uuid",
  "agent_id": 0,
  "type": "agent_chat",
  "agent_type": "",
  "audio_enabled": false,
  "language_code": "en-IN"
},

Response

{
  "id": "uuid",
  "type": "agent_response",
  "session_id": "uuid",
  "user_id": "example@gmail.com",
  "user_type": "agent | user",
  "agent_response": {
    "reasoning": "",
    "message": "",
    "message_type": "text",
    "content": {
      "text": "",
      "headers": null,
      "rows": null,
      "type": null,
      "labels": null,
      "data": null,
      "items": null,
      "markdown": "",
      "file_size": 0,
      "file_name": ""
    },
    "followup_questions": null,
    "actions": null,
    "audio_urls": null,
    "language_code": "",
    "audio_storage_prefix": "example.wav",
    "translated_message": ""
  },
  "message_type": "text"
}

```

configure audio output url at server side with audio_storage_prefix param which should accept .wav file and it will be handle at sdk
