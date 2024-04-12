import React, { Fragment } from 'react';
// import { Links } from 'react-router-dom';
import Footer from './components/Footer';
import './styles/styles.css'

function Overview() {
  return (
    <Fragment>
      <div className="container">
        <section className="hero is-fullheight is-primary">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-size-1">Welcome to StudyStack</h1>
              <h2 className="subtitle is-size-4">
                Create, Edit, and Learn with Flashcards!
              </h2>
              <div className="columns is-centered is-vcentered">
                <div className="column is-one-third">
                  <div className="box">
                    <h3 className="title is-size-3">Decks</h3>
                    <p>Organize, archive, and eidt your flashcard decks.</p>
                    <a href="#" className="button is-primary is-fullwidth">
                      Get Started
                    </a>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="box">
                    <h3 className="title is-size-3">Learn</h3>
                    <p>Study and learn with your personalized flashcards.</p>
                    <a href="#" className="button is-primary is-fullwidth">
                      Get Started
                    </a>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="box">
                    <h3 className="title is-size-3">Create</h3>
                    <p>Create your own flashcards decks quickly and easily.</p>
                    <a href="#" className="button is-primary is-fullwidth">
                      Get Started
                    </a>
                  </div>
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
