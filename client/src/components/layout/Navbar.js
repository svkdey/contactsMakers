import React,{Fragment,useContext} from 'react'
import PropTypes from 'prop-types';
import AuthContext from '../../context/Auth/AuthContext'
import ContactContext from '../../context/contact/contactContext'
import {Link} from 'react-router-dom'
const Navbar=({title,icon})=> {

    const onLogout=()=>{
        clearContacts();
        logoutUser() ;
        
    }
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const {isAuthenticated,logoutUser,user}=authContext;
    const { clearContacts } = contactContext
    const authLinks=(
        <Fragment>
            <ul>
            <li>Hello {user && user.name}</li>
            <li>
                <a href="#!" onClick={()=>{onLogout()}}>
                    <i className="fas fa-sign-out-alt">
                        <span className="hide-sm" >
                            Logout
                        </span>
                    </i>
                </a>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            </ul>
        </Fragment>
    )
    const guestLinks=(
        <Fragment>
        <ul>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>

            </li>
            <li>
                <Link to="/login">Log In</Link>

            </li>
            </ul>
        </Fragment>
    )
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}/>{title}
            </h1>
            {isAuthenticated?authLinks:guestLinks}
        </div>
    )
}

Navbar.propTypes={
    title:PropTypes.string.isRequired,
    icon:PropTypes.string
}

Navbar.defaultProps={
    title: "Contact Keeper",
    icon: 'fas fa-id-card-alt'
}
export default Navbar
