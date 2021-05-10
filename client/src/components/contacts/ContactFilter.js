import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { i18n } from '../../translate/i18n';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const { filterContacts, clearFilter, filtered } = contactContext;

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder={i18n.t('filterContacts.placeHolder')}
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
