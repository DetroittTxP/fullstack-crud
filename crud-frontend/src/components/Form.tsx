import React, { useState, FC } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormFuncType } from '../interface/DataType'
import axios from 'axios'
export const CrudForm: FC<FormFuncType> = ({ onClickSubmit }) => {

    const [FormData, SetFormData] = useState({
        id: Math.floor(Math.random() * 999999),
        user_name: '',
        user_id: '',
        user_password: '',
        user_email: '',
        user_tel: ''
    })

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {

        SetFormData((prev) => {
            return {
                ...prev, [event.target.id]: event.target.value
            }
        })

    }

    const onSubmitForm =  async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        await axios.post('http://localhost:4444/insert',{FormData})
        .then(res => {
           alert('INSERT DATA SUCCESSS')
        })
        .catch(err => {
           alert(err)
        })


        SetFormData(prev => {
            return {
                ...prev,
                id: Math.floor(Math.random() * 999999) 
            }
        })
        onClickSubmit(FormData)
    }

    return (
        <Form onSubmit={onSubmitForm}>
            <Form.Group controlId='user_name'>
                <Form.Label>Name</Form.Label>
                <Form.Control required onChange={onChangeInput} type='text' style={{ width: 300 }} placeholder='input your name' />
            </Form.Group>

            <Form.Group controlId='user_id'>
                <Form.Label>Username</Form.Label>
                <Form.Control required onChange={onChangeInput} type='text' style={{ width: 300 }} placeholder='input username' />
            </Form.Group>

            <Form.Group controlId='user_password'>
                <Form.Label>Password</Form.Label>
                <Form.Control required onChange={onChangeInput} type='password' style={{ width: 300 }} placeholder='input password' />
            </Form.Group>

            <Form.Group controlId='user_email'>
                <Form.Label>Email</Form.Label>
                <Form.Control required onChange={onChangeInput} type='email' style={{ width: 300 }} placeholder='input email' />
            </Form.Group>

            <Form.Group controlId='user_tel'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control required onChange={onChangeInput} type='text' style={{ width: 300 }} placeholder='input tel-number' />
            </Form.Group>
            <br />
            <Button type='submit'>ADD USERS</Button>
        </Form>
    )
}