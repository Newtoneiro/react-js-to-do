import React, {createContext, useContext, useState, useEffect} from "react";
import data from './data'

const AppContext = createContext()

const AppProvider = ({children})=>{
    const [tasks, setTasks] = useState(JSON.parse(localStorage['data']))
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState('')
    
    useEffect(() => {
        console.log('stored in cash')
        localStorage['data'] = JSON.stringify(tasks)
    }, [tasks])

    function getTask(id){
        var task = tasks.find(item => item.id === parseInt(id))
        return task
    }

    const fetchImage = async (text) => {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${text}&client_id=Mj8fHtEjKqDAFsF_fKoNZ5MILMr3HL5oDm1BBaIszTs`)
        const output = await response.json()
        if (output.total !== 0){
            return output.results[0].urls.raw
        }
        else{
            return 'https://images.unsplash.com/photo-1620247405684-8352d6d7ce09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
        }
    }

    const removeTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks)
    }

    const addTask = async () => {
        setLoading(true)
        var image = await fetchImage(text)
        const newTask = {id: parseInt(new Date().getTime().toString()), title: text, deadline:"", img: `${image}`}
        setTasks([...tasks, newTask])
        setText('')
        setLoading(false)
    }

    const changeTask = async (id, title, deadline) => {
        const img = await fetchImage(title)
        var newTasks = tasks
        const index = newTasks.findIndex((item) => item.id === id)
        newTasks[index] = {id, title, deadline, img}
        setTasks(newTasks)
        localStorage['data'] = JSON.stringify(tasks)
        return img
    }
    
    return <AppContext.Provider value={{
        tasks,
        loading,
        removeTask,
        text,
        setText,
        addTask,
        getTask,
        changeTask,
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider}