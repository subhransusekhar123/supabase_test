import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

import './App.css'

const supabase = createClient("https://yjyaklulpkejromgvhgd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqeWFrbHVscGtlanJvbWd2aGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDg1MDcsImV4cCI6MjAxMDc4NDUwN30.O0k1cpE4HZjMu6K_Rs_aZrCpizzSx_WCeOSo5oTIWHc")

function App() {
  const [countries, setConuntries] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
    console.log(userData);
  };
  const sendSignUpData = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    })

    console.log(data,error);
  }

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const { data } = await supabase.from("countries").select();
    setConuntries(data);
  }

  return (
    <>
      <h1>Hello World!</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>

      <div>
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="email" onChange={changeHandler} />
        <label for="lname">Last name:</label>
        <input type="password" id="lname" name="password" onChange={changeHandler} />
        <input type="submit" value="Submit" onClick={sendSignUpData}/>
      </div>
    </>
  )
}

export default App
