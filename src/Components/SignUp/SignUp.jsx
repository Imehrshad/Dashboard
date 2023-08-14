import React, { useRef, useState } from 'react'
import "./Signup.scss"
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import * as yup from "yup"
import { ErrorComponent } from '../Input error/ErrorComponent';

export const Signup = ({ toastData }) => {
  const [serverError, setServerError] = useState(false)
  const formref = useRef()
  const values = {
    username: "",
    password: "",
    confirmPassword: ""
  }

  const userSchema = object({
    username: string().required("This filed is required").min(4, "Username must be more than 3 character"),
    password: string().required("This filed is required").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[a-z]){1}).*$/,
      "Please set a strong passwrod that includes number and symbols"
    ),
    confirmPassword: string().oneOf([yup.ref('password'), null], 'Passwords doesnt match').required("This filed is required"),
  })

  const sendRequest = async (data) => {
    try {
      const reponse = await fetch("http://localhost:9090/users/register", {
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
  const submitHandler = async () => {
    const data = {
      username: formref.current.values.username,
      password: formref.current.values.password,
      role: "string",
      active: true,
      enabled: true,
      lock: true,
      expired: true
    }
    const result = await sendRequest(data);
    if (result.username) {
      toastData();
      formref.current.resetForm();
    }
    else {
      setServerError(true)
    }

  }
  if (serverError) {
    return (
      <div >
        <Formik onSubmit={() => submitHandler()} validationSchema={userSchema} initialValues={values} innerRef={formref}>
          {
            ({ touched, errors }) => {
              return <Form className='signupContainer'>
                <label>Username : </label>
                <Field type='text' name='username' className={`custom-input ${touched.username && errors.username ? "error-border" : ""}`} />
                <ErrorMessage name='username' component={ErrorComponent} />

                <label>Password : </label>
                <Field type='password' name='password' className={`custom-input ${touched.password && errors.password ? "error-border" : ""}`} />
                <ErrorMessage name='password' component={ErrorComponent} />

                <label>Confirm Password : </label>
                <Field type='password' name='confirmPassword' className={`custom-input ${touched.confirmPassword && errors.confirmPassword ? "error-border" : ""}`} />
                <ErrorMessage name='confirmPassword' component={ErrorComponent} />
                <div className='errorServer'>
                  Something Went Wrong !!
                </div>
                <button type='submit ' className={Array.from(errors).length === 0 && touched.username && touched.password && touched.confirmPassword > 0 ? "display-block" : "display-none"}>Submit</button>
              </Form>
            }
          }
        </Formik>
      </div>
    )
  }
  else {
    return (
      <div >
        <Formik onSubmit={() => submitHandler()} validationSchema={userSchema} initialValues={values} innerRef={formref}>
          {
            ({ touched, errors }) => {
              return <Form className='signupContainer'>

                <label>Username : </label>
                <Field type='text' name='username' className={`custom-input ${touched.username && errors.username ? "error-border" : ""}`} />
                <ErrorMessage name='username' component={ErrorComponent} />

                <label>Password : </label>
                <Field type='password' name='password' className={`custom-input ${touched.password && errors.password ? "error-border" : ""}`} />
                <ErrorMessage name='password' component={ErrorComponent} />

                <label>Confirm Password : </label>
                <Field type='password' name='confirmPassword' className={`custom-input ${touched.confirmPassword && errors.confirmPassword ? "error-border" : ""}`} />
                <ErrorMessage name='confirmPassword' component={ErrorComponent} />

                <button type='submit ' className={!errors.username && !errors.password && !errors.confirmPassword && touched.username && touched.password && touched.confirmPassword ? "display-block" : "display-none"}>Submit</button>
              </Form>
            }
          }
        </Formik>
      </div>
    )
  }

}
