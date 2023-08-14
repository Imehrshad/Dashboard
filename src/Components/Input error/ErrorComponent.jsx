import React from 'react'
import "./ErrorsStyle.scss"

export const ErrorComponent = (props) => {
  return (
    <div className='Error'>
        {props.children}
    </div>
  )
}
