import React, { useState } from 'react';
import { createUser } from '../../../firebase/firebase.ts';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!email) {
        setError('Please provide an email address.');
      }
      if (!password) {
        setError('Please provide a password.');
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
      }

      await createUser(email, password);

      // Clear form fields after successful registration
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Optionally, you can redirect the user to another page after successful registration
      // history.push('/create-edit-deck'); probably want to use navigate but I think it needs router?
    } catch (error) {
      setError(error.message);
      console.log("error", error);
      alert(error);
    }
  }

  const handleCancel = () => {
    // Clear form fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="columns is-centered is-vcentered fullPageCenteredComponent">
      <div className="column is-two-fifths">
        <div className="box">
          <form className="mt-5" onSubmit={handleRegisterSubmit}>
            <p className="title">Register</p>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
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
                <button
                  type="submit"
                  className="button is-link is-fullwidth"
                  disabled={!(email && password && confirmPassword && password === confirmPassword)}
                >
                  Submit
                </button>
              </div>
              <div className="control">
                <button type="button" className="button is-link is-light is-fullwidth" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;