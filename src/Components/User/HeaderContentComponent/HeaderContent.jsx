import React from 'react'
import "./HeaderContentStyle.css"
export default function HeaderContent(props) {
  return (
    <div className='d-flex justify-content-center align-items-center header-content'>
        <div className='title'>{props.title}</div>
    </div>
  )
}
