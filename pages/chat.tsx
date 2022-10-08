import LoginIcon from "@mui/icons-material/Login";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useRef, useState } from "react";

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

type room = {
  xid: string;
  name: string;
  description: string;
  owner_id: string;
  private: boolean;
};

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

const Chat = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<room>({} as room);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const scrollBottomRef = useRef<HTMLLIElement | null>(null);
  const chatInput = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  const ws = useMemo(
    () =>
      typeof window !== "undefined"
        ? new WebSocket(`wss://${WS_URL}/ws`)
        : null,
    []
  );

  const updateRoomInfo = (room_id: string, owner_id: string) => {
    setRoom((room) => ({
      ...room,
      xid: room_id,
      owner_id: owner_id,
    }));
  };

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
          { body: "Connected to chat server" },
        ]);
      };
    }
  }, [ws]);

  useEffect(() => {
    if (ws) {
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
          updateRoomInfo(
            JSON.parse(e.data).room.xid,
            JSON.parse(e.data).room.owner_id
          );
        }
        if (scrollBottomRef.current) {
          scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      };
    }
  }, [ws, chatHistory]);

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
          room: { xid: room.xid, name: room.name },
          sender: { xid: userID },
        })
      );
      chatInput.current!.value = "";
    }
  };

  return (
    <Container>
      <Paper elevation={3}>
        <Box display="flex" flexDirection="column">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid>
                <TextField
                  variant="filled"
                  fullWidth
                  onChange={(e) => {
                    setRoom((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LoginIcon />
                      </InputAdornment>
                    ),
                  }}
                  label="Enter a room to chat"
                />
              </Grid>
              <Grid>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => {
                    setChatHistory([]);
                    if (ws?.onopen) {
                      updateRoomInfo("", room.owner_id);
                      ws.send(
                        JSON.stringify({
                          type: "command",
                          action: "join-room",
                          room: { xid: room.xid, name: room.name },
                        })
                      );
                    }
                  }}
                >
                  Join
                </Button>
                <Divider />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <List
                id="chatbox"
                sx={{
                  maxHeight: { xs: "50vh", md: "70vh" },
                  height: { xs: "50vh", md: "70vh" },
                  overflow: "auto",
                }}
              >
                {chatHistory.map((m: message, index: number) => (
                  <ListItem
                    key={index}
                    sx={
                      m.sender && {
                        display: "flex",
                        justifyContent:
                          userID === m.sender.xid ? "flex-end" : "flex-start",
                      }
                    }
                  >
                    <Grid container maxWidth="80%" width="fit-content">
                      <ListItemText
                        sx={
                          m.sender && {
                            background:
                              userID === m.sender.xid
                                ? theme.palette.secondary.main
                                : "lightgrey",
                            textAlign:
                              userID === m.sender.xid ? "right" : "left",
                            borderRadius: "10px",
                            overflowWrap: "break-word",
                            padding: "5px",
                            width: "auto",
                          }
                        }
                      >
                        {m.body}
                      </ListItemText>
                    </Grid>
                  </ListItem>
                ))}
                <ListItem ref={scrollBottomRef}></ListItem>
              </List>
            </Grid>

            <Grid container wrap="nowrap" pl="16px" m={1}>
              <Grid item flexGrow="1">
                <FormControl fullWidth>
                  <TextField
                    inputRef={chatInput}
                    label="Enter your message..."
                    variant="outlined"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid item alignSelf="center">
                <IconButton
                  onClick={sendMessage}
                  aria-label="Send message"
                  color="primary"
                  sx={{ textAlign: "center", height: "auto" }}
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
