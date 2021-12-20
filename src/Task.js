import React, {useRef, useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { useGlobalContext } from "./context";
import {AiFillEye} from 'react-icons/ai'
import {FaTimes} from 'react-icons/fa'

const Task = ({item}) => {
    const [zoomImage, setZoomImage] = useState(false)
    const [zoomX, setZoomX] = useState(0)
    const [zoomY, setZoomY] = useState(0)
    const {removeTask} = useGlobalContext()
    const container = useRef(null)

    const getPosition = (e) => {
        const temp = e.target.getBoundingClientRect();
        const center_x = (temp.left + temp.right)/2 - 2 * temp.width
        const center_y = (temp.top + temp.bottom)/2 - 2 * temp.height
        setZoomX(center_x)
        setZoomY(center_y)
        setZoomImage(!zoomImage)
    } 

    useEffect(() => {
        if (container.current !== null){
            const popup = container.current
            popup.style.top = `${zoomY}px`
            popup.style.left = `${zoomX}px`
        }
    }, [zoomImage])

    return <>
        {zoomImage && <div className="modal-overlay" ref={container} onMouseLeave={(e) => getPosition(e)}>
            <img src={item.img} className="zoom-img"></img>
        </div>}
        <div className="item">
            <div key={item.id} className="task-item">
                <img src={item.img} alt={item.title} className='item-img' onMouseEnter={(e) => getPosition(e)}></img>
                <div className='item-img-holder'>
                    <h2>{item.title.length < 17?item.title:`${item.title.slice(0, 17)}. . .`}</h2>
                </div>
            </div>
            <Link className="button-holder view" to={`/tasks/${item.id}`}>
                <AiFillEye/>
            </Link>
            <div className="button-holder remove" onClick={() => removeTask(item.id)}>
                <FaTimes/>
            </div>
        </div>
    </>
}

export default Task;