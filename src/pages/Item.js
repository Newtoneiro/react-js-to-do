import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'


const Item = () => {
    const {id} = useParams()
    const {getTask, changeTask} = useGlobalContext()
    const task = getTask(id)

    const [imgLoading, setImgLoading] = useState(false)
    const [title, setTitle] = useState(task.title)
    const [deadline, setDeadline] = useState(task.deadline)
    const [img, setImg] = useState(task.img)
    const [updated, setUpdated] = useState(false)

    const handleUpdate = async () => {
        setImgLoading(true)
        const new_img = await changeTask(parseInt(id), title, deadline)
        setImg(new_img)
        setImgLoading(false)
        setUpdated(false)
    }

    const updateTitle = (txt) => {
        setTitle(txt)
        setUpdated(true)
    }

    const updateDeadline = (txt) => {
        setDeadline(txt)
        setUpdated(true)
    }

    var today = new Date();
    var minDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return <div className="single-task-container">
        <div className="img-holder">
            {
                imgLoading? <AiOutlineLoading3Quarters className="spin"/>:<img  src={img} alt={title} className="single-task-image"></img>
            }
        </div>
        <div className="single-task">
            <div className="item-inputs">
                <div className="item-input">
                    <input type="text" className="single-task-input" value={title} onChange={(e) => updateTitle(e.target.value)}></input>
                </div>
                <div className="item-input">
                    <input type="date" className="single-task-input"  min={minDate} value={deadline} onChange={(e) => updateDeadline(e.target.value)}></input>
                </div>
            </div>
            <div className="button-holder-item">
            <Link to='/' className="back-home">
                <h2>Back home</h2>
            </Link>
            <button type='button' className={`update-button ${updated && 'update-button-unsaved'}`} onClick={() => handleUpdate()}>Update!</button>
            </div>
        </div>
    </div>
}

export default Item;