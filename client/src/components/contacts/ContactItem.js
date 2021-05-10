import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import { i18n } from '../../translate/i18n';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);

  const { _id, name, email, phone, type } = contact;

  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
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
            className="btn btn-dark btn-sm"
            onClick={() => setCurrent(contact)}
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
