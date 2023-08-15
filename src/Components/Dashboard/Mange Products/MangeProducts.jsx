import React, { useState } from 'react'
import "./MangeProducts.scss"
import { AiFillFileAdd } from 'react-icons/ai';
import { BsFillFolderFill } from 'react-icons/bs';
import { Products } from './Products/Products';
import { AddNewProduct } from './Add Product/AddProduct';



export const MangeProducts = ({ addproduct }) => {
  const [selection, setSelection] = useState(0)
  const backToHome = () => {
    setSelection(0)
  }
  if (selection === 0) {
    return (
      <div className='mangeProducts'>
        <div onClick={() => setSelection(1)}>
          <BsFillFolderFill />
          <p>Products</p>
        </div>
        <div onClick={() => setSelection(2)}>
          <AiFillFileAdd />
          <p>Add Product</p>
        </div>
      </div>
    )
  }
  if (selection === 1) {
    return (
      <Products page={backToHome} />
    )
  }
  if (selection === 2) {
    return <AddNewProduct page={backToHome} addproduct={addproduct} />
  }

}
