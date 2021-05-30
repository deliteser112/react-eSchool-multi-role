import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notifications/Notifications'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password,cf_password, role, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password) || isEmpty(role))
                return setUser({...user, err: "Completati campurile", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Email invalid", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Parola trebuie sa fie minim 6 caractere", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Parola nu coincide", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password, role
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            console.log("hello")

            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login__page">
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Introduceti numele" id="name"
                    value={name} name="name" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" placeholder="Introduceti adresa email" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Introduceti parola" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="cf_password">Confirm Password</label>
                    <input type="password" placeholder="Confirmati parola" id="cf_password"
                    value={cf_password} name="cf_password" onChange={handleChangeInput} />
                </div>
                <div className="role__row">
                    <div className="row__items">
                        <input type="radio" id="role0" value="0" name="role" onChange={handleChangeInput} />
                        <label htmlFor="role0">Elev</label>
                    </div>
                    <div className="row__items">
                        <input type="radio" id="role2" value="2" name="role" onChange={handleChangeInput} />
                        <label htmlFor="role2">Profesor</label>
                    </div>
                    <div className="row__items">
                        <input type="radio" id="role3" value="3" name="role" onChange={handleChangeInput} />
                        <label htmlFor="role3">Secretar</label> 
                    </div>
                </div>

                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>

            <p>Already an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register