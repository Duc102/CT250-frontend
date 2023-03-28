import React, { useEffect, useState } from 'react';
import { Page, Text, Image, View, Document, StyleSheet, Font } from "@react-pdf/renderer"
import { executeFullNamForProductItem, calSum } from '../Execute';
import ProductService from '../../../Services/CommonService/ProductService';
const Bill = (props) => {
    const order = props.order;
    const [orders, setOrders] = useState(props.order);

    Font.register({family: "Poppins", fonts: [
        {
            src: "/Poppins-Bold.ttf",
            fontWeight: "bold"
        },
        {
            src: "/Poppins-Italic.ttf",
            fontStyle: "italic"
        }
    ]})
    useEffect(() => {
        let o = [];
        for (let i = 0; i < order.orderLines.length; i++) {
            ProductService.getProductByProductItemId(order.orderLines[i].productItem.id).then(res => {
                console.log(res.data);
                let or = { ...order.orderLines[i], product: res.data }
                o.push(or);
                if (i === order.orderLines.length - 1)
                    setOrders({ ...order, orderLines: o });
            });
        }
    }, []);

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
        },
        title: {
            fontFamily: "Poppins",
            fontWeight: "bold"
        },
        table: {
            border: "2px solid black",
            borderBottom: "none",
            marginTop: "10px",
            marginBottom: "10px"
        },
        logo: {
            position: "absolute",
            width: "100px"
        },
        header: {
            textAlign: "center",
            fontFamily: "Poppins",
            fontWeight: "bold"
        },
        nameCell: {
            width: "275px",
            paddingLeft: "10px",
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            flexGrow: 1
        },
        nameHeadCell: {
            width: "275px",
            textAlign: "center",
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            fontFamily: "Poppins",
            fontWeight: "bold",
            backgroundColor: '#E4E4E4',
            flexGrow: 1
        },
        cell: {
            flexGrow: 1,
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            textAlign: "center",
            width: "100px"
        },
        headCell: {
            flexGrow: 1,
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            textAlign: "center",
            fontFamily: "Poppins",
            fontWeight: "bold",
            backgroundColor: '#E4E4E4',
            width: "100px"
        },
        
        qtyCell: {
            flexGrow: 1,
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            textAlign: "center",
            width: "50px"
        },

        qtyHeadCell: {
            flexGrow: 1,
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            textAlign: "center",
            fontFamily: "Poppins",
            fontWeight: "bold",
            backgroundColor: '#E4E4E4',
            width: "50px"
        },
        row: {
            display: "flex",
            flexDirection: "row",
        },

        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    function processDate(dateTime) {
        let MonthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(dateTime);
        let result = date.getDate() + " " + MonthsOfYear[date.getMonth()] + " " + date.getFullYear();
        return result;
    }

    function processAddress(objAddress) {
        let fa = objAddress.firstAddressLine;
        let sa = objAddress.secondAddressLine;
        let city = objAddress.city;
        let country = objAddress.country.name;
        return fa + ", " + sa + ", " + city + ", " + country;
    }

    return (
        <Document>
            <Page size="A5" orientation='landscape' style={styles.page}>
                <View style={styles.section}>
                    <Image src="/logo.png" style={styles.logo}></Image>
                    <Text style={styles.header}>Bill</Text>
                    <Text style={{textAlign: "center", fontFamily: "Poppins" ,fontStyle: "italic"}}>Date: {processDate(new Date())}</Text>
                    <Text><Text style={styles.title}>User name: </Text>{orders.siteUser.name}</Text>
                    <Text><Text style={styles.title}>Email:</Text> {orders.siteUser.emailAddress}</Text>
                    <Text><Text style={styles.title}>Phone number:</Text> {orders.siteUser.phoneNumber}</Text>
                    <Text><Text style={styles.title}>Shiping Address:</Text> {processAddress(orders.shippingAddress)}</Text>
                    <Text><Text style={styles.title}>Order date</Text>: {processDate(orders.dateCreate)}</Text>
                    <Text><Text style={styles.title}>Order number:</Text> {orders.id}</Text>
                    <Text><Text style={styles.title}>Order Detail:</Text> </Text>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={{width: "30px", borderBottom: "2px solid black", textAlign: "center", fontFamily:"Poppins", fontWeight:"bold", backgroundColor: '#E4E4E4'}}>No.</Text>
                            <Text style={styles.nameHeadCell}>Name</Text>
                            <Text style={styles.qtyHeadCell}>Qty</Text>
                            <Text style={styles.headCell}>Price</Text>
                            <Text style={styles.headCell}>Sum</Text>
                        </View>
                        {
                            orders.orderLines.map((proLine, index) =>
                                <View key={index} style={styles.row}>
                                    <Text style={{width: "30px", borderBottom: "2px solid black", textAlign: "center"}}>{index + 1}</Text>
                                    {
                                        proLine.product ?
                                            <Text style={styles.nameCell}>{executeFullNamForProductItem(proLine.product, proLine.productItem)}</Text>
                                            : <Text style={styles.nameCell}>Product Name</Text>
                                    }
                                    <Text style={styles.qtyCell}>{proLine.qty}</Text>
                                    <Text style={styles.cell}>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(proLine.productItem.price)}</Text>
                                    <Text style={styles.cell}>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(calSum(proLine.productItem.price, proLine.qty))} </Text>
                                </View>)
                        }
                    </View>

                    <Text>
                        <Text style={styles.title}>Total :</Text> {Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(orders.orderTotal)}
                    </Text>
                </View>
            </Page>
        </Document>
    );
}

export default Bill;
