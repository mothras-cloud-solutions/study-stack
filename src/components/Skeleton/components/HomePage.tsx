import React from 'react';

interface HomeProps {
  onLoginLinkClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onLoginLinkClick }) => {
  return (
    <section className="hero is-medium is-rounded has-text-centered fullPageCenteredComponent">
      {/* Client wants a slide in this area
    <div className="box">
    </div> */}
      <div className="hero-body" style={{ zIndex: 10 }}>
        <p className="title">Enhance Your Study Sessions.<br></br>Master Test Day with Confidence.</p>
        <p className="subtitle">Elevate Your Learning Experience.<br></br>Transform Your Flashcards into Dynamic Practice Tests.</p>
        <button type="submit" className={`button is-link is-medium is-outlined`} onClick={onLoginLinkClick}><span>Get started</span><span className="icon is-medium"><i className="fas fa-arrow-right"></i></span></button>
      </div>
    </section>
  );
};

export default Home;
