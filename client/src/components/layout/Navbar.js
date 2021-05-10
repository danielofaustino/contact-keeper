import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import ReactFlagsSelect from 'react-flags-select';
import { Us, Br } from 'react-flags-select';

import { i18n } from '../../translate/i18n';

const I18N_STORAGE_KEY = 'i18nextLng';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;
  const [selected, setSelected] = useState(
    localStorage.getItem(I18N_STORAGE_KEY)
  );

  const handleSelectChange = async (code) => {
    await setSelected(code);

    if (code === 'BR') {
      code = 'pt-BR';
    } else if (code === 'US') {
      code = 'en-US';
    }

    await localStorage.setItem(I18N_STORAGE_KEY, code);
    // eslint-disable-next-line no-self-assign
    window.location = window.location;
  };

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li>{i18n.t('navbar.hello')} {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm"> {i18n.t('navbar.logout')}</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">{i18n.t('navbar.register')}</Link>
      </li>
      <li>
        <Link to="/login">{i18n.t('navbar.login')}</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>

      <ul>
        {isAuthenticated ? authLinks : guestLinks}{' '}
        <ReactFlagsSelect
          countries={['BR', 'US']}
          customLabels={{ BR: '.', US: '.' }}
          placeholder={selected === 'pt-BR' ? <Br /> : <Us />}
          selected={selected}
          onSelect={(code) => handleSelectChange(code)}
          className="menu-flags"
        />
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
