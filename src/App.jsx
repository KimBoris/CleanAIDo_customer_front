import './App.css'
import ChatButton from "./component/common/ChatButton.jsx";
import {useEffect, useRef, useState} from "react";
import ChatModalComponent from "./component/ai/ChatModalComponent.jsx";
import useImageUpload from "./hooks/useImageUpload.js";
// import { getToken, onMessage } from "firebase/messaging";
// import { messaging } from "./firebase/firebaseConfige.js";
// import {useEffect} from "react";

function App() {

    // async function requestPermission() {
    //     //requesting permission using Notification API
    //     const permission = await Notification.requestPermission();
    //
    //     if (permission === "granted") {
    //         const token = await getToken(messaging, {
    //             vapidKey: 'BD0vjI3VPUoiRygaJB4DT4t8p8y88_1haNnpODwZxwPSn4MZ5j459yMScSvCjSrRlqRC4mmLqyM6YYkeCXOKrkI',
    //         });
    //
    //         //We can send token to server
    //         console.log("Token generated : ", token);
    //
    //     } else if (permission === "denied") {
    //         //notifications are blocked
    //         alert("You denied for the notification");
    //     }
    // }

    // useEffect(() => {
    //     requestPermission();
    // }, []);

    // onMessage(messaging, (payload) => {
    //     console.log(payload);
    //     alert("On Message ")
    // });

    return (
        <>
        </>
    )
}

export default App
