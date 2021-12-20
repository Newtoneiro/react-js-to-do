import React from "react";
import {AiFillHome} from 'react-icons/ai'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return <section className="navbar">
        <div className="nav-center">
            <div className="nav-logo hover">
                    <AiFillHome className="icon"/>
                <Link to='/' className="clear-a hover">
                    <h2>Home</h2>
                </Link>
            </div>
            <div className="links">
                <Link to='/about' className="clear-a">
                    <h2 className="hover">About</h2>
                </Link>
                <Link to='/contact' className="clear-a">
                    <h2 className="hover">Contact</h2>
                </Link>
            </div>
        </div>
    </section>
}

export default Navbar