import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const AlertNote = (props) => {
    const {notify, setNotify} = props;
    return (
        <div>
            <Snackbar
                open={notify.isOpen}
                autoHideDuration={3000}
                onClose={()=> setNotify({...notify, isOpen: false})}
                anchorOrigin={{horizontal: "right", vertical: "top"}}
            >
                <Alert variant='filled' severity={notify.type} onClose={()=> setNotify({...notify, isOpen: false})}>
                    {notify.message}
                </Alert>
            </Snackbar>

        </div>
    );
}

export default AlertNote;
