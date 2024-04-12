import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer py-5 transparent-bg">
      <div className="content has-text-centered">
        <p>
          <strong>Study Stack</strong> &copy; 2024. All rights reserved.
        </p>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="icon">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
