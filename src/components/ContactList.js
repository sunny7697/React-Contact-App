import React from 'react';
import {Link} from 'react-router-dom'
import ContactCard from './ContactCard';

const ContactList = (props) => {

    const deleteContactHandler = id => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map(contact => {
        return(
            // passing deleteContactHandler as a prop(clickHandler) to ContactCard, so that we can get id
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>
        )
    })


    return(
        <div className="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui celled list">
                {renderContactList}
            </div>
        </div>
    )
}

export default ContactList;