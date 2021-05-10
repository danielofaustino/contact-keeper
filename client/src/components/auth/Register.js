import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, clearErrors, register } from '../../context/auth/AuthState';
import { i18n } from '../../translate/i18n';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register(authDispatch, {
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
      {i18n.t('register.title')} <span className="text-primary">{i18n.t('register.register')}</span>
      </h1>
      <form onSubmit={onSubmit}>
        {/* INPUT NAME */}
        <div className="form-group">
          <label htmlFor="name">{i18n.t('register.name')}</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>

        {/* INPUT EMAIL */}
        <div className="form-group">
          <label htmlFor="email">{i18n.t('register.email')}</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">{i18n.t('register.password')}</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password2">{i18n.t('register.confirm')}</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>

        <input
          type="submit"
          value={i18n.t('register.button')}
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
