import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notifications/Notifications";
import MultipleCheckbox from "./MultipleCheckbox"

function EditUser() {
  const { id } = useParams();
  const history = useHistory();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);

  const [checkAdmin, setCheckAdmin] = useState(false);
  const [checkProfessor, setCheckProfessor] = useState(false);
  const [checkSecretar, setCheckSecretar] = useState(false);
  const [checkRole, setCheckRole] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);

  /*
    getUserRole () {
    if(role === 0)  return 0
    else if (role === 1) return 1
    else if (role === 2) return 2
    else return 3
  }
  */
    
  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckRole(user.role === undefined ? true : false)
          setCheckAdmin(user.role === 1 ? true : false);
          setCheckProfessor(user.role === 2 ? true : false);
          setCheckSecretar(user.role === 3 ? true : false);
        }
      });
    } else {
      history.push("/profile");
    }
  }, [users, id, history]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0 || checkSecretar ? 3 : 0 || checkProfessor ? 2 : 0 || checkRole ? undefined : 0 ,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

 const handleCheck = () => {

    setSuccess("");
    setErr("");
    setCheckAdmin(!checkAdmin);
    setCheckProfessor(!checkProfessor);
    setCheckSecretar(!checkSecretar);
    // setCheckRole(!checkAdmin || !checkAdmin || !checkProfessor || !checkSecretar)
    setNum(num + 1);
  };
  

  return (
    <>
      <div className="profile__page edit__user">
        <div className="row">
          <button className="go__back" onClick={() => history.goBack()}>
            <i className="fas fa-long-arrow-alt-left"></i> Go back
          </button>
        </div>
        <div className="col-left">
          <h2>Edit User</h2>

          <div className="user__form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={editUser.name}
              placeholder="Numele"
              disabled
            />
          </div>

          <div className="user__form">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={editUser.email}
              placeholder="New Email"
              disabled
            />
          </div>

          <div className="check__row">
            <input
            className="check__box"
              type="checkbox"
              id="isAdmin"
              checked={checkAdmin}
              onChange={handleCheck}
            />
            <label htmlFor="isAdmin">Admin</label>
            <input
            className="check__box"
              type="checkbox"
              id="isProfessor"
              checked={checkProfessor}
              onChange={handleCheck}
            />
            <label htmlFor="isProfessor">Profesor</label>
            <input
            className="check__box"
              type="checkbox"
              id="isSecretar"
              checked={checkSecretar}
              onChange={handleCheck}
            />
            <label htmlFor="isSecretar">Secretar</label>
          </div>

          <button onClick={handleUpdate}>Modifica</button>
        </div>
      </div>
      <div className="operation">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
    </>
  );
}

export default EditUser;
