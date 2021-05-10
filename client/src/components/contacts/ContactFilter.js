import React, { useContext, useRef, useEffect } from 'react';
import {
  useContacts,
  filterContacts,
  clearFilter
} from '../../context/contact/ContactState';
import { i18n } from '../../translate/i18n';


const ContactFilter = () => {
  // we just need the conact dispatch without state.
  const contactDispatch = useContacts()[1];

  const onChange = (e) => {
    if (e.target.value !== '') {
      filterContacts(contactDispatch, e.target.value);
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type='text' 
        placeholder={i18n.t('filterContacts.placeHolder')}
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
