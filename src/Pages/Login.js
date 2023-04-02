import { useState, useContext } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import AlertContext from "../Contexts/Alert/alertContext";
import { useNavigate } from "react-router-dom";

const Log = () => {
  const Ac = useContext(AlertContext);
  const { update } = Ac;
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      let bodyContent = JSON.stringify({
        username: "None",
        email: email,
        password: password,
      });
      //console.log(bodyContent);

      let response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.json();
      //  //console.log(data);
      if (data.success === true) {
        localStorage.setItem("loggedin", "true");
        localStorage.setItem("auth-token", data.authtoken);
        update("Admin Logged In");
        setTimeout(() => {
          update(null);
        }, 2000);
        navigate("/admin/dashboard");
      } else if (data.success !== true) {
        update("Wrong Credentials Please Try Again Later");
        setTimeout(() => {
          update(null);
        }, 2000);
      }
    } catch (err) {
      //console.log(err);
      update("Server Down Please Try Again Later");
      setTimeout(() => {
        update(null);
      }, 2000);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: "4rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
          backgroundColor: "#E8F0FE",
          mt: 5,
          mx: "auto",
          px: 1,
          border: "1px solid #ccc",
          borderRadius: 4,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "center",
          justifyContent: "center",
          width: 350,
          height: 450,
        }}
      >
        <h3 className="font-bold text-primary">Login</h3>
        <p className="text-sm mt-4">To Access Admin Previllage</p>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              required
              sx={{ width: 240 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </Box>
        </form>{" "}
      </Box>
    </Container>
  );
};
export default Log;
