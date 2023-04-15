import React, { useState, useContext, useEffect } from "react";
import AccessDenied from "./AccessDenied";
import AlertContext from "../../Contexts/Alert/alertContext";
import BottomNavbar from "../Homepages/BottomNavbar";
import ContactRequests from "./ContactRequests";
import UploadPdf from "./UploadPdf";
import adminavatar from "../../Assets/adminavatar.svg"
import {
  AppBar,
  Box,
  Grid,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
  ListItem,
  Avatar,
  Divider,
  ListItemAvatar,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@mui/material";



import DashNavbar from "./DashNavbar";

const Dashboard = () => {
  const Ac = useContext(AlertContext);
  const { update } = Ac;

  const [admins, setAdmins] = useState([]);
  const [call, setcall] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://34.125.182.92/auth/admins", {
          method: "GET",
          headers: {
            Accept: "*/*",
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        update(error)
      }
    }
    fetchData();
  }, [call,update]);

  const [deleteData, setDeleteData] = useState({
    email: "",
    password: "",
  });

  const [adminData, setAdminData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //console.log(adminData);
  };

  const handleDeleteIpChange = (e) => {
    const { name, value } = e.target;
    setDeleteData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleonPaste =(e)=>{
  //     const {value} = e.target;
  //     [value] = e.clipboardData.getData('Text');
  // }

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    const bodyContent = JSON.stringify(adminData);
    //console.log(bodyContent);
    const response = await fetch("http://34.125.182.92/auth/signup", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    const data = await response.json();
    update(data.msg);
    e.target.reset();
    setcall(call + 1);
  };

  const handleDeleteAdmin = async (e) => {
    e.preventDefault();
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    const bodyContent = JSON.stringify(deleteData);
    const response = await fetch("http://34.125.182.92/auth/deleteuser", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    const data = await response.json();
    update(data.msg);
    setcall(call + 1);
    setDeleteData({
      email: "",
      password: "",
    });
  };

  if (localStorage.getItem("loggedin") === "true") {
    return (
      <>
        <DashNavbar></DashNavbar>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Dashboard Home</Typography>
          </Toolbar>
        </AppBar>

        <ContactRequests/>
        <UploadPdf update={update}/>

        <div className="mt-5 text-center">
          <h2>Admin Handling</h2>
          <p>
            You can Handle Admins From Here Below is the list Of current Admins provided.
            You need password for deleting a admin.
          </p>
        </div>

        {/* Forms Start*/}
        <Container sx={{ mt: 4 }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10} md={5}>
              <Box
                component="form"
                onSubmit={handleAddAdmin}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Container sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Add New Admin
                  </Typography>
                  <TextField
                    // onPaste={handleonPaste}
                    required
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={adminData.username}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={adminData.email}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={adminData.password}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ alignSelf: "center", mb: 3 }}
                  >
                    Add Admin
                  </Button>
                </Container>
              </Box>
            </Grid>

            <Grid item xs={10} md={5}>
              <Box
                component="form"
                onSubmit={handleDeleteAdmin}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Container>
                  <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
                    Delete An Account
                  </Typography>
                  <TextField
                    fullWidth
                    id="delete-uname"
                    name="Username"
                    label="Username"
                    type="username"
                    sx={{ mb: 2 }}
                    onChange={handleDeleteIpChange}
                  />

                  <TextField
                    required
                    fullWidth
                    id="delete-email"
                    name="email"
                    label="email"
                    type="email"
                    sx={{ mb: 2 }}
                    onChange={handleDeleteIpChange}
                  />
                  <TextField
                    required
                    fullWidth
                    id="delete-password"
                    name="password"
                    label="password"
                    type="password"
                    sx={{ mb: 2 }}
                    onChange={handleDeleteIpChange}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ alignSelf: "center", mb: 3 }}
                  >
                    Delete User
                  </Button>
                </Container>
              </Box>
            </Grid>
          </Grid>
        {/* Forms End */}

        {/* Code To Show All Admins Data */}
        <Divider className="mt-5" />
        <Typography variant="h6" className="text-center mt-2">
          Site Admins
        </Typography>
        <Container maxWidth="xxl">
          <Box className="d-flex justify-content-center" p={5}>
            {admins.length === 0 ? (
              <Typography variant="body1" className="text-center">
                No Admin Please Add one Before You Exit Otherwise You Will Loose
                Access.
              </Typography>
            ) : (
<div className="container-xl border">
<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Avatar</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Email</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {admins.map((admin) => (
        <TableRow key={admin._id}>
          <TableCell component="th" scope="row">
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={admin.username} src={adminavatar} />
              </ListItemAvatar>
            </ListItem>
          </TableCell>
          <TableCell>{admin.username}</TableCell>
          <TableCell>{admin.email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
        </TableContainer>
</div>
            )}
          </Box>
        </Container>
        </Container>
        <BottomNavbar />
      </>
    );
  } else {
    return <AccessDenied />;
  }
};

export default Dashboard;
