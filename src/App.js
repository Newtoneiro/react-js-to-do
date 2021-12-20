import React from "react";
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.js'
import About from './pages/About.js'
import Item from './pages/Item.js'

const App = () => {
    return <>
    <Router>
        <Navbar/>
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/tasks/:id" element={<Item />}></Route> 
        </Routes>
    </Router>
    </>
}

export default App