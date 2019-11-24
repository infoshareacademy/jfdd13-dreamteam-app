import React from "react";
import {Pagination as PaginationUI, PaginationItem} from 'semantic-ui-react'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            {pageNumbers.map(pageNumber => (
                <li
                    key={pageNumber}
                    className='page-item'
                >
                    <a onClick={() => paginate(pageNumber)} href ="!#" className="page-link">
                        {pageNumber}
                    </a>
                </li>
            ))}
        </div>
    );
};
export default Pagination