import React, {useContext, useState, useEffect} from 'react';
import { IPContext } from "../App.js"
import Cookies from 'js-cookie';
import axios from 'axios'

export default function FriendPending(props) {
    axios.defaults.withCredentials = true;

    const IP = useContext(IPContext)
    const [visible, setVisible] = useState(true)

    function handleReject(e) {
        const rejectFriendRequest = async() => {
            axios.delete(`https://exegarden.pythonanywhere.com/friendship/reject/${props.id}/`, {
                'withCredentials': true,
            })
            .then((res) => {
                setVisible(false)
            })
            .catch((err) => {
                console.log(err)
            })


        }
        rejectFriendRequest()
    }

    
    function handleAccept(e) {
        const acceptFriendRequest = async() => {
            axios.patch(`https://exegarden.pythonanywhere.com/friendship/accept/${props.id}/`,{}, {
                'withCredentials': true,
                credentials: "include",
            })
            .then((res) => {
                setVisible(false)
            })
            .catch((err) =>{
                console.log(err)
            })

        }
        acceptFriendRequest()
    }

    return (
        <>
        {visible ?         
            <div id="friends--element">
                <h1>{props.username}</h1>
            <div id="friend-btn-container">
                <button className="btn"
                    onClick={handleAccept}
                >ACCEPT</button>
                <button className="btn"
                    onClick={handleReject}
                >REJECT</button>
            </div>

        </div>
        :
        ""
        }
        </>
)
}