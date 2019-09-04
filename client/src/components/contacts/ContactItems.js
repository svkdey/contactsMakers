import React,{Fragment,useContext} from 'react';
import Fade from 'react-reveal/Fade';
import ContactContext from '../../context/contact/contactContext'
const ContactItems=({contact}) =>{
    
    const contactContext = useContext(ContactContext)
    
    const { deleteContact, setCurrent, clearCurrent, updateContact} = contactContext;

    const {_id,name,email,phone,type}=contact;
    const onDelete=()=>{
       
       deleteContact(_id)
        clearCurrent();
    }
    const onEdit=()=>{
        // console.log(contact)
        setCurrent(contact)
    }
    
    return (
        <Fade right>
        <div className="card bg-light" key={_id}>
            <h3 className="text-primary text-left">{name}{' '}
        <span 
        style={{float:'right'}}
        className=
            {'badge '+(type==='professional'?
                'badge-success':'badge-primary')}>
        {type}</span>    
        </h3>
        <ul className="list">
                {email && (
                    <li>
                        <i className='fas fa-envelope-open'></i>{' '}{email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className='fas fa-phone'></i>{' '}{phone}
                    </li>
                )}
        </ul>
    <p>
        <button className="btn btn-dark btn-sm" onClick={()=>{onEdit()}}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete()}>Delete</button>
    </p>
        </div>
        </Fade>
    )
}

export default ContactItems;
