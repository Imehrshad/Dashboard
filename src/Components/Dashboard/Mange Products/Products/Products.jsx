import React, { useEffect, useState } from 'react'
import "./Products.scss"
import { MdArrowBackIosNew } from 'react-icons/md';
import MoonLoader from "react-spinners/MoonLoader";
import variables from "../../../_variables.module.scss"

export const Products = ({page}) => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    useEffect(() => {
        setTimeout(() => {
            getProducts()
        }, 1000);
    }, [])
    const pageHandler = () => {
        page()
    }
    const getProducts = async () => {
        const response = await fetch("http://localhost:9090/products")
        const result = await response.json()
        setProducts(result)
        setLoading(false)
    }

    if (loading) {
        return <div className='loading'>
            <MoonLoader
                color="#36d7b7"
                size={50}
            />
        </div>
    }
    else {
        return (
            <div className='productContainer'>
                <div>
                    <div className='backButton' onClick={pageHandler}>
                    <MdArrowBackIosNew  />
                    <p>Back</p>
                    </div>
                    {
                        products.map((item) => {
                            return <div className='product'>
                                <img src={item.indexImageUrl} />
                                <p>{item.name}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }

}
