import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACTS,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Daniel Faustino',
        email: 'danieloliveirafaustino@gmail.com',
        phone: '94909-1999',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Isabel Faustino',
        email: 'isabelfausitno@gmail.com',
        phone: '94909-1999',
        type: 'professional',
      },
      {
        id: 3,
        name: 'Fabrine Macedo',
        email: 'fabrinemacedo@gmail.com',
        phone: '94909-1999',
        type: 'personal',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact

  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // DElete Contact

  // Set Current contact

  // Clear current contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
