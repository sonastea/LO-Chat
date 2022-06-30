import { useEffect, useMemo, useState } from "react";

const Browse = () => {
  const [message, setMessage] = useState<string>("");
  const ws = useMemo(
    () =>
      typeof window !== "undefined"
        ? new WebSocket("ws://localhost:8080/api/browse/")
        : null,
    []
  );

  useEffect(() => {
    ws!.onopen = () => {
      console.log("WebSocket connected");
    };
  });

  return (
    <div>
      <p>
        Click Open to create a connection to the server, Send to send a message
        to the server and Close to close the connection. You can change the
        message and send multiple times.
      </p>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => ws?.send(message)}>Send</button>
    </div>
  );
};

export default Browse;
