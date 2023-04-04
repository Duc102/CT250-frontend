import React, {useState, useEffect} from 'react';
import SiteUserLine from './SiteUserLine';

const SiteUserList = (props) => {
    const [siteUserList, setSiteUserList] = useState(props.siteUsers);

    useEffect(()=>{
        setSiteUserList(props.siteUsers);
    },[props])
    return (
        <div className='order-list'>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        siteUserList.length > 0?
                        siteUserList.map((siteUser, index) =>
                            <SiteUserLine key={index} no={index} siteUser={siteUser} />
                        )
                        :<tr>
                            <td colSpan={4} className="p-2">We don't have any site users like that</td>
                        </tr>
                    }
                </tbody>

            </table>

        </div>
    );
}

export default SiteUserList;
