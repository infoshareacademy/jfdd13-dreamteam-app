import React from "react";
import {Pagination as PaginationUI, PaginationItem} from 'semantic-ui-react'

const Pagination = ({ tripsPerPage, totalTrips, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalTrips / tripsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <ul style={{display: 'flex', padding: '0 .5rem', listStyle: 'none'}}>
            {pageNumbers.map(pageNumber => (
                <li
                    key={pageNumber}
                    className='page-item'
                    style={{color: '#000', padding: '0 .5rem'}}
                >
                    <a
                        onClick={() => paginate(pageNumber)}
                        href ="#" className="page-link"
                        style={{color: '#000'}}>
                        {pageNumber}
                    </a>
                </li>
            ))}
        </ul>
    );
};
export default Pagination