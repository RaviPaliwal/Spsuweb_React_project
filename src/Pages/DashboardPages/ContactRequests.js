import React, { useState,useContext,useEffect } from 'react';
import { createTheme } from "@mui/material/styles";
import { Card, CardContent, Typography } from '@mui/material';
import  AlertContext from "../../Contexts/Alert/alertContext"
import Notification from '../Notification';
import {IconButton } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Loader from "../Homepages/Loader"

const useStyles = createTheme({
  card:{
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
  const [requests,setRequests] = useState([]);
  const [load,setload] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
        };
        const response = await fetch("http://34.125.182.92/api/contactus/getrequests", { 
          method: "GET",
          headers: headersList
        });
        
        const data = await response.json();
        setRequests(data);
        if(data[0]===undefined){
          setRequests([{
            _id: '1432',
            name: 'Sendername',
            email: 'Email123@example.com',
            phone: '1234567890',
            message: 'Request message Shows Here.',
          },]);
          
        }
      } catch (error) {
        update("Contact Req Not Fetched")
      }
    }
    setload(true);
    fetchData();
    setload(false);
  }, [update]);
  const handleDelete = async (id) => {
    try {
      const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
      };
      
      const response = await fetch(`http://34.125.182.92/api/contactus/deleterequest/${id}`, { 
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
    <Loader open={load} />
    <Notification/>
      <div className="mt-5 text-center">
        <h2>Contact Requests</h2>
        <p>Here are the latest contact requests from your website visitors:</p>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          {requests.map((request) => (
            <div key={request._id} className="col-12 col-md-6 col-lg-4 mb-4" >
              <Card className={classes.card + " shadow-lg"}>
                <CardContent>
                  <Typography sx={classes.name}>{request.name}</Typography>
                  <Typography sx={classes.info}>Email: {request.email}</Typography>
                  <Typography sx={classes.info}>Phone: {request.phone}</Typography>
                  <Typography sx={classes.info}>Message: {request.message}</Typography>
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


