import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import "./Style.css"
export default function ProductsComponent() {
    const data = [
        {
            name: "All",
            subCategory: [],
            variation: [],
        },
        {
            name: "Tai nghe",
            subCategory: ["Có dây", "Không dây"],
            variation: [
                {
                    name: "Máu sắc",
                    value: ["Đen", "Nâu", "Đỏ", "Cam", "Vàng", "Lục", "Lam", "Tím", "Xám", "Trắng"]
                }
            ]
        },
        {
            name: "Bàn phím",
            subCategory: ["Có dây", "Không dây", "Công thái học"],
            variation: [
                {
                    name: "Màu sắc",
                    value: ["Đen", "Nâu", "Đỏ", "Cam", "Vàng", "Lục", "Lam", "Tím", "Xám", "Trắng"]
                },
                {
                    name: "Kích thước",
                    value: ["Đầy đủ", "Thu gọn"]
                }
            ]
        },
        {
            name: "Chuột",
            subCategory: ["Có dây", "Không dây", "Công thái học"],
            variation: [
                {
                    name: "Màu sắc",
                    value: ["Đen", "Nâu", "Đỏ", "Cam", "Vàng", "Lục", "Lam", "Tím", "Xám", "Trắng"]
                }
            ]
        },
        {
            name: "RAM",
            subCategory: [],
            variation: [
                {
                    name: "Kích thước",
                    value: ["2GB", "4GB", "8GB", "16GB"]
                }
            ]
        }
    ]

    const [categorySelected, setCategorySelected] = useState(data[0]);
    const category = useRef("All");

    function selectCategory() {
        const value = category.current.value;
        data.forEach((cate) => {
            if (cate.name === value) {
                setCategorySelected(cate);
            }
        })

    }

    const Category = (props) => {
        if (props.values.length > 0)
            return (
                <>
                    <div className='select'>
                        <span>{props.name} </span>
                        <select name={props.name} id="" ref={category} onChange={selectCategory} value={categorySelected.name}>
                            {
                                props.values.map((value, index) => <option key={index}>{value}</option>)
                            }
                        </select>
                    </div>
                </>
            )
        else return (<></>)
    }

    const SubCategory = (props) => {

        if (props.values.length > 0)
            return (
                <>
                    <div className='select'>
                        <span>{props.name} </span>
                        <select name={props.name} id="">
                            {
                                props.values.map((value, index) => <option key={index}>{value}</option>)
                            }
                        </select>
                    </div>
                </>
            )
        else 
            return (<></>)
    }

    function Variation() {
        return (
            <>
                {
                    categorySelected.variation.map(
                        (value, index) => <SubCategory key={index} name={value.name} values={value.value}
                        />)
                }
            </>
        )
    }


    function getNameOfAllCategory() {
        let category = [];
        data.forEach((cate) => category.push(cate.name))
        return category;
    }

    function clickButton(){
        let selEl = document.getElementsByTagName("select");
        let url = "";
        for(let i = 0; i< selEl.length; i++){
            url+="/"+selEl[i].name;
        }
        window.alert(url);
    }

    return (
        <div className='product-contain'>
            <header>
                <Category name="Category" values={getNameOfAllCategory()} />
                <SubCategory name="SubCategory" values={categorySelected.subCategory}></SubCategory>
                <Variation />
            </header>
            <button onClick={clickButton}>Hello world</button>
        </div>
    )
}
