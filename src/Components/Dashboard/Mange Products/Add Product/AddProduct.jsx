import React, { useRef, useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { ErrorComponent } from '../../../Input error/ErrorComponent';
import { BiSolidError } from 'react-icons/bi';
import { MdArrowBackIosNew } from 'react-icons/md';
import { object, string } from 'yup';
import './AddProduct.scss';

const initialValues = {
  name: '',
  price: '',
};

const productValidation = object({
  name: string().required('This field is required'),
  price: string().required('This field is required'),
});

const AddProduct = ({ addproduct, page }) => {
  const [addError, setAddError] = useState(false);
  const productRef = useRef();
  const fileRef = useRef(null);

  const pageHandler = () => {
    page();
  };

  const submitHandler = async () => {
    const data = {
      name: productRef.current.values.name,
      price: productRef.current.values.price,
    };

    const sendingData = new FormData();
    sendingData.append('data', JSON.stringify(data));
    sendingData.append('file', fileRef.current.files[0]);

    try {
      const response = await fetch('http://localhost:9090/products', {
        method: 'post',
        body: sendingData,
        headers: {
          "Content-Type": "multipart/form-data",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const result = await response.json();

      if (result.status > 199 && result.status <= 299) {
        addproduct();
        productRef.current.resetForm();
        console.log(response);
      }
  
    } catch (error) {

      setAddError(true);
    }
  };

  return (
    <div className='addProductContainer'>
      <div style={{ width: '100%' }}>
        <div className='backButton' onClick={pageHandler}>
          <MdArrowBackIosNew />
          <p>Back</p>
        </div>
      </div>
      <h4>Add Product</h4>
      <Formik
        onSubmit={submitHandler}
        initialValues={initialValues}
        innerRef={productRef}
        validationSchema={productValidation}
      >
        {({ touched, errors }) => (
          <Form className='addProductForm'>
            <label>Name:</label>
            <Field
              type='text'
              name='name'
              className={`custom-input ${touched.name && errors.name ? 'error-border' : ''}`}
            />
            <ErrorMessage name='name' component={ErrorComponent} />
            <label>Price:</label>
            <Field
              type='number'
              name='price'
              className={`custom-input ${touched.price && errors.price ? 'error-border' : ''}`}
            />
            <ErrorMessage name='price' component={ErrorComponent} />
            <label>Image:</label>
            <input type='file' ref={fileRef} />

            {addError && (
              <div className='serverError'>
                <BiSolidError />
                <p>There was an error while adding a new product</p>
              </div>
            )}

            <button type='submit'>Add</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
