# React Chat SDK

A simple, reusable React Chat Component!

## Install

```bash
npm install react-chat-sdk
# or
yarn add react-chat-sdk
```

## Import ChatComponent from "react-chat-sdk"

````bash
<ChatComponent
      serverUrl={{
        chatURL:`api endpoint that fetches history`

        audioURL:`audio transcript endpoint`

        webSocketURL:`websocket url that can load live messages`

      }}
      headers={{
        Authorization: `auth token if needed`,
      }}
      userName={"Full Name"}
      userId={"mail-id"}
    />
    ```
````
