import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardService from '../../../Services/CommonService/DashboardService';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import { NavLink } from 'react-router-dom';


const TopTenProductItem = () => {
    const [topTen, setTopTen] = useState([]);

    useEffect(() => {
        init();
    }, []);

    function getTopTen(month, year) {
        DashboardService.getTopTenProductItems(month, year).then(res => {
            let topFive = [];
            for (let i = 0; i < 5 && i < res.data.length; i++) {
                let e = {
                    name: i + 1,
                    product: res.data[i].product,
                    productItem: res.data[i].productItem,
                    count: res.data[i].count
                }
                topFive.push(e);
            }
            setTopTen(topFive);
        });
    }

    function executeFullNamForProductItem(product, productItem) {
        let config = productItem.productConfigurations;
        let value = [];
        config.forEach(c => {
            value.push(c.variationOption.value);
        })
        value = value.sort((a, b) => a.length - b.length);
        let name = "";
        value.forEach(v => name = name + " " + v);
        return product.name + " " + name;
    }

    function filter() {
        let el = document.getElementById("top-ten-date-value");
        let date = el.value;
        let dateTime = new Date(date);
        // let utc = new Date(Date.UTC(dateTime.getFullYear(),
        //     dateTime.getMonth(),
        //     dateTime.getDate(),
        //     dateTime.getHours(),
        //     dateTime.getMinutes(),
        //     dateTime.getSeconds()));
        // getTopTen(parseInt(utc.getMonth()) + 1, parseInt(utc.getFullYear()));
        let month = parseInt(dateTime.getMonth()) + 1;
        let value = dateTime.getFullYear() + "-" + (month > 10 ? month : "0" + month.toString());
        el.value = value;
        getTopTen(parseInt(dateTime.getMonth()) + 1, parseInt(dateTime.getFullYear()));
    }

    function init() {
        let dateTime = new Date();
        let el = document.getElementById("top-ten-date-value");
        // let utc = new Date(Date.UTC(dateTime.getFullYear(),
        //     dateTime.getMonth(),
        //     dateTime.getDate(),
        //     dateTime.getHours(),
        //     dateTime.getMinutes(),
        //     dateTime.getSeconds()));
        // let month = parseInt(utc.getMonth()) + 1;
        // let value = utc.getFullYear() + "-" + (month > 10 ? month : "0" + month.toString());
        // el.value = value;
        // getTopTen(parseInt(utc.getMonth()) + 1, parseInt(utc.getFullYear()));

        let month = parseInt(dateTime.getMonth()) + 1;
        let value = dateTime.getFullYear() + "-" + (month > 10 ? month : "0" + month.toString());
        el.value = value;
        getTopTen(parseInt(dateTime.getMonth()) + 1, parseInt(dateTime.getFullYear()));


    }

    return (
        <div>
            <div className='topTen'>
                <div className='topTen-chart' style={{ height: "400px", width: "400px" }}>
                    <div className='text-center text-muted fst-italic'>Top products chart</div>
                    {
                        topTen.length > 0 ?
                            <ResponsiveContainer width="100%" height="95%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={topTen}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    barSize={30}
                                >
                                    <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="rgb(33,37,41)" background={{ fill: '#eee' }} />
                                </BarChart>
                            </ResponsiveContainer>
                            : <div className='d-flex align-items-center justify-content-center' style={{height: "calc(100% - 24px)"}}>
                                <div>We don't have any data in this time!</div>
                            </div>
                    }
                </div>
                <div className='topTen-note'>
                    <div className='search-box'>
                        <input id="top-ten-date-value" type='month' max="2023"></input>
                        <span className="icon" onClick={filter}><FilterListIcon style={{ color: "white" }} /></span>
                    </div>
                    <div className='order-list' style={{ margin: "3px" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Top</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    topTen?.length > 0?
                                    topTen?.map((pro, index) => {
                                        return (
                                            <tr key={index + 1} style={{ color: "white" }}>
                                                <td className='nowrap-text'>{index + 1}</td>
                                                <td><img src={pro.productItem.productImages[0].url} width="50px"></img></td>
                                                <td style={{ textAlign: "left" }}>{executeFullNamForProductItem(pro.product, pro.productItem)}</td>
                                                <td>
                                                    <NavLink to={"/administrator/products/productItemsDetail/" + pro.productItem.id}><InfoIcon /></NavLink>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    : <tr>
                                        <td colSpan={4} className="p-2">We don't have any data in this time!</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TopTenProductItem;
