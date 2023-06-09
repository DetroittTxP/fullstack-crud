import React,{useState} from 'react'
import { EditType } from '../interface/DataType'
import {Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';


export const Edit:React.FC<EditType> =({Maindata,UsersType,onRecieveEditData})=>{

    const navigate = useNavigate()

    const [edit,Setedit] = useState(UsersType);
  

    const onEdit =(e:React.ChangeEvent<HTMLInputElement>) =>{

        Setedit(prev => {
            return {
                ...prev,
                [e.target.id]:e.target.value
            }
        }) 
    }   

    const onSubmitUpdate = async (e:React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();

        await axios.put(`http://localhost:4444/edit/${edit.id}`,edit)
        .then(res => alert(res.data.STATUS))
        .catch(err => alert(err))

        const updatedItem = Maindata.map((prev) => {
             if(prev.id === edit.id){
                return {
                    ...prev,
                    user_name:edit.user_name,
                    user_id:edit.user_id,
                    user_password:edit.user_password,
                    user_email:edit.user_email,
                    user_tel:edit.user_tel
                }
             }
             return prev;
        })

        onRecieveEditData(updatedItem)
        navigate('/')
       
    }
    

    return(
        <Form onSubmit={onSubmitUpdate}>
        <h2>EDIT PAGE</h2>    
        <Form.Group controlId='user_name'>
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={onEdit} value={edit.user_name} type='text' style={{ width: 300 }} placeholder='input your name' />
        </Form.Group>

        <Form.Group controlId='user_id'>
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={onEdit}  value={edit.user_id} type='text' style={{ width: 300 }} placeholder='input username' />
        </Form.Group>

        <Form.Group controlId='user_password'>
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={onEdit}  value={edit.user_password}  type='password' style={{ width: 300 }} placeholder='input password' />
        </Form.Group>

        <Form.Group controlId='user_email'>
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={onEdit}  value={edit.user_email} type='email' style={{ width: 300 }} placeholder='input email' />
        </Form.Group>

        <Form.Group controlId='user_tel'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control onChange={onEdit}  value={edit.user_tel}  type='text' style={{ width: 300 }} placeholder='input tel-number' />
        </Form.Group>
        <br />
        <div >
            <Button type='submit'>SUBMIT</Button>
            <Button onClick={() => navigate('/')} style={{marginLeft:130}} type='submit'>BACK</Button>
        </div>
        

    </Form>

       
    )
} 