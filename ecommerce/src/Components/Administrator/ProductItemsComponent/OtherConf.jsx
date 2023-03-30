import React from 'react'
import { useState, useEffect, memo } from 'react';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

 function OtherConf(props) {
    const navigate = useNavigate();
    const [keyVar, setKeyVar] = useState([]); // keyVar = Variation ID (type of variation).
    useEffect(()=>{
      setKeyVar(Object.keys(props.other));
    },[props]);
    
    const VarOp = (props) => {
        return (
          <>
           {props.otherOptions.map((v, index)=><option key={index} value={v.id}>{v.value}</option>)} 
          </>
        )
    };

    function goTo(){
      navigate("/administrator/addProductItem/"+props.productId);
    }
    const QuickItem = (props) => {
      const navigate = useNavigate();
      const goToTheProductItem = () =>{
        navigate("/administrator/products/productItemsDetail/" + props.productItem.id);
      }
      return(
        <>
          <img src={props.productItem.productImages[0].url} alt={"Product Item"} width="200px" onClick={goToTheProductItem}></img>
        </>
      )
    }

    return (
      <div className="otherConfig">
        <div className='config'>
          {
            keyVar.map((k, index)=><select key={index} id={k} onChange={props.fun} value={props.selected[k]}><VarOp otherOptions={props.other[k]}/></select>)
          }
        </div>
        <div className='other-item'>
          {
            props.productItems.map((productItem, index)=><QuickItem key={index} productItem={productItem}></QuickItem>)
          }
          <div className='add-new-product' onClick={goTo}>
            <AddCircleRoundedIcon fontSize='large'/>
          </div>
        </div>
      </div>
    )
}
export default memo(OtherConf);