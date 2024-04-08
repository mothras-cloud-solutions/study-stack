import React, { useState } from 'react';

const RegistrationForm = ({ onSignInClick, onCancelClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };
  const handleCancel = () => {
    clearForm();
    // Render the home page or perform any other action
    console.log('Cancelled registration. Redirecting to home page...');
    setError('');
    onCancelClick();
  };

  const validateForm = () => {
    if (!name || !email || !password) {
      setError('Name, email, and password are required.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

  };


  return (
    <div className="columns is-centered is-vcentered fullPageCenteredComponent">
      <div className="column is-two-fifths">
        <div className="box">
          <form className="mt-5" onSubmit={handleSignUp}>
            <p className="title">Register</p>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            {/* Error message */}
            {error && <p className="help is-danger pb-2">{error}</p>}
            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className={`button is-link is-fullwidth ${isLoading ? 'is-loading' : ''}`}>Sign Up</button>
              </div>
              <div className="control">
              <a className="button is-link is-light is-fullwidth" onClick={handleCancel}>Cancel</a>
            </div>
            </div>
            <div className="field">
              <p className="control">
                <span>Already have an account?</span>
                <span> </span>
                <a className="has-text-link has-text-weight-semibold" onClick={onSignInClick}>Sign In</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
