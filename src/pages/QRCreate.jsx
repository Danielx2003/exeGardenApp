import {React, useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

import { IPContext } from "../App.js"
import CheckForAdmin from '../components/CheckForAdmin.jsx'

export default function QRCreate() {
  const [name, setName] = useState("")
  const [xp, setXp] = useState("")
  const [points, setPoints] = useState("")
  const [type, setType] = useState("1")
  const [date, setDate] = useState("")

  const [btnPressed, setBtnPressed] = useState(false)
  const [count, setCount] = useState(0)
  let navigate = useNavigate()

  const POINTS_CAP = 50
  const XP_CAP = 50

  const IP = useContext(IPContext)

  useEffect(() => {
    const postQRCode = async () => {
      const response = await axios.post(
        `https://exegarden.pythonanywhere.com/qrcodes/`, {
          'name': name,
          'xp': xp,
          'points': points,
          'qr_type': type,
          'expiration_date': date + ":00Z",
         },
        {
          'withCredentials': true,
          credentials: "include",
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      )
      .then((res) => {
        alert('QR Code successfully created!')
        navigate('/admin/')
      })
      .catch((err) => {
        console.log(err)
        alert("Invalid input.")
      })
    }

    if (count > 1) {
      postQRCode()
    }
    else {
      setCount(count => count + 1)
    }
  }, [btnPressed])

  function handleClick(e) {
    e.preventDefault()
    setBtnPressed(prev => !prev)
  } 

  const handleNameChange = (e) => setName(e.target.value)
  const handleXPChange = (e) => (e.target.value <= XP_CAP) ? setXp(e.target.value) : setXp(POINTS_CAP)
  const handlePointsChange = (e) => (e.target.value <= XP_CAP) ? setPoints(e.target.value) : setPoints(POINTS_CAP) 
  const handleTypeChange = (e) => setType(e.target.value)
  const handleDateChange = (e) => setDate(e.target.value)
  
  return (
    <>
      <div class="login-container">
      <CheckForAdmin />
      <div class="form-container">
        <div class="form-group">
          <label for="name">Event Name</label>
          <input 
            class="form-control" 
            type="text" 
            value={name}
            onChange={handleNameChange} />
        </div>
        <div class="form-group">
          <label for="points">Points Gained</label>
          <input 
          class="form-control" 
          type="number" 
          min='0'
          value={points}
          onChange={handlePointsChange} />
        </div>
        <div class="form-group">
          <label for="xp">XP Gained</label>
          <input 
            class="form-control" 
            type="number" 
            min='0'
            value={xp}
            onChange={handleXPChange} />
        </div>
        <div class="form-group">
          <label for="type">QR Type</label>
          <select class="form-control" value={type} onChange={handleTypeChange}>
            <option value="1">Plant</option>
            <option value="2">XP</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">Expiration Date</label>
          <input 
            className="form-control"
            type="datetime-local"
            defaultValue={date}
            onChange={handleDateChange} />
        </div>

        <button 
          class="btn btn-login" 
          type="submit"
          onClick={handleClick}>
          Submit and create QR Code
        </button>
      </div>
    </div>
    </>
  )
}