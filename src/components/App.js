import React, {useState, useEffect} from 'react';
import {uuid} from 'uuidv4';
import './App.css';
import Header from './Header';
import AddContact from './AddContact'
import ContactList from './ContactList'

function App() {
  const Local_Storage_Key = "contacts";
  const [contacts, setContacts] = useState([]);

  // add contact in the contact list
  const addContactHandler = contact => {
    setContacts([...contacts,{id: uuid(), ...contact}]);
    console.log(contact);
  }

  // remove specific contact from the contact list
  const removeContactHandler = id => {
    const newContactList = contacts.filter(contact => {
      return contact.id !== id
    })

    setContacts(newContactList);
  }

  // after every page refresh or load, get the contacts stored in the local storage
  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(Local_Storage_Key));
    if(retrieveContacts) {
      setContacts(retrieveContacts);
    }
  }, [])

  // after every contacts addition, contact added in the local storage
  useEffect(() => {
    localStorage.setItem(Local_Storage_Key, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className="ui container">
      <Header />
      {/* passing addContactHandler as a prop in AddContact Component */}
      <AddContact addContactHandler={addContactHandler} /> 
      {/* passing removeContactHandler as a prop(getContactId) in ContactList */}
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>
    </div>
  );
}

export default App;
