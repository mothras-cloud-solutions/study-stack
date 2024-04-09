import React from 'react';

const Pagination: React.FC = () => {
  return (
    <nav className="pagination is-centered pt-5" role="navigation" aria-label="pagination">
      <a href="#" className="pagination-previous">Previous Card</a>
      <a href="#" className="pagination-next">Next Card</a>
      <ul className="pagination-list">
        <li><a href="#" className="pagination-link" aria-label="Goto page 1">1</a></li>
        <li><span className="pagination-ellipsis">&hellip;</span></li>
        <li><a href="#" className="pagination-link" aria-label="Goto page 45">4</a></li>
        <li>
          <a
            className="pagination-link is-current"
            aria-label="Page 46"
            aria-current="page"
          >5</a>
        </li>
        <li><a href="#" className="pagination-link" aria-label="Goto page 47">6</a></li>
        <li><span className="pagination-ellipsis">&hellip;</span></li>
        <li><a href="#" className="pagination-link" aria-label="Goto page 86">12</a></li>
      </ul>
    </nav>
  );
};

export default Pagination;
