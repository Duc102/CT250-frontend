import React from 'react'
import { useState, useEffect, memo } from 'react';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function OtherProductItem(props) {
  const navigate = useNavigate();
  const [keyVar, setKeyVar] = useState([]); // keyVar = Variation ID (type of variation).
  useEffect(() => {
    setKeyVar(Object.keys(props.other));
  }, [props]);

  const VarOp = (props) => {
    return (
      <>
        <option value={0}>No</option>
        {props.otherOptions.map((v, index) => <option key={index} value={v.id}>{v.value}</option>)}
      </>
    )
  };

  const QuickItem = (props) => {
    const navigate = useNavigate();
    const goToTheProductItem = () => {
      navigate("/productItemDetail/" + props.productItem.id);
    }
    return (
      <>
        <img src={props.productItem.productImages[0].url} alt={"Product Item"} onClick={goToTheProductItem}></img>
      </>
    )
  }

  return (
    <div className="otherConfig me-2">
      <div className='config' style={{marginTop: "3px"}}>
        {
          keyVar.map((k, index) => <select key={index} id={k} onChange={props.fun} value={props.selected[k]}><VarOp otherOptions={props.other[k]} /></select>)
        }
      </div>
        <div className='other-item-container'>
          {
            props.productItems.map((productItem, index) => <QuickItem key={index} productItem={productItem}></QuickItem>)
          }
        </div>
    </div>
  )
}
export default memo(OtherProductItem);