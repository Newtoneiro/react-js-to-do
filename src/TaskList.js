import { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import Task from "./Task"

const TaskList = () => {
    const {tasks} = useGlobalContext()
    const [text, setText] = useState('')
    const [filteredTasks, setFilteredTasks] = useState(tasks)

    const updateText = (e) => {
        e.preventDefault()
        setText(e.target.value)
        if (e.target.value === ''){
            setFilteredTasks(tasks)
        }
        else{
            setFilteredTasks(tasks.filter((item) => item.title.indexOf(e.target.value) === 0))
        }
    }

    useEffect(() => {
        setFilteredTasks(tasks)
    }, [tasks])

    return <div className="tasklist">
        <h1 className="tasklist-title">Your Tasks</h1>
        <div className="underscore"></div>
        <input type='text' className="find-task" placeholder="search" value={text} onChange={(e) => updateText(e)}></input>
        <div className="item-list">
        {filteredTasks.map((item) => {
            return <Task item={item}></Task>
            })}
        </div>
    </div>
}

export default TaskList