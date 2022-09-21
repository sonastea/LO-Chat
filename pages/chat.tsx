import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";

type message = {
  action: string;
  body: string;
  room: {
    xid: string;
    name: string;
  };
  sender: {
    xid: string;
    name: string;
  };
  type: string;
};

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

const Chat = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [roomID, setRoomID] = useState<string | undefined>();
  const [room, setRoom] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const theme = useTheme();
  const ws = useMemo(
    () =>
      typeof window !== "undefined"
        ? new WebSocket(`wss://${WS_URL}/ws`)
        : null,
    [],
  );

  useEffect(() => {
    if (ws) {
      (readyState: number) => {
        switch (readyState) {
          case 1:
            console.log("socket closed");
        }
      };
      ws.onerror = () => {
        console.log("Websocket connection error");
      };
      ws.onopen = () => {
        setChatHistory((prev: any) => [
          ...prev,
          { body: "Connected to websocket" },
        ]);
      };
      ws.onmessage = (e) => {
        // joining a room resets the chat history and
        // set client id from joining the room
        if (
          JSON.parse(e.data).action === "notify-join-room-message" &&
          JSON.parse(e.data).type === "server"
        ) {
          setUserID(JSON.parse(e.data).body.split(" ").shift());
        }
        setChatHistory((prev: any) => [...prev, JSON.parse(e.data)]);
        if (JSON.parse(e.data).room.xid) {
          setRoomID(JSON.parse(e.data).room.xid);
        }
      };
    }
  }, [ws, chatHistory, userID]);

  useEffect(() => {
    return () => {
      ws?.close(1000, "Unmounted chat page");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "normal",
          body: message,
          room: { xid: roomID, name: room },
          sender: { xid: userID },
        }),
      );
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      <div>Enter a room to join</div>
      <input type="text" onChange={(e) => setRoom(e.target.value)} />
      <button
        onClick={() => {
          setChatHistory([]);
          if (ws?.onopen) {
            setRoomID("");
            ws.send(
              JSON.stringify({
                type: "command",
                action: "join-room",
                room: { xid: roomID, name: room },
              }),
            );
          }
        }}
      >
        Join
      </button>

      <div>Send a message</div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessage()}>Send</button>
      <div id="chatbox">
        {chatHistory.map((m: message, index: number) => (
          <div
            key={index}
            style={
              m.sender && {
                display: "flex",
                justifyContent:
                  userID === m.sender.xid ? "flex-end" : "flex-start",
              }
            }
          >
            <p
              style={
                m.sender && {
                  backgroundColor:
                    userID === m.sender.xid
                      ? theme.palette.secondary.main
                      : "lightgrey",
                  borderRadius: "10px",
                  maxWidth: "80%",
                  overflowWrap: "break-word",
                  padding: "5px",
                }
              }
            >
              {m.body}
            </p>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Chat;
