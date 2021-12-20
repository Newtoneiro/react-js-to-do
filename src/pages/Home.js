import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import { useGlobalContext } from "../context.js";
import TaskList from "../TaskList.js";

const Home = () => {
    const {loading, tasks, text, setText, addTask} = useGlobalContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text !== ''){
            addTask()
        }
    }

    if (loading){
        return <div className="loading">
            <AiOutlineLoading3Quarters className="spin"/>
        </div>
    }

    return <>
    <div className="main">
        <form className='login-form' onSubmit={handleSubmit}>
            <label for='input'>
                <h1>Add a task</h1>
            </label>
            <div className="input">
                <input type='text' className="input-box" placeholder="eg. do dishes" value={text} onChange={(e) => setText(e.target.value)}></input>
                <button type='submit' className="btn">Enter</button>
            </div>
        </form>
        {tasks.length > 0 && <TaskList></TaskList>}
    </div>
    </>
}

export default Home;