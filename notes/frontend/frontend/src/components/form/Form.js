import React, { useState } from "react";
import axios from "axios";
import './Form.css'

export default function Form({todos, setTodos}) {
    const [task, setTask] = useState("")
    const handleChange = (event) =>{
        setTask(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/todos/", { name:task})
        .then((res)=>{
            const { data }= res
            setTodos([...todos,
                     data])
            setTask("")
        })
        .catch((err)=>{
            console.log("Data error")
            console.log(err)
        })
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            <span className="form-span">
            <input  
                className="item-form-input" 
                type="textarea" value={task}  
                placeholder="add the task" 
                onChange={handleChange}
            />
            <input
                className="item-form-button"
                type="submit" 
                value="Add"
            />
            </span>
        </form>
    )
}