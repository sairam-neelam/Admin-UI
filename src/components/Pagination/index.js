import './index.css'

const Pagination = props => {
  const {
    pageNumbers,
    handleTotalDecrementArrow,
    handleDecrementArrow,
    handleIncrementArrow,
    handleTotalIncrementArrow,
    handleClick,
    activePage,
  } = props

  const initailPage = () => {
    handleTotalDecrementArrow()
  }

  const prevPage = () => {
    handleDecrementArrow()
  }

  const nextPage = () => {
    handleIncrementArrow()
  }

  const lastPage = () => {
    handleTotalIncrementArrow()
  }

  const clickActivePage = page => {
    handleClick(page)
  }

  return (
    <div className="pagination-container">
      <button type="button" className="arrow-btn" onClick={initailPage}>
        &lt;&lt;
      </button>
      <button type="button" className="arrow-btn" onClick={prevPage}>
        &lt;
      </button>
      {pageNumbers.map(number => (
        <>
          {activePage === number ? (
            <button
              type="button"
              key={number}
              id={number}
              className="active page-btn"
              onClick={() => clickActivePage(number)}
            >
              {number}
            </button>
          ) : (
            <button
              type="button"
              key={number}
              id={number}
              className="page-btn"
              onClick={() => clickActivePage(number)}
            >
              {number}
            </button>
          )}
        </>
      ))}
      <button type="button" className="arrow-btn" onClick={nextPage}>
        &gt;
      </button>
      <button type="button" className="arrow-btn" onClick={lastPage}>
        &gt;&gt;
      </button>
    </div>
  )
}

export default Pagination
