import React, { useState,useContext,useEffect } from 'react';
import { createTheme } from "@mui/material/styles";
import { Card, CardContent, Typography } from '@mui/material';
import  AlertContext from "../../Contexts/Alert/alertContext"
import Notification from '../Notification';
import {IconButton } from '@mui/material';
import Delete from '@mui/icons-material/Delete';


const useStyles = createTheme({
  card: {
    width: '90vw',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f2f2f2',
    color: '#333333',
    padding: '20px',
    borderRadius: '10px',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  info: {
    fontSize: '14px',
    marginBottom: '5px',
  },
});

const ContactRequests = () => {
  const classes = useStyles;
  const ac = useContext(AlertContext);
  const {update} = ac;
  const [requests,setRequests] = useState([{
    _id: '1432',
    name: 'sendername',
    email: 'email123@example.com',
    phone: '1234567890',
    message: 'Request message Shown Here.',
  },])
  
  useEffect(() => {
    async function fetchData() {
      try {
        const headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
        };
        const response = await fetch("http://localhost:5000/api/contactus/getrequests", { 
          method: "GET",
          headers: headersList
        });
        
        const data = await response.json();
        setRequests(data);
        console.log(data);
      } catch (error) {
        update("Contact Req Not Fetched Err")
      }
    }
    fetchData();
  }, [update]);
  const handleDelete = async (id) => {
    try {
      const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
      };
      
      const response = await fetch(`http://localhost:5000/api/contactus/deleterequest/${id}`, { 
        method: "DELETE",
        headers: headersList
      });
      
      const data = await response.json();
      console.log(data);
      setRequests(requests.filter((request) => request._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <Notification/>
      <div className="mt-5 text-center">
        <h2>Contact Requests</h2>
        <p>Here are the latest contact requests from your website visitors:</p>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          {requests.map((request) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={request._id}>
              <Card className={classes.card + " shadow-lg"}>
                <CardContent>
                  <Typography className={classes.name}>{request.name}</Typography>
                  <Typography className={classes.info}>Email: {request.email}</Typography>
                  <Typography className={classes.info}>Phone: {request.phone}</Typography>
                  <Typography className={classes.info}>Message: {request.message}</Typography>
                  <IconButton color="error" aria-label="delete" onClick={() => handleDelete(request._id)}>
                    <Delete />
                  </IconButton>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactRequests;


