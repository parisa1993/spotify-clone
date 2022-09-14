import React from 'react'
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const AUTH_URL = process.env.REACT_APP_LOGIN_URL
  
export default function Login() {
  const navigate = useNavigate();
  return (
    <Container className='login'>
      <Button onClick={() => {window.location = AUTH_URL}} variant="contained">Login With Spotify</Button>
    </Container>
  )
}