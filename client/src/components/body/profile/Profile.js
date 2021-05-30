import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notifications/Notifications";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";

import Subjects from '../subjects'
import Teachers from '../teachers'
import {EvaluateStudents} from '../teachers/evaluate_students'
import Years from '../years'
import Students from '../students'
import {ReviewGrades} from '../students/reviewGrades'

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.login);
  const token = useSelector((state) => state.token);

  const users = useSelector(state => state.users)

  const {user, isAdmin, isProfessor, isSecretar } = auth;
  const [data, setData] = useState(initialState);
  const {name, password, cf_password, err, success } = data;
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAdmin || isSecretar) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback, isSecretar]);

  const updateInfor = () => {
    try {
      axios.patch(
        "user/update",
        {
          name: name ? name : user.name,
        },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, err: "", success: "Modificat cu succes!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleUpdate = () => {
    if (name) updateInfor();
    if (password) updatePassword();
  };
  
  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const [subjectsState, setSubjectsState] = useState([])
  const [dataUserSubjectState, setDataUserSubjects] = useState([])
  const [year, setYear ] = useState(0)
  useEffect(()=>{
    setYear((new Date().getFullYear()))
    const getDataDB = async () =>{
      const subjects = await axios.get(
        "/subject/all",
        {
          headers: { Authorization: token },
        }
      );
      setSubjectsState(subjects.data)
      const teacherSubjet = await axios.get(
        `/usersubject/all/${year}`
      );
    }
    getDataDB();
  },[])
  useEffect(()=>{
    const getDataDB = async () =>{
      const teacherSubject = await axios.get(
        `/usersubject/all/${year}`
      );
      setDataUserSubjects(teacherSubject.data)
    }
    getDataDB();
  },[year])

const updateYear = (value) => {
  setYear(value)
}

  const saveSubject = async (data) => {
    // data.id=(Math.max.apply(null, subjectsState.map(item => item.id)) || 0) + 1;
    
        const subjects = await axios.get(
          "/subject/all",
          {
            headers: { Authorization: token },
          }
        );
        setSubjectsState(subjects.data)
  }

  const [newUser, setNewUser]=useState({
    newName:'',
    newEmail:'',
    newPassword:'',
    newRole:0
  });

  const [errorNew, setErrorNew] = useState('')
  const handleChangeNew = (ev) =>{
    const {id, value}=ev.target;
    setErrorNew('')
    setNewUser({...newUser, [id]:value})
  }
  const createNewUser = async () =>{
    try{

    
    const response = await axios.post("/user/create",
    {
      name:newUser.newName,
      email:newUser.newEmail,
      password:newUser.newPassword,
      role:newUser.newRole,
    }
    )
    if(response.status === 200){
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
      setNewUser({
        newName:'',
        newEmail:'',
        newPassword:'',
        newRole:0
      })
    }else{
      setErrorNew(response.msg)
    }
  }catch(error){
      setErrorNew(error.response.data.msg)
  }
  }
  return (
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
      </div>

      <div className="profile__page">
        <div className="col-left">
          <h2> { isAdmin && "Admin Profile" || isProfessor && "Profesor Profile"|| isSecretar && "Secretar Profile"  || "Elev Profile"}</h2>

          <div className="user__form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              placeholder="Numele"
              onChange={handleChange}
            />
          </div>

          <div className="user__form">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Parola"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="user__form">
            <label htmlFor="cf_password">Confirm</label>
            <input
              type="password"
              name="cf_password"
              id="cf_password"
              value={cf_password}
              placeholder="Confirma parola"
              onChange={handleChange}
            />
          </div>

          <div>
            <em style={{ color: "crimson" }}>
              * If you update your password here, you will not be able to login
              quickly using google and facebook.
            </em>
          </div>

          <button disabled={loading} onClick={handleUpdate}>
            Modifica
          </button>
        </div>

        <div className="col-right">
        <Years updateYear={updateYear} />
        { isSecretar && 
            <div className="table__wrapper">
              <Subjects subjects={subjectsState} saveSubject={saveSubject} />
              <Teachers year={year} teacherSubjects={dataUserSubjectState} teachers={users.filter(teacher=> teacher.role === 2)} subjects={subjectsState} />
              <Students year={year} studentSubjects={dataUserSubjectState} subjects={subjectsState} students={users.filter(teacher=> teacher.role === 0)} />
            </div>
          }
          {
            isProfessor &&
            <EvaluateStudents year={year} dataUserSubjects={dataUserSubjectState} />
          }
          {
            (!isSecretar && !isProfessor) &&
            <ReviewGrades dataUserSubjects={dataUserSubjectState} />
          }
          <h2>{isAdmin || isSecretar ? "Users" : "Note"}</h2>
          {isSecretar &&
          <div>
            <div className="user__form">
              <label htmlFor="newName">Name</label>
              <input
                type="text"
                name="newName"
                id="newName"
                value={newUser.newName}
                placeholder="Name User"
                onChange={handleChangeNew}
              />
            <label htmlFor="newName">Email</label>
              <input
                type="text"
                name="newEmail"
                id="newEmail"
                value={newUser.newEmail}
                placeholder="Email User"
                onChange={handleChangeNew}
              />
            <label htmlFor="newPassword">Password</label>
              <input
                type="text"
                name="newPassword"
                id="newPassword"
                value={newUser.newPassword}
                placeholder="Password User"
                onChange={handleChangeNew}
              />
            <label htmlFor="newRole">Role</label>
              <select
                name="newRole"
                id="newRole"
                value={newUser.newRole}
                onChange={handleChangeNew}
              >
                <option value="0">Elev</option>
                <option value="2">Professor</option>
                <option value="3">Secretar</option>
                </select>
                <button onClick={createNewUser} className={'btn-black'} style={{marginLeft:'10px', width:'50px'}}>SAVE</button>
                {errorNew &&
                  <h3 style={{color:'red'}}>{errorNew}</h3>
                }
            </div>
          </div>
          }
          <div className="table__wrapper">
            <table className="table__date">
              <thead>
                  {
                      isAdmin || isSecretar
                      ? <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      : <tr>
                          <th>Materie</th>
                          <th>Profesor</th>
                          <th>Note</th>
                          <th>Nota Semestru I</th>
                          <th>Nota Semestru II</th>
                          <th>Media</th>
                        </tr>
                  }
              </thead>
              <tbody>
                { users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="td__role">
                      {user.role === 0 && "Elev"}
                      {user.role === 1 && "Admin"}
                      {user.role === 2 && "Profesor"}
                      {user.role === 3 && "Secretar"}
                    </td>
                    <td>
                      <Link to={`/edit_user/${user._id}`}>
                      <i className="far fa-edit" title="Edit"></i>
                      </Link>
                      <i className="fas fa-user-times" title="Delete" onClick={() => handleDelete(user._id)}></i> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;