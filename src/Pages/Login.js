import React, { useState,useContext } from "react";
import {
Button,
Container,
Typography,
TextField,
Box,
} from "@mui/material";
import AlertContext from "../Contexts/Alert/alertContext";
import Loader from '../Pages/Homepages/Loader'
import { useNavigate } from "react-router-dom";



const LoginForm = ()=> {
const ac = useContext(AlertContext);
const {update}= ac;

const [load, setload] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleEmailChange = (e) => {
setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
setPassword(e.target.value);
};
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
setload(true);
try {
let headersList = {
Accept: "/",
"Content-Type": "application/json",
};
let bodyContent = JSON.stringify({
username: "None",
email: email,
password: password,
});
let response = await fetch("http://localhost:5000/auth/login", {
method: "POST",
body: bodyContent,
headers: headersList,
});


  let data = await response.json();

  if (data.success === true) {
    localStorage.setItem("loggedin", "true");
    localStorage.setItem("auth-token", data.authtoken);
    update("Admin Logged In");
    navigate("/admin/dashboard")
    setload(false);
    
  } else if (data.success !== true) {
    update("Wrong Credentials Please Try Again Later");
    setTimeout(() => {
      update(null);
    }, 2000);
    setload(false);
  }
} catch (err) {
  update("Server Down Please Try Again Later");
  setTimeout(() => {
    update(null);
  }, 2000);
  setload(false);
}
};

return (
<>
<Loader open={load} />
<Container maxWidth="xs" sx={{ marginTop: "4rem" }}>
<Box
sx={{
display: "flex",
flexDirection: "column",
alignItems: "center",
p: 5,
bgcolor: "background.paper",
borderRadius: 1,
boxShadow: 8,
}}
>
<Typography variant="h5" gutterBottom>
Login
</Typography>
<Box autoComplete="on" component="form" onSubmit={handleSubmit}>
<TextField
           margin="normal"
           required
           fullWidth
           label="Email Address"
           type="email"
           name="email"
           autoComplete="email"
           autoFocus
           onChange={handleEmailChange}
         />
<TextField
           margin="normal"
           required
           fullWidth
           name="password"
           label="Password"
           type="password"
           autoComplete="current-password"
           onChange={handlePasswordChange}
         />
<Button
fullWidth
variant="contained"
color="primary"
type="submit"
sx={{ mt: 3, mb: 2 }}
>
Sign In
</Button>
</Box>
</Box>
</Container>
</>
);
};

export default LoginForm;