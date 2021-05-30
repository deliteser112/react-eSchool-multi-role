import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Subjects(props){
    const { subjects, saveSubject, success } = props
    const [subjectArray, setSubjectArray] = useState([])
    const [ dataSubject, setDataSubject ] = useState({
        name: ''
    })

    useEffect(()=>{
        setSubjectArray(subjects)
    }, [subjects])

    const handleChange = (ev) =>{
        const { id, value } = ev.target
        setDataSubject({...dataSubject, [id] : value})
    }
    const saveSubjectLocal = async () =>{
        const responsePost = await axios.post(
            "/subject/create",
            {
              name: dataSubject.name
            }
          );
          if(responsePost.status === 200){
              saveSubject()
              setDataSubject({...dataSubject, name : ''})
          }
    }

    return (
        <div>
            <h2>Subjects</h2>
            <div className="user__form">
                <label htmlFor="name">Subject Name</label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    value={dataSubject.name}
                    placeholder="Subject"
                    onChange={handleChange}
                    />
                <button className={'btn-black'} onClick={()=> saveSubjectLocal(dataSubject)}>
                    Save
                </button>
            </div>
            <table className="table__date">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                    {subjectArray.length > 0 &&
                        subjectArray.map((subject, i) =>
                        {
                        return (
                            <tr key={i}>
                                <td>{subject.id}</td>
                                <td>{subject.name}</td>
                            </tr>
                        )})
                    }
                </tbody>
            </table>
        </div>
    )
}