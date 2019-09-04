import React, { useReducer } from 'react';
import uuid from 'uuid/v4'
import axios from 'axios';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
// import setAuthToken from '../../utils/setAuthToken';
import {
   SET_ALERT,REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = [];


    const [state, dispatch] = useReducer(alertReducer, initialState)
    //set Alert
    const setAlert=(msg,type,timeOut=5000)=>{
        const id=uuid();
        dispatch({
           type:SET_ALERT,
           payload:{msg,type,id},
            
        })
        setTimeout(()=>dispatch({
            type: REMOVE_ALERT,
            payload:  id ,
        }), timeOut)
    }
  
    //clear Alert




    return (
        <AlertContext.Provider
            value={{
               alerts:state,
               setAlert
            }}>
            {props.children}
        </AlertContext.Provider>)
}
export default AlertState;