import React, { useState } from 'react'
import "./dashboardContainer.scss"
import { MangeProducts } from './Mange Products/MangeProducts'
import { Exit } from './Exit/Exit'
import { CgProfile } from 'react-icons/cg';

export const Dashboard = ({ userInfo, logout }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const exitHandler = () => {
        logout();
    }
    return (
        <div className='mainCotainer'>
            <div className='dashboardContainer'>
                <div className='menu'>
                    <ul>
                        <li className='profile'>
                            <CgProfile />
                            <p>{userInfo}</p>
                        </li>
                        <li onClick={() => setCurrentPage(2)} className={currentPage === 1 ? "active" : ""}>Mange Products</li>
                        <li onClick={exitHandler}>Exit</li>
                    </ul>
                </div>
                <div className='content'>
                    {currentPage === 1 && <MangeProducts />}
                    {currentPage === 2 && <Exit />}
                </div>
            </div>
        </div>
    )
}
