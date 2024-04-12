import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  onLoginLinkClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onLoginLinkClick }) => {
  const navigate = useNavigate();

  const handleHomeRegister = async () => {
    try {
      navigate('/register');
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <section className="hero is-medium is-rounded has-text-centered fullPageCenteredComponent">
      {/* Client wants a slide in this area
    <div className="box">
    </div> */}
      {/* <br/>Elevate Your Learning Experience. */}
      {/* <br/>Transform Your Flashcards into Dynamic Practice Tests. */}
      <div className="hero-body" style={{ zIndex: 10 }}>
        <p className="title">Enhance Your Study Sessions.<br></br>Master Test Day with Confidence.</p>
        <br></br>
        <p className="subtitle">Ready to learn? Continue below!</p>
        <button type="submit" className={`button is-link is-medium is-outlined`} onClick={handleHomeRegister}><span>Get started!</span><span className="icon is-medium"><i className="fas fa-arrow-right"></i></span></button>
      </div>
    </section>
  );
};

export default Home;

