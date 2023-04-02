import { Snackbar,Button,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React,{useContext, useEffect, useState} from 'react'
import AlertContext from '../Contexts/Alert/alertContext';


export default function Notification() {
  const a = useContext(AlertContext);
  const [show,setShow]=useState(false)
  const {Alert,update} = a; //destructuring of Alert
  
  //for every time changes Alert Showing Alert
  useEffect(()=>{
    if(Alert!==null){
      setShow(true);
    }
    else{
      setShow(false)
    }
  },[update,Alert])

 const handleClose=()=>{
    setShow(false)
    update(null)

 }

 const action = (
  <React.Fragment>
    <Button color="secondary" size="small" onClick={handleClose}>
      Message
    </Button>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
);

  return (
    show&&<Snackbar
  open={show}
  autoHideDuration={2000}
  onClose={handleClose}
  message={Alert}
  action={action}
/>

  )
}