import React, { PureComponent } from 'react';
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import DashboardService from '../../../Services/CommonService/DashboardService';
import FilterListIcon from '@mui/icons-material/FilterList';

const OrdersMoneyChart = () => {

    const [data, setData] = useState();
    const [maxMin, setMaxMin] = useState({
        countMax: 0,
        countMaxMonth: 0,
        countMin: 0,
        countMinMonth: 0,
        moneyMax: 0,
        moneyMaxMonth: 0,
        moneyMin: 0,
        moneyMinMonth: 0,
    })
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    useEffect(() => {
        init();
    }, [])

    function filter() {
        let date = document.getElementById("revenue-date-value").value;
        let dateTime = new Date(date);
        let utc = new Date(Date.UTC(dateTime.getFullYear(),
            dateTime.getMonth(),
            dateTime.getDate(),
            dateTime.getHours(),
            dateTime.getMinutes(),
            dateTime.getSeconds()));
        getRevenue(utc.getFullYear());
    }

    function init() {
        let dateTime = new Date();
        let el = document.getElementById("revenue-date-value");
        let utc = new Date(Date.UTC(dateTime.getFullYear(),
            dateTime.getMonth(),
            dateTime.getDate(),
            dateTime.getHours(),
            dateTime.getMinutes(),
            dateTime.getSeconds()));
        let value = utc.getFullYear();
        el.value = value;
        getRevenue(utc.getFullYear());
    }

    function getRevenue(year) {
        DashboardService.getRevenue(year).then(response => {
            let re = response.data;
            if (re.length > 0) {
                let data = [];
                let mm = {
                    countMax: 0,
                    countMaxMonth: 1,
                    countMin: 0,
                    countMinMonth: 1,
                    moneyMax: 0,
                    moneyMaxMonth: 1,
                    moneyMin: 0,
                    moneyMinMonth: 1,
                };
                for (let i = 1; i <= 12; i++) {
                    data.push({ name: i });
                }
                re.forEach(d => {
                    data[d.month - 1] = {
                        name: d.month,
                        Count: d.count,
                        Total: d.total,
                    }
                    if (d.count > mm.countMax) {
                        mm.countMax = d.count;
                        mm.countMaxMonth = d.month;
                    }
                    if (d.count <= mm.countMin) {
                        mm.countMin = d.count;
                        mm.countMinMonth = d.month;
                    }

                    if (d.total > mm.moneyMax) {
                        mm.moneyMax = d.total;
                        mm.moneyMaxMonth = d.month;
                    }

                    if (d.total <= mm.moneyMin) {
                        mm.moneyMin = d.total;
                        mm.moneyMinMonth = d.month;
                    }
                })
                let month = re[0].month - 1;
                for(let i = 0; i < month; i++){
                    data[i].Count = 0;
                    data[i].Total = 0;
                }
                setData(data);
                setMaxMin(mm);
            } else {
                setMaxMin({ ...maxMin, countMaxMonth: 0 });
            }
        });
    }
    return (
        <div>

            <div className='revenue'>
                <div className="revenue-chart" style={{ width: "450px", height: "400px" }}>
                    <div className='text-center text-muted fst-italic'>Revenue Chart</div>
                    {
                        maxMin.countMaxMonth > 0 ?
                            <ResponsiveContainer height="93%" width="100%" >
                                <LineChart
                                    width={450}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation='right' />
                                    <Tooltip />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="Total" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                    <Line yAxisId="right" type="monotone" dataKey="Count" stroke="rgb(33,37,41)" />
                                </LineChart>
                            </ResponsiveContainer>
                            : <div className='d-flex align-items-center justify-content-center' style={{ height: "calc(100% - 24px)" }}>
                                <div>We don't have any data in this time!</div>
                            </div>
                    }
                </div>
                <div className='revenue-note'>
                    <div>
                        <div className='search-box'>
                            <input id="revenue-date-value" type='number' min="1970" max="2023"></input>
                            <span className="icon" onClick={filter}><FilterListIcon style={{ color: "white" }} /></span>
                        </div>
                    </div>
                    <div className="order-list" style={{ margin: "3px" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Total</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    maxMin.countMaxMonth > 0 ?
                                        <>
                                            <tr>
                                                <th>Min</th>
                                                <td>
                                                    <span className='price-color'>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(maxMin.moneyMin)} </span>
                                                    in {month[maxMin.moneyMinMonth - 1]}
                                                </td>
                                                <td>{maxMin.countMin} products in {month[maxMin.countMinMonth - 1]}</td>
                                            </tr>
                                            <tr name="last-row-th">
                                                <th name="last-th">Max</th>
                                                <td>
                                                    <span className='price-color'>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(maxMin.moneyMax)} </span>
                                                    in {month[maxMin.moneyMaxMonth - 1]}
                                                </td>
                                                <td>{maxMin.countMax} products in {month[maxMin.countMaxMonth - 1]}</td>
                                            </tr>
                                        </>
                                        : <tr>
                                            <td colSpan={4} rowSpan={2} className="p-2">We don't have any data in this time!</td>
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

export default OrdersMoneyChart;
