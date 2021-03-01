import React, { useState, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { createUser } from '../Network/User'
import { useHistory } from 'react-router-dom'
import { AlertContext } from '../Library/Alert'
import Load from '../Library/Load'
import './User.css'

function UserForm() {
    const history = useHistory();
    const alert = useContext(AlertContext);
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const submit = () =>{
        if(password === confirmPassword){
            setLoading(true);
            createUser(email, name, password,
                (data)=>{
                    setLoading(false)
                    alert.setMessages("สร้างบัญชีผู้ใช้แล้ว")
                    history.push('/user')
                },
                (error)=>{
                    alert(error.message)
                    setLoading(false)
                }
            )
        }else{
            setError("รหัสผ่านไม่ตรงกัน")
        }
    }

    return (
        <>
        {isLoading ? <Load/>: null}
        <div id="user">
           <h1>สร้างบัญชีผู้ใช้</h1>
           <Row>
               <Col xl={7}>
                    <Form 
                    className="form"
                    onSubmit={(e)=>{
                        e.preventDefault()
                        submit()
                    }}
                    >
                        <Form.Group>
                            <Form.Label>ชื่อ</Form.Label>
                            <Form.Control
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>อีเมล</Form.Label>
                            <Form.Control
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            type="email"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>รหัสผ่าน</Form.Label>
                            <Form.Control
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                            type="password"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                            <Form.Control
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            required
                            type="password"
                            />
                        </Form.Group>
                        <div className="error-text">
                            {error}
                        </div>
                        <Button className="submit-button" type="submit">
                            สร้างบัญชีผู้ใช้
                        </Button>
                    </Form>
                </Col>
           </Row>
        </div>
        </>
    )
}

export default UserForm
