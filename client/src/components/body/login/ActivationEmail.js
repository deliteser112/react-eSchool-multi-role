import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notifications/Notifications";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
            const res = await axios.post("/user/activation", {activation_token})
            setSuccess(res.data.msg)
        } catch (err) {
            err.response.data.msg && setErr( err.response.data.msg )
        }
      };
      activationEmail()
    }
  }, [activation_token]);

  return (
  <div className="active__page">
     {err && showErrMsg(err)}
     {success && showSuccessMsg(success)}
  </div>
  )
}

export default ActivationEmail;
