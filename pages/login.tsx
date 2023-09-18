import { Button, FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const loginHandler = async (e: any) => {
    e.preventDefault();

    const payload = {
      username: username,
      password: password,
    };

    await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="form">
      <h1>Login to LO:Chat</h1>
      <FormControl component="form" onSubmit={loginHandler}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              aria-invalid="false"
              autoComplete="username"
              label="Username"
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              aria-invalid="false"
              autoComplete="current-password"
              label="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 1 }} variant="contained">
          Log In
        </Button>
      </FormControl>
      <p>
        New User? <a href="/regiser">Click to sign up!</a>
      </p>
    </div>
  );
};

export default Login;
