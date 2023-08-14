import React, { useRef, useState, useEffect } from 'react'
import "./SignIn.scss"
import { BiSolidError } from 'react-icons/bi';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import * as yup from "yup"
import { ErrorComponent } from '../Input error/ErrorComponent';

export const SignIn = ({ toastData }) => {
    const [isLogin, setIslogin] = useState(false)
    const [serverError, setServerError] = useState(false)
    const formref = useRef()
    const values = {
        username: "",
        password: "",
    }


    const userSchema = object({
        username: string().required("This filed is required"),
        password: string().required("This filed is required")
    })
    const submitHandler = async () => {
        const result = await sendRequest(formref.current.values)
        if (result.success) {
            toastData();
            setIslogin(true)
            formref.current.resetForm();
        }
        else {
            setServerError(true)
        }

    }
    const sendRequest = async (data) => {
        try {
            const reponse = await fetch("http://localhost:9090/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
            )
            return await reponse.json()
        }
        catch (error) {
            return error
        }

    }
    if (serverError) {
        return (
            <div >

                <Formik
                    innerRef={formref}
                    initialValues={values}
                    onSubmit={submitHandler}
                    validationSchema={userSchema}
                >
                    {({ touched, errors }) => (
                        <Form className='signInContainer'>
                            <label>Username :</label>
                            <Field
                                type='text'
                                name='username'
                                className={`custom-input ${touched.username && errors.username ? 'error-border' : ''}`}
                            />
                            <ErrorMessage name='username' component={ErrorComponent} />

                            <label>Password :</label>
                            <Field
                                type='password'
                                name='password'
                                className={`custom-input ${touched.password && errors.password ? 'error-border' : ''}`}
                            />
                            <ErrorMessage name='password' component={ErrorComponent} />
                            <div className='serverError'>
                                <BiSolidError/>
                                <p>
                                    Invalid username or password
                                </p>
                            </div>
                            <button
                                type='submit'
                                className={Object.keys(errors).length === 0 && touched.username && touched.password ? 'display-block' : 'display-none'}
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>

            </div>
        )
    }
    else {
        return (
            <div >
                <Formik
                    innerRef={formref}
                    initialValues={values}
                    onSubmit={submitHandler}
                    validationSchema={userSchema}
                >
                    {({ touched, errors }) => (
                        <Form className='signInContainer'>
                            <label>Username :</label>
                            <Field
                                type='text'
                                name='username'
                                className={`custom-input ${touched.username && errors.username ? 'error-border' : ''}`}
                            />
                            <ErrorMessage name='username' component={ErrorComponent} />

                            <label>Password :</label>
                            <Field
                                type='password'
                                name='password'
                                className={`custom-input ${touched.password && errors.password ? 'error-border' : ''}`}
                            />
                            <ErrorMessage name='password' component={ErrorComponent} />

                            <button
                                type='submit'
                                className={Object.keys(errors).length === 0 && touched.username && touched.password ? 'display-block' : 'display-none'}
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>

            </div>
        )
    }

}
