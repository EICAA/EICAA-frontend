import React from 'react';
import * as classnames from 'classnames';
import ButtonPaginator from '../ui/Buttons/ButtonPaginator';
import './index.scss';

const PaginationControl = props => {
  const {
    className,
    count,
    page,
    setPage,
    limit,
    setStart,
  } = props;

  const maxPage = Math.ceil(count / limit);
  
  return (
    <div
      className={classnames(
        'pagination-control',
        className && className,
      )}
    >
      {page > 3 && (
        <>
          <ButtonPaginator
            className="pagination-control__button -grey-blank"
            label={1}
            handleClick={() => {
              setPage(1);
              setStart(0);
            }}
          />
          <ButtonPaginator
            className="pagination-control__button -grey-blank -fake"
            label="..."
          />
        </>
      )}
      {page - 2 >= 1 && (
        <ButtonPaginator
          className="pagination-control__button -grey-blank"
          label={page - 2}
          handleClick={() => {
            setPage(page - 2);
            setStart((page - 3) * limit);
          }}
        />
      )}
      {page - 1 >= 1 && (
        <ButtonPaginator
          className="pagination-control__button -grey-blank"
          label={page - 1}
          handleClick={() => {
            setPage(page - 1);
            setStart((page - 2) * limit);
          }}
        />
      )}
      <ButtonPaginator
        className="pagination-control__button"
        label={page}
      />
      {page + 1 <= maxPage  && (
        <ButtonPaginator
          className="pagination-control__button -grey-blank"
          label={page + 1}
          handleClick={() => {
            setPage(page + 1);
            setStart(page * limit);
          }}
        />
      )}
      {page + 2 <= maxPage  && (
        <ButtonPaginator
          className="pagination-control__button -grey-blank"
          label={page + 2}
          handleClick={() => {
            setPage(page + 2);
            setStart((page + 1) * limit);
          }}
        />
      )}
      {page < maxPage - 2 && (
        <>
          <ButtonPaginator
            className="pagination-control__button -grey-blank -fake"
            label="..."
          />
          <ButtonPaginator
            className="pagination-control__button -grey-blank"
            label={maxPage}
            handleClick={() => {
              setPage(maxPage);
              setStart((maxPage - 1) * limit);
            }}
          />
        </>
      )}
    </div>
  );
};

export default PaginationControl ;
