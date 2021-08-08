import { ListItemText, ListItem, List, Button,Input, Modal, makeStyles, FormControl } from '@material-ui/core';
import React,{useState} from 'react';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import firebase from 'firebase';
const useStyles = makeStyles((theme) => ({
    paper:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,3,4),
    },
}));

function Todoo(props) {
    const classes=useStyles();
    const [open, setOpen]= useState(false);
    const [input, setInput]=useState('');
    const handleOpen = () => {
        setOpen(true);
    } 
    const updateTodo =()=>{
        db.collection('todos').doc(props.todo.id).set({
            todo:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        },{merge: true})
        setOpen(false);
    }
    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>Edit</h1>
                <FormControl>
                    <Input value={input} onChange={event => setInput(event.target.value) }placeholder={props.todo.todo}></Input>
                </FormControl>
                <Button disabled={!input} variant="contained" color="primary" onClick={updateTodo}>UPDATE</Button>
            </div>
        </Modal>
        <List className="todo_list">
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary="deadline"></ListItemText>
            </ListItem>
            <Button variant="contained" color="primary" onClick={ e => setOpen(true)}>Edit</Button>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}></DeleteForeverIcon>
        </List>
        </>
    )
}

export default Todoo
