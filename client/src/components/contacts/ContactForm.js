import React, { useState, useContext, useEffect } from 'react';
import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent
} from '../../context/contact/ContactState';
import { i18n } from '../../translate/i18n';

const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();
  const { current } = contactState;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contactDispatch, contact);
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current
          ? `${i18n.t('contactForm.updateTitle')}`
          : `${i18n.t('contactForm.title')}`}
      </h2>
      <input
        type="text"
        placeholder={i18n.t('contactForm.name')}
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder={i18n.t('contactForm.email')}
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder={i18n.t('contactForm.phone')}
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>{i18n.t('contactForm.contactType')}</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      {i18n.t('contactForm.personal')}{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      {i18n.t('contactForm.professional')}
      <div>
        <input
          type="submit"
          value={
            current
              ? `${i18n.t('contactForm.updateButton')}`
              : `${i18n.t('contactForm.button')}`
          }
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            {i18n.t('contactForm.clear')}
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
