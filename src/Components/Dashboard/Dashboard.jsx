import React, { useState } from 'react'
import "./dashboardContainer.scss"
import { MangeProducts } from './Mange Products/MangeProducts'
import { Exit } from './Exit/Exit'
import { CgProfile } from 'react-icons/cg';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

export const Dashboard = ({ userInfo, logout, addproduct }) => {
    const [mobilePhone, setMobilePhone] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const exitHandler = () => {
        logout();
    }
    return (
        <div className='mainCotainer'>
            <div className='dashboardContainer'>
                <div className='MobileButtonContainer'>
                    <AiOutlineMenu className='mobileMenuButton' onClick={() => setMobilePhone(true)} />
                    <p>Dashboard</p>
                </div>
                <div className='menu'>
                    <ul>
                        <li className='profile'>
                            <CgProfile />
                            <p>{userInfo}</p>
                        </li>
                        <li onClick={() => setCurrentPage(1)} className={currentPage === 1 ? "active" : ""}>Mange Products</li>
                        <li onClick={exitHandler}>Exit</li>
                    </ul>
                </div>
                <div className={`phone-menu  ${mobilePhone ? "open" : ""}`}>
                    <ul>
                        <li className='closeButton'>
                            <AiOutlineClose onClick={() => setMobilePhone(false)} />
                        </li>
                        <li className='profile'>
                            <CgProfile />
                            <p>{userInfo}</p>
                        </li>
                        <li onClick={() => setCurrentPage(1)} className={currentPage === 1 ? "active" : ""}>Mange Products</li>
                        <li onClick={exitHandler}>Exit</li>
                    </ul>
                </div>
                <div className='content'>
                    {currentPage === 1 && <MangeProducts addproduct={addproduct}/>}
                    {currentPage === 2 && <Exit />}
                </div>
            </div>
        </div>
    )
}
