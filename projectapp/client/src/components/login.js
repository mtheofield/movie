import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  return fetch("http://localhost:3000/login",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json());
}


const Login = ({ setToken }) => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleFormSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({ username, password });
    setToken(token);
  }


  return (
    <>
      <div className="container-center"><h1>Log In Here</h1></div>

      <div className="login-wrapper">
        <div className="login-cell">
          <h3>Existing User</h3>
          <form className="pure-form pure-form-aligned" onSubmit={handleFormSubmit}>
            <fieldset>
              <div className="pure-control-group">
                <label htmlFor="aligned-username">Username</label>
                <input type="text" id="aligned-email" placeholder="username"
                  onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="pure-control-group">
                <label htmlFor="aligned-password">Password</label>
                <input type="password" id="password" placeholder="password"
                  onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="pure-controls">
                <button type="submit" className="pure-button pure-button-primary">Submit</button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="login-cell">
          <h3>New User</h3>
          <form className="pure-form pure-form-aligned">
            <fieldset>
              <div className="pure-control-group">
                <label htmlFor="aligned-username">Username</label>
                <input type="email" id="aligned-email" placeholder="username"
                  onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="pure-control-group">
                <label htmlFor="aligned-username">Name</label>
                <input type="email" id="aligned-email" placeholder="name"
                  onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="pure-control-group">
                <label htmlFor="aligned-username">email</label>
                <input type="email" id="aligned-email" placeholder="email"
                  onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="pure-control-group">
                <label htmlFor="aligned-password">Password</label>
                <input type="text" id="password" placeholder="password"
                  onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="pure-controls">
                <button type="submit" className="pure-button pure-button-secondary">Submit</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>

    </>
  )
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;