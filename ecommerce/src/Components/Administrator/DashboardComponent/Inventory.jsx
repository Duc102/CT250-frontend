import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import "./Dashboard.css"
import DashboardService from '../../../Services/CommonService/DashboardService';
const Inventory = () => {

    const [data, setData] = useState([{ name: 'Sold', value: 50 },
    { name: 'Inventory', value: 50 }]);

    useEffect(() => {
        DashboardService.getInventroy().then(res => {
            console.log(res.data);
            let d = [];
            d.push({ name: "Sold", value: res.data.sold });
            d.push({ name: "Inventory", value: res.data.inventory });
            setData(d);
        });
    }, []);

    const COLORS = ['rgb(0, 255, 0)', 'red'];
    return (
        <div>
            <div className='inventory'>
                <div className="inventory-chart" style={{ width: "410px", height: "410px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                startAngle={90}
                                endAngle={-270}
                                cx="50%"
                                cy="50%"
                                labelLine
                                label
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='inventory-note'>
                    <div className='order-list' style={{ margin: "3px" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Note</th>
                                    <th>Qty</th>
                                    <th>Percent</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        <span style={{ display: "inline-block", width: "15px", height: "15px", borderRadius: "7px", backgroundColor: "rgb(0, 255, 0)" }}></span>
                                    </td>
                                    <td className='p-2' style={{ textAlign: "left" }}>Sold</td>
                                    <td>{data[0].value} product items</td>
                                    <td>{Math.round(data[0].value / (data[0].value + data[1].value)  * 1000) / 10}%</td>
                                </tr>

                                <tr>
                                    <td>
                                        <span style={{ display: "inline-block", width: "15px", height: "15px", borderRadius: "7px", backgroundColor: "red" }}></span>
                                    </td>
                                    <td className='p-2' style={{ textAlign: "left" }}>Inventory</td>
                                    <td>{data[1].value} product items</td>
                                    <td>{Math.round(data[1].value / (data[0].value + data[1].value) * 1000) / 10}%</td>
                                </tr>

                                <tr>
                                    <td>
                                        <span style={{ display: "inline-block", width: "15px", height: "15px", borderRadius: "7px", backgroundImage: "linear-gradient(to right, red 50%, rgb(0, 255, 0) 50%)" }}></span>
                                    </td>
                                    <td className='p-2' style={{ textAlign: "left" }}>All</td>
                                    <td>{data[0].value + data[1].value} product items</td>
                                    <td>100%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inventory;
