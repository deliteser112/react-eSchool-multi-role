import axios from 'axios'
import React, { useState, useEffect } from 'react'
export default function Students(props){
    const { students, subjects, studentSubjects, year } = props
    const [studentsArray, setStudentsArray] = useState([])
    const [subjectsState, setSubjectsState] = useState([])
    const [studentSubjectsState, setStudentSubjectsState] = useState([])
    const [loading, setLoading] = useState(false)
    const [ dataStudents, setDataStudent ] = useState({
        id: '',
        name:'',
        subject: '',
        previousSubject:'',
        nameSubject:''
    })

    useEffect(()=>{
        setStudentsArray(students)
    }, [students])
    useEffect(()=>{
        setStudentSubjectsState(studentSubjects)
    }, [studentSubjects, year])
    useEffect(()=>{
        if(dataStudents.id !== ''){
            setSubjectsState(subjects)
        }
        
    }, [subjects, dataStudents.id])

    const handleChange = (ev) => {
        setLoading(true)
        if(ev.target.value === ''){
            setDataStudent({...dataStudents, id:'' })
            setSubjectsState([])
        }else{
            //console.log(ev.target.options[ev.target.selectedIndex].text);
            setDataStudent({...dataStudents, id:ev.target.value })
            setSubjectsState(subjects)
        }
        setLoading(false)
    }
    const handleCheck = async (ev, subject) => {
        setLoading(true)
        try{
            let resp;
            if(ev.target.checked){
            resp = await axios.post(
                `userSubject/create`,
                {
                user: dataStudents.id,
                subject: subject._id,
                year
                })
            }
            console.log(resp.status);
            if(resp.status === 200){
                setStudentSubjectsState(array => [{user:{_id: dataStudents.id}, subject: {_id: subject._id}}, ...array])
            }
        }catch{

        }
        setLoading(false)
    }
    return (
        <div>
            <h2>Students</h2>
            <div className="user__form">
            <label htmlFor="name">Student</label>
                    <select
                    name="subject"
                    id="subject"
                    value={dataStudents.id}
                    disabled={loading}
                    onChange={handleChange}
                    >
                        <option value={''}>{"Select a student"}</option>
                        {
                            students.map((subject,i)=>{
                                return(
                                    <option key={i} value={subject._id}>{subject.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <table className="table__date">
                <thead>
                <tr>
                    <th>Subject</th>
                    <th>Assing</th>
                </tr>
                </thead>
                <tbody>
                    {
                        subjectsState.map((subject, i) =>
                        {
                        return (
                            <tr key={i}>
                                <td className="alignRight"><span>{subject.name}</span></td>
                                <td>
                                    <input
                                    className="check__box"
                                    type="checkbox"
                                    id="assing_subject"
                                    disabled={loading}
                                    checked={studentSubjectsState.find(a=>a.user._id === dataStudents.id && a.subject._id === subject._id)!==undefined}
                                    onChange={(ev)=>handleCheck(ev, subject)}
                                    />
                                </td>
                            </tr>
                        )}
                        )
                    }
                    
                </tbody>
                </table>
        </div>
    )
}