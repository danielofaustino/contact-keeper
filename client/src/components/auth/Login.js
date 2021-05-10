import React, { useState, useEffect, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, clearErrors, login } from '../../context/auth/AuthState';
import { i18n } from '../../translate/i18n';


const Login = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Credenciais Inválidas') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, authDispatch, setAlert]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else{
      login(authDispatch, {
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        {i18n.t('login.title')} <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        {/* INPUT EMAIL */}
        <div className="form-group">
          <label htmlFor="email">{i18n.t('login.email')}</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">{i18n.t('login.password')}</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <input
          type="submit"
          value={i18n.t('login.button')}
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
