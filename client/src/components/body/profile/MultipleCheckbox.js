import React from "react"

class MultipleCheckbox extends React.Component {
    state = {
        names: {
            admin: false,
            profesor: false,
            secretar: false,
        }
        
    }

    handleChange = (e) => {
        let {name, checked} = e.target

        this.setState((e)=> {
            let isChecked = e.names
            return isChecked[name] = checked
        })
    }

    render(){
        return(
            <>
            <input type="checkbox" name="admin" onChange={this.handleChange}/>
            <label htmlFor="admin">Admin</label>
            <input type="checkbox" name="Profesor" onChange={this.handleChange}/> 
            <label htmlFor="profesor">Profesor</label>
            <input type="checkbox" name="secretar" onChange={this.handleChange}/> 
            <label htmlFor="secretar">Secretar</label>
            </>
        )
    }

}

export default MultipleCheckbox
