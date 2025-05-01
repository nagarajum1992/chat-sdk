# React Chat SDK

A simple, reusable React Chat Component!

## Install

```bash
npm install react-chat-sdk
# or
yarn add react-chat-sdk
```

## Import ChatComponent from "react-chat-sdk"

```bash
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
/>

```

## Request and response for chaturl that fetches history

```bash
Request

user_id: mail-id
page: 1
page_size: 10
order: desc

Response

{
history:[{
                "id": "uuid",
                "session_id": "uuid",
                "user_id": "mail-id",
                "agent_id": number type,
                "user_type": "string",
                "action_type": "",
                "message_type": "text",
                "message": "",
                "meta_data": null,
                "created_at": "",
                "parent_message_id": "",
                "message_read": false
            }],
total:`total items`
}
```
