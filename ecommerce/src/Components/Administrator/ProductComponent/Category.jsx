import React from 'react';
import { useState, memo, useEffect, useRef } from 'react';
import ProductCategoryService from '../../../Services/CommonService/ProductCategoryService';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

const Category = (props) => {
    const [parent, setParent] = useState(props.parent);
    const [selected, setSelected] = useState(0);
    const [children, setChildren] = useState([]);
    let ref = useRef(0);

    // fetch data when a new category is selected.
    useEffect(() => {
        ProductCategoryService.getChildrenOfProductCategory(selected).then((response) => {
            if (response.data.length > 0) {
                let data = [{id: 0, categoryName: "All"}];
                response.data.forEach(element => {
                    data.push(element);
                });
                setChildren(data);
            } else {
                setChildren([]);
            }

        });
    }, [selected])

    // select first category when data provided have changed.
    useEffect(()=>{
        setSelected(0);
        setParent(props.parent);
    },[props]);

    function selectCategory() {
        let sel = ref.current.value;
        setSelected(sel);
        if(sel!==0){
            props.setCategoryId(sel);
        } else {
            props.setCategoryId(parent);
        }
        
    }
        return (
            <>
                <div className='select d-flex align-items-center white'>
                    <span className='category-title'>{props.title}</span> 
                    <select ref={ref} onChange={selectCategory} value={selected}>
                        {
                            props.data.map((value, index) => <option className='select-item' key={index} value={value.id}>{value.categoryName}</option>)
                        }
                    </select>
                </div>
                {
                    children.length > 0
                    ?
                    <Category title="Sub-Category" data={children} parent={selected} setCategoryId={props.setCategoryId}></Category>
                    : (<></>)
                }
            </>
        )
}
export default memo(Category);