import { Button, FormControl, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const MIN_LENGTH: number = 3;
const MAX_LENGTH: number = 45;
const PASSWORD_MIN_LENGTH: number = 8;

const Signup = () => {
  const [username, setUsername] = useState<string>("   ");
  const [password, setPassword] = useState<string>("        ");
  const [password2, setPassword2] = useState<string>("        ");
  const [email, setEmail] = useState<string>("");
  const [userError, setUserError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  useEffect(() => {
    if (username?.length < MIN_LENGTH) {
      setUserError(`Username must have a minimum of ${MIN_LENGTH} characters`);
    } else if (username?.length > MAX_LENGTH) {
      setUserError(`Username can not exceed ${MAX_LENGTH} characters`);
    } else setUserError("");
  }, [username]);

  useEffect(() => {
    if (password2 !== password) {
      setPasswordError(`Passwords do not match`);
    } else if (password.length < PASSWORD_MIN_LENGTH) {
      setPasswordError(
        `Password must be a minimum of ${PASSWORD_MIN_LENGTH} characters`,
      );
    } else setPasswordError("");
  }, [password2, password]);

  const signupHandler = async (e: any) => {
    e.preventDefault();

    const payload = {
      username: username,
      password: password,
      password2: password2,
      email: email,
    };

    await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="form">
      <h1>Signup for LO:Chat</h1>
      <FormControl component="form" onSubmit={signupHandler}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              aria-invalid="false"
              autoComplete="username"
              label="Username"
              name="username"
              type="text"
              required
              error={userError ? true : false}
              helperText={userError}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              aria-invalid="false"
              autoComplete="new-password"
              label="Password"
              name="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              aria-invalid="false"
              autoComplete="new-password"
              label="Confirm Password"
              name="password2"
              type="password"
              required
              error={passwordError ? true : false}
              helperText={passwordError}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              error={emailError ? true : false}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 1 }} variant="contained">
          Sign Up
        </Button>
      </FormControl>
    </div>
  );
};

export default Signup;
