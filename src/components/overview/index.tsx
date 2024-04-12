import React, { Fragment } from 'react';
// import { Links } from 'react-router-dom';
import Footer from './components/Footer';
import './styles/styles.css'
import { useNavigate, NavLink } from 'react-router-dom';

function Overview() {
  const navigate = useNavigate();

  const handleHomeCollections = async () => {
    try {
      navigate('/collections');
    } catch (error) {
      console.error('Collections button error:', error.message);
    }
  };
  const handleHomeCreate = async () => {
    try {
      navigate('/create');
    } catch (error) {
      console.error('Create button error:', error.message);
    }
  };
  return (
    <Fragment>
      <div className="container">
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-size-1">Welcome to StudyStack</h1>
              <h2 className="subtitle is-size-4">
                Create, Edit, and Learn with Flashcards!
              </h2>
              <div className="columns is-centered is-vcentered">
                <div className="column is-half homeBg">
                  <NavLink to="/create" className="box clickable">
                    <h3 className="title is-size-3">Create Your First Deck</h3>
                    <p>Create your own flashcards quickly and easily.</p>
                  </NavLink>
                </div>
                {/* <div className="column is-one-third homeBg">
                  <a href="#" className="box clickable">
                    <h3 className="title is-size-3">Edit</h3>
                    <p>Edit your existing flashcards with ease.</p>
                  </a>
                </div> */}
                <div className="column is-half homeBg">
                  <NavLink to="/collections" className="box clickable">
                    <h3 className="title is-size-3">See all your Decks</h3>
                    <p>Organize and format your flashcards here.</p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Overview;
