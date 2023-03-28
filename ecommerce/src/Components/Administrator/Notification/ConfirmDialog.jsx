import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';

const ConfirmDialog = (props) => {

    const { confirmDialog, setConfirmDialog } = props;
    return (
        <Dialog open={confirmDialog.isOpen}>
            <DialogTitle className='text-center'>
                <WarningIcon fontSize='large'/>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6">
                    {confirmDialog.title} 
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle} 
                </Typography>
            </DialogContent>
            <DialogActions>
                
                <button className='btn btn-dark' onClick={()=> setConfirmDialog({...confirmDialog, isOpen: false})}>No</button>

                <button className="btn btn-danger" onClick={()=>{confirmDialog.commit(); setConfirmDialog({...confirmDialog, isOpen: false})}}>Yes</button>

            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
