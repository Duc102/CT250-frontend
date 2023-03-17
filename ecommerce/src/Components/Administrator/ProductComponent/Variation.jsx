import React from 'react'
import { useState, useEffect, memo } from 'react';
import ProductService from '../../../Services/CommonService/ProductService';
import VariationService from '../../../Services/CommonService/VariationService';
import "./Variation.css"

const Variation = (props) => {
  const [categoryId, setCategoryId] = useState(props.categoryId);
  const [variations, setVariation] = useState([]);
  useEffect(()=>{
    setCategoryId(parseInt(props.categoryId));
    VariationService.getVariationAlongCategoryId(props.categoryId).then((response)=>{
      let tmpVar = response.data;
      setVariation(tmpVar);
      // props.setConditions([]);
    })
    if(props.init === undefined){
      props.setConditions([]);
    }
  }, [props.categoryId])

  useEffect(()=> {
    if(props.init !== undefined){
      variations.forEach((variation)=>{
        let varSel = document.getElementById(props.goal+"-"+variation.id);
        if(props.init[variation.id] !== undefined)
          varSel.value = props.init[variation.id];
      })
    }
  },[variations])

  function selectVariation(){
    if(props.goal.includes("modify") || props.goal.includes("new-product")) {
      let conditions = {};
      variations.forEach((variation)=>{
        let varSel = document.getElementById(props.goal+"-"+variation.id);
        if(parseInt(varSel.value) !== 0)
          conditions[variation.id] = varSel.value;
      })
      props.setConditions(conditions);
    } else {
      let conditions = [];
      variations.forEach((variation)=>{
        let varSel = document.getElementById(props.goal+"-"+variation.id);
        if(parseInt(varSel.value) !== 0)
          conditions.push(parseInt(varSel.value));
      })
      props.setConditions(conditions);
    }
  }

  if(variations.length > 0)
    return (
      <div className='variation d-flex flex-wrap'>
      {
          variations.map((variation, index)=>
            <div className='select d-flex align-items-center white' key={index}><span className='variation-title'> {variation.name} </span>
              <select id={props.goal+"-"+variation.id} onChange={selectVariation}>
                <option value={0}>All</option>
                {
                  variation.variationOption?.map((varOp, index)=><option key={index} value={varOp.id}>{varOp.value}</option>)
                }
              </select>
            </div>
          )
        }
      </div>
    )
  else return (<></>)
}

export default memo(Variation)