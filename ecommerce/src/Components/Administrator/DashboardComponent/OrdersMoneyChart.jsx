import React, { PureComponent } from 'react';
import {useState, useEffect} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import DashboardService from '../../../Services/CommonService/DashboardService';

const OrdersMoneyChart = () => {

    const [data, setData] = useState();
    useEffect(()=>{
        DashboardService.getRevenue(2023).then(response => {
            let re = response.data;
            let data = [];
            for (let i = 1; i <= 12; i++) {
                data.push({ name: i });
            }
            re.forEach(d => {
                data[d.month - 1] = {
                    name: d.month,
                    Count: d.count,
                    Total: d.total,
                }
            })
            setData(data);
        })
    }, [])
    
    return (
        <div style={{ height: "300px" }}>
            Revenue 
            <ResponsiveContainer aspect={2/1} width="100%" >
                <LineChart
                    width={500}
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
                    <YAxis yAxisId="left"/>
                    <YAxis yAxisId="right" orientation='right'/>
                    <Tooltip />
                    <Legend />
                    <Line yAxisId = "left" type="monotone" dataKey="Total" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId = "right" type="monotone" dataKey="Count" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default OrdersMoneyChart;
