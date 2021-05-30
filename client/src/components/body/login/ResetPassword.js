import React, { useState} from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"
import {showErrMsg,showSuccessMsg} from "../../utils/notifications/Notifications"
import {isLength,isMatch} from "../../utils/validation/Validation"


const initialState = {
    password: "",
    cf_password: "",
    err: "",
    success: ""
}

function ResetPassword() {
    const [data,setData] = useState(initialState)
    const {token} = useParams()

    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const resetPassword = async () => {
        if(isLength(password))
            return setData({...data, err: "Parola trebuie sa fie minim 6 caractere", success: ""})

        if(!isMatch(password,cf_password))
        return setData({...data, err: "Parola nu coincide!", success: ""})

        try {
            const res = await axios.post("/user/reset", {password}, {
                headers: {Authorization: token}
            })
            return setData({...data, err: "", success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ""})
        }
    }

    return (
        <div className="forgot">
            <h2>Reset Your Password</h2>

            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password}
                onChange={handleChangeInput} />

                <label htmlFor="cf_password">Re-enter Password</label>
                <input type="password" name="cf_password" id="cf_password" value={cf_password}
                onChange={handleChangeInput} />

                <button onClick={resetPassword}>Reset Password</button>
            </div>
        </div>
    )
}

export default ResetPassword
