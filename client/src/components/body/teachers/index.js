import React, { useState, useEffect } from 'react'
import axios from "axios";
export default function Teachers(props){
    const { teachers, subjects, teacherSubjects, year } = props
    const [teachersArray, setTeachersArray] = useState([])
    const [teacherSubjectsState, setTeachersSubjectsState] = useState([])
    const [ dataTeacher, setDataTeacher ] = useState({
        id: '',
        name:'',
        subject: '',
        previousSubject:'',
        nameSubject:''
    })

    useEffect(()=>{
        setTeachersArray(teachers)
    }, [teachers])
    useEffect(()=>{
        setTeachersSubjectsState(teacherSubjects)
    }, [teacherSubjects])
    
    
    const assingSubject = (item) =>{
        const subject = teacherSubjectsState.find(sub=> sub.user._id === item._id && sub.year === Number(year));
        if(subject){
            setDataTeacher({...dataTeacher, nameSubject:subject.subject.name, id:item._id, name:item.name, previousSubject:subject._id, subject:subject.subject._id})
        }else{
            setDataTeacher({...dataTeacher, id:item._id, name:item.name, nameSubject:null, previousSubject:null, subject:'null'})
        }
        
    }
    const cancelSubject = () =>{
        setDataTeacher({...dataTeacher, id:'', name:'', subject:''})
    }

    const handleChange= async (ev)=>{
        if(ev.target.value === 'null'){
            setDataTeacher({...dataTeacher, subject:'null', nameSubject: null})
        }else{
            setDataTeacher({...dataTeacher, subject:ev.target.value, nameSubject: ev.target.options[ev.target.selectedIndex].text})
        }
    }

    const saveSubject = async ()=>{
        let resp;
        if(dataTeacher.previousSubject){
            if(dataTeacher.subject){
                resp = await axios.patch(
                    `userSubject/update`,
                    {
                    subject: dataTeacher.subject,
                    id: dataTeacher.previousSubject
                    }
                );
            }else{
                resp = await axios.delete(
                    `userSubject/delete/${dataTeacher.previousSubject}`
                );
            }
        }else{
            if(dataTeacher.subject){
                resp = await axios.post(
                    `userSubject/create`,
                    {
                    user: dataTeacher.id,
                    subject: dataTeacher.subject,
                    year
                    }
                );
                }else{
                    resp.status = 200;
                }
        }
        if(resp.status === 200){
            if(dataTeacher.previousSubject){
                setTeachersSubjectsState(array =>
                array.map((item, indexMap) => 
                    item.user._id === dataTeacher.id
                    ? {...item, subject: {...item.subject, name:dataTeacher.nameSubject, _id:dataTeacher.subject} } 
                    : item ))
            }else{
                setTeachersSubjectsState(array =>[{subject:{name:dataTeacher.nameSubject, _id:dataTeacher.subject}, user:{_id:dataTeacher.id}},...array])
            }
            cancelSubject()
        }
    }
    const getSubject=(teacherId)=>{
        const subjectDescription = teacherSubjectsState.find(sub=> sub.user._id === teacherId)?.subject?.name
        return subjectDescription || 'WITHOUT SUBJECT'
    }
    return(
        <div>
            <h2>Teachers</h2>
            <div className="user__form">
            <label htmlFor="name">Teacher</label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    disabled
                    value={dataTeacher.name}
                    />
                <label htmlFor="name">Assing Subject</label>
                    <select
                    name="subject"
                    id="subject"
                    value={dataTeacher.subject}
                    onChange={handleChange}
                    >
                        <option value={'null'}>{"Select a subject"}</option>
                        {
                            subjects.map((subject,i)=>{
                                return(
                                    <option key={i} value={subject._id}>{subject.name}</option>
                                )
                            })
                        }
                    </select>
                    <button className={'btn-green'} onClick={saveSubject} disabled={dataTeacher.id===''}>
                        Save
                    </button>
                    <button className={'btn-red'} onClick={cancelSubject} disabled={dataTeacher.id===''}>
                        Cancel
                    </button>
            </div>
            <table className="table__date">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {
                        teachersArray.map((subject, i) =>
                        {
                        return (
                            <tr key={i}>
                                <td>{subject.name}</td>
                                <td>{subject.email}</td>
                                <td>{getSubject(subject._id)}</td>
                                <td><button className={'btn-black'} onClick={()=>assingSubject(subject)}>Assing Subject</button></td>
                            </tr>
                        )})
                    }
                </tbody>
            </table>
        </div>
    )

}