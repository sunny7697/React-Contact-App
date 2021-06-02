import React from 'react';
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
        <div className="ui celled list">
            {renderContactList}
        </div>
    )
}

export default ContactList;