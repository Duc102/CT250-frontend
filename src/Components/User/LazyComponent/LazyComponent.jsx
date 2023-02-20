import React from 'react'
import HeaderContent from '../HeaderContentComponent/HeaderContent'
import "./LazyStyle.css"
export default function LazyComponent(props) {
    const itemStyle = {
        maxWidth: "200px",
        minHeight: "300px"
    }
  return (
    <div className='bg-primary w-100 mt-1' style={{minHeight: "120px"}}>
        <HeaderContent title={props.title}></HeaderContent>
        <div className='row'>
            <div className='col bg-white m-1' style={itemStyle}>
                Column 1
            </div>
            <div className='col bg-white m-1' style={itemStyle}>Column 2</div>
            <div className='col bg-white m-1' style={itemStyle}>Column 3</div>
            <div className='col bg-white m-1' style={itemStyle}>Column 4</div>
        </div>
    </div>
  )
}
