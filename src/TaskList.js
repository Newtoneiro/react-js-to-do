import { useGlobalContext } from "./context";
import Task from "./Task"

const TaskList = () => {
    const {tasks} = useGlobalContext()
    return <div className="tasklist">
        <h1 className="tasklist-title">Your Tasks</h1>
        <div className="underscore"></div>
        <div className="item-list">
        {tasks.map((item) => {
            return <Task item={item}></Task>
            })}
        </div>
    </div>
}

export default TaskList