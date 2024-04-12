import React from 'react';

interface PaginationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageClick: (pageNumber: number) => void;
  onStudyAgainClick: () => void;
  onGotItClick: () => void;
  onDoneClick: () => void;
  onShuffleClick: () => void;
  index: number;
  length: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onPrevClick,
  onNextClick,
  onPageClick,
  onStudyAgainClick,
  onGotItClick,
  onDoneClick,
  onShuffleClick,
  index,
  length,
}) => {
  const currentPage = index + 1;
  const totalPages = length;

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageClick(pageNumber - 1);
    }
  };

  return (
    <nav className="pagination is-centered pt-5" role="navigation" aria-label="pagination">
            <div className="navbar-start">
        <div className="buttons">
      <button className="button is-primary is-outlined" onClick={onStudyAgainClick}>
        Study Again
      </button>
      <button className="button is-success is-outlined" onClick={onGotItClick}>
        Got It!
      </button>
      <button className="button is-danger is-outlined" onClick={onDoneClick}>
        Done
      </button>
      <button className="button is-warning is-outlined" onClick={onShuffleClick}>
        Shuffle
      </button>
      </div>
      </div>
       <div className="navbar-end">
        <div className="buttons">
      <button
        className="pagination-previous"
        onClick={onPrevClick}
        disabled={index === 0}
      >
        Previous Card
      </button>
      <button
        className="pagination-next"
        onClick={onNextClick}
        disabled={index === length - 1}
      >
        Next Card
      </button>
      <ul className="pagination-list">
        <li>
          <button
            className={`pagination-link ${currentPage === 1 ? 'is-current' : ''}`}
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1}
          >
            1
          </button>
        </li>
        {totalPages > 3 && (
          <>
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <button
                className={`pagination-link ${currentPage === totalPages ? 'is-current' : ''}`}
                onClick={() => handlePageClick(totalPages)}
                disabled={currentPage === totalPages}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        <li>
          <button
            className="pagination-link is-current"
            disabled
          >
            {currentPage}
          </button>
        </li>
      </ul>
      </div>
      </div>
    </nav>
  );
};

export default Pagination;
