import ProductService from '../../../Services/CommonService/ProductService';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductItem from '../LazyComponent/ProductItem';
import ProductCategoryService from '../../../Services/CommonService/ProductCategoryService';
const Search = () => {
    const { name, categoryName } = useParams();
    const [product, setProduct] = useState();
    const [category, setCategory] = useState();
    useEffect(() => {
        ProductService.getProductsByName(name).then(response => {
            setProduct(response.data)
        })
        ProductCategoryService.findProductCategoryByName(name).then(response => {
            setCategory(response.data)
            response.data?.map((cage) => {
                ProductService.getProductByCategoryId(cage.id).then(res => {
                    setProduct([...res.data])
                })
            })
        })
    }, [name])
    function test() {

        console.log(product)
    }
    return (
        <div className="container bg-dark border border-dark rounded mt-1 mb-1" style={{ minWidth: "515px" }}>
            <h3>Kết quả cho: {name} </h3>
            <div className='lazy-container search justify-content-center'>
                {
                    product?.map((pro) =>
                        pro.productItems?.map((item, index) => <ProductItem key={index} productItem={item} />)
                    )
                }

            </div>
        </div>
    );
}

export default Search;