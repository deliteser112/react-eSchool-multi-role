import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useSelector} from "react-redux";

export function ReviewGrades(props){
    const { year, dataUserSubjects } = props
    const [studentsSubjects, setStudentsSubjects] = useState([])
    const auth = useSelector((state) => state.login);
    const { user } = auth;
    const [semester, setSemester] = useState(1)
    const [studentsGrades, setStudentsGrades] = useState([])
    useEffect(()=>{
        let isSubscribed = true;

        setStudentsSubjects(dataUserSubjects.filter(item=>item.user._id === user._id))
    
        const ids = dataUserSubjects.filter(item=>item.user._id === user._id).reduce((ids, item) => {
                ids.push(item._id)
            return ids;
        },[])
        const getSubjectGrades = async () =>{
            const gradesSubject = 
            await axios.post(`/subjectGrade/all`, {
                    ids
            })
            if(isSubscribed)
                setStudentsGrades(gradesSubject.data)
        };
        getSubjectGrades()
        return () => (isSubscribed = false)
    }, [dataUserSubjects, user._id])

    const getSubjectName = (_id) =>{
        return dataUserSubjects.find(a=>a._id === _id)?.subject?.name
    }
    // useEffect(()=>{
    //     setStudentsSubjects(array=>
    //         array.map((item, indexMap) => {
    //                 const grade = studentsGrades.find(a=>a.userSubject === item._id && Number(a.partial) === Number(semester))
    //                 return grade ? 
    //                 {...item, gradeData: {_id:grade._id, grade:grade.grade??0, partial:grade.partial} } 
    //                 : 
    //                 {...item, gradeData: {_id:null, grade:0, partial:semester } } 
    //         }))
    // }, [studentsGrades, semester])

    const changeSemester = (e) =>{
        setSemester(e.target.value)
    }
    return (
        <div>
            <h2>Review Grades</h2>
            { studentsSubjects.length===0 &&
                <h3>You don´t have subjects assigned</h3>
            }
            {
                studentsSubjects.length>0 &&
                <div>
                    <div className="user__form">
                        <label htmlFor="newName" style={{color:'white', fontWeight:'bold'}}>Select Semester</label>
                        <select onChange={changeSemester} name="semester" id="semester" style={{color:'black', width:'200px'}}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <table className="table__date">
                <thead>
                <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                    {
                        studentsGrades.filter(a=>Number(a.partial) === Number(semester))
                        .map((grade, i) => {
                            return (
                                <tr key={i}>
                                    <td className="alignRight"><span>{getSubjectName(grade.userSubject)}</span></td>
                                    <td>
                                        {
                                        grade.grade
                                        }
                                    </td>
                                    <td>{grade.createdAt}</td>
                                </tr>
                            )})
                    }
                </tbody>
                </table>
                </div>
            }
        </div>
    )
}