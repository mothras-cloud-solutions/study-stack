import React, { useState } from 'react';
import { signInWithEmail, signInWithGoogle } from '../../../firebase/firebase.ts';
import { useNavigate } from 'react-router-dom';
import Footer from '../Skeleton/components/Footer.tsx';

function Login() {
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginWithEmail = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmail(email, password);
      const user = userCredential.user;
      setUid(user.uid);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    navigate('/');
  };

  return (
    <div className="columns is-centered is-vcentered fullPageCenteredComponent">
      <div className="column is-two-fifths">
        <div className="box">
          <h2 className="title">Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleLoginWithEmail}>
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
            <button type="submit" className="button is-link" disabled={!(email && password)}> Submit </button>
          </form>
          <button className="google button is-link" onClick={handleLoginWithGoogle}>Login with Google</button>
          <button className="logcancel button is-link" type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      <Footer/>
    </div >
  );
}

export default Login;
