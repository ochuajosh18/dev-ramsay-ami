import React from 'react'
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from 'react-redux';
import { deleteTopPost } from '../../../store/top-posts/actions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const DeleteButton = (topPost:any) => {
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <>
            <Button
                color='error'
                sx={{ paddingX: 0 }}
                onClick={handleClickOpen}
                >
                <DeleteIcon fontSize='small' />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {`Are you sure you want to delete "${topPost.topPostTitle}"`}
                </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                <Button 
                    onClick={handleClose} 
                    variant='contained'
                    sx={{
                        color: "white",
                        height: "100%",
                        ml: 2,
                        bgcolor: "#343A40",
                    }}
                >
                    Cancel
                </Button>
                <Button color='error' onClick={() => dispatch(deleteTopPost(topPost.topPostId))} autoFocus>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteButton
