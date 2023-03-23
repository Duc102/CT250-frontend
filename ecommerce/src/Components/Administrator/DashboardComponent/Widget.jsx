import { KeyboardArrowUp, MonetizationOnOutlined, Person, PersonOutline } from '@mui/icons-material';
import React from 'react';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

const Widget = (props) => {

    let data;
    switch (props.goal) {
        case "user":
            console.log("this is user");
            data = {
                title: "Users",
                isMoney: false,
                link: "See all users",
                icon: <Person className='widget-icon' />
            };
            break;
        case "order":
            data = {
                title: "Today's Orders",
                isMoney: false,
                link: "See all orders",
                icon: <ListAltRoundedIcon className='widget-icon' />
            };
            break;
        case "earning":
            data = {
                title: "Today's Earning",
                isMoney: true,
                link: "Show more",
                icon: <MonetizationOnOutlined className='widget-icon text-success' />
            };
            break;
        default:
            break;
    }
    return (
        <div className='widget'>
            <div className='left'>
                <span className='widget-title'>{data.title}</span>
                <span className={data.isMoney?"counter text-success":"counter"}>
                    {
                        data.isMoney?
                        Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(props.counter)
                        :props.counter
                    }                   
                </span>
                <span className="widget-link text-muted">{data.link}</span>
            </div>
            <div className="right">
                <div className='percentage'>
                    <KeyboardArrowUp />
                    20%
                </div>
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;
