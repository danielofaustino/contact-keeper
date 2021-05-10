import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  useContacts,
  deleteContact,
  setCurrent,
  clearCurrent
} from '../../context/contact/ContactState';
import { i18n } from '../../translate/i18n';

const ContactItem = ({ contact }) => {
  // we just need the contact dispatch without state.
  const contactDispatch = useContacts()[1];

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };


  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type === 'personal'
            ? i18n.t('contactItem.personal').charAt(0).toUpperCase() +
              i18n.t('contactItem.personal').slice(1)
            : i18n.t('contactItem.professional').charAt(0).toUpperCase() +
              i18n.t('contactItem.professional').slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
        <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contactDispatch, contact)}
        >
            {i18n.t('contactItem.edit')}
          </button>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>
            {i18n.t('contactItem.delete')}
          </button>
        </p>
      </ul>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
