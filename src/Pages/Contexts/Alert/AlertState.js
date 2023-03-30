import { useState } from "react";
import AlertContext from "./alertContext";


const AlertState=(props)=>{
const[Alert,setAlert] = useState(null);
const update =(a)=>{
    setAlert(a)
}
    return(
        <AlertContext.Provider value={{update,Alert}}>
           {props.children}
        </AlertContext.Provider>
    )

}
export default AlertState;