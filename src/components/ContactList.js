import React, {useRef} from 'react';
import {Link} from 'react-router-dom'
import ContactCard from './ContactCard';

const ContactList = (props) => {
    const inputEle = useRef("");

    const deleteContactHandler = id => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map(contact => {
        return(
            // passing deleteContactHandler as a prop(clickHandler) to ContactCard, so that we can get id
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>
        )
    })

    const getSearchTerm = () => {
        props.searchKeyword(inputEle.current.value);
    }

    return(
        <div className="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEle} type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0 ? renderContactList : "No contact available"}
            </div>
        </div>
    )
}

export default ContactList;