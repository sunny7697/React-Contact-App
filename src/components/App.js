import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {uuid} from 'uuidv4';
import api from '../api/contacts';
import './App.css';
import Header from './Header';
import AddContact from './AddContact'
import ContactList from './ContactList'
import ContactDetails from './ContactDetails'

function App() {
  const Local_Storage_Key = "contacts";
  const [contacts, setContacts] = useState([]);

  // Retrieve contacts from json-server
  const retrieveContacts = async () => {
      const response = await api.get('/contacts');
      return response.data;
  }

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
    // const retrieveContacts = JSON.parse(localStorage.getItem(Local_Storage_Key));
    // if(retrieveContacts) setContacts(retrieveContacts);

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }

    getAllContacts();
  }, [])

  // after every contacts addition, contact added in the local storage
  useEffect(() => {
    localStorage.setItem(Local_Storage_Key, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact render={(props) => (<ContactList {...props}  contacts={contacts} getContactId={removeContactHandler}  />)} />
          <Route path="/add" render={(props) => (<AddContact {...props} addContactHandler={addContactHandler} />)} />
          <Route path='/contact/:id' component={ContactDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
