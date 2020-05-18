import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from "../../context/AuthContext";

const AuthPage = () => {

    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        email: '', password: ''
    });

    const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const response = await fetch('/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            auth.login(data.token, data.userId)
        } catch (e) {}
    }
    return(
        <div className='content'>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={event=>changeHandler(event)}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={event=>changeHandler(event)}/>
            <button onClick={(event)=>loginHandler(event)}>Login</button>
        </div>
    )
}

export default AuthPage;