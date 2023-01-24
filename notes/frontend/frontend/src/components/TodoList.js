import React, {useState} from "react";
import axios from "axios";
import {MdCheckBox, MdCheckBoxOutlineBlank , MdEdit , MdDelete} from "react-icons/md";
import Modal from "./modal/modal";


export default function TodoList({todos, setTodos}) {
    const [show, setShow] = useState(false);
    const [record, setRecord] = useState({});


    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/todos/${id}/`)
        .then(() => {
            const newTodos = todos.filter( item => {
                return item.id !== id 
            })

            setTodos(newTodos)
        })
        .catch((err) =>{
            console.log("Some error happened")
            console.log(err)
        })
    }

    const handleUpdate = async (id, value) => {             
        return axios.patch(`http://localhost:8000/api/todos/${id}/`, value)
        .then(res => {
            const { data } = res;
            const newTodos = todos.map(item =>{
                if (item.id === id) {
                    return data;
                }
                return item;
            })
            setTodos(newTodos)
        })
        .catch((err)=>{
            alert("something goes wrong");
            console.log(err)
        })
    }

    const handleCheckbox = ((id, completed) =>{
        const Newcompleted = !completed 
        handleUpdate(id, {completed: Newcompleted})
    })

    
    const todoscomponent = todos.map(item => {
        return (
            <li className="item-list" key={item.id}>
                <span className="item-prop-checkbox" 
                    onClick={() => {handleCheckbox(item.id, item.completed)}}
                >
                    {
                    item.completed 
                    ? <MdCheckBox /> :
                    <MdCheckBoxOutlineBlank />
                    }
                </span>
                <span className="item-prop-text">
                        {item.name}
                </span>
                <span className="item-prop-edits">
                    <MdEdit onClick={()=> {
                        setShow(true);
                        setRecord(item);
                    }} />
                    <MdDelete onClick={()=> {handleDelete(item.id)}} className="material-symbols-outlined"/>
                </span>
            </li>
                
        )

    })

    

    

    const handleSave = async () => {
        await handleUpdate(record.id, { name : record.name})
        setShow(false);
    }

    const handleChange = event =>{
       setRecord(
        {...record,
        name: event.target.value}
       )
    }


    return (
    <>
        <ul className="todo-list">
            {todoscomponent}
        </ul> 
        <Modal title="Update the taks" show={show} onClose={()=>setShow(false)} >
            <input type="text" onChange={handleChange} value={record.name} />
            <button onClick={handleSave}>Save changes</button>
        </Modal>
    </>
    )
}