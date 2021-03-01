import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory, Redirect } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import Load from '../Library/Load'
import './Auth.css'

import logo from '../assets/images/logo.png'

function Login() {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () =>{
        if(username !== '' && password !== ''){
            setLoading(true);
            authContext.signin(username, password,
                ()=>{
                    setLoading(false);
                    history.push('/');
                },
                (error)=>{
                    setLoading(false);
                    setError(error)
                });
            
        }else{
            setError("กรุณากรอกข้อมูลให้ครบ");
        }
    }

    return (
        <>
        { isLoading ? <Load/> : "" }
        { authContext.getToken() !== null ? <Redirect to="/"/> : null }
        <div className="container">
            <div id="login">
                <div className="img-container">
                    <img src={logo} className="main-logo" alt="Logo"/>
                </div>
                
                <Form 
                onSubmit={(e)=>{
                    e.preventDefault();
                    submit();
                }}>
                    <Form.Group>
                        <Form.Label>อีเมล</Form.Label>
                        <Form.Control 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>รหัสผ่าน</Form.Label>
                        <Form.Control 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"/>
                    </Form.Group>
                    { error !== null ?
                        <Form.Label className="error-text">
                            {error}
                        </Form.Label> : null
                    }
                    <Button 
                    type="submit"
                    style={{width: '100%', marginTop: 10}} 
                    >
                        ลงชื่อเข้าใช้
                    </Button>
                </Form>
            </div>
            <div className="bottom-view">
                ระบบจัดการเว็บไซต์ <a href="http://xn--12ca1b1ad6at4bbyx3hva0b9qja8g.com/" target="_blank">พระไตรปิฎกใกล้ตัว.com</a><br/>
                สงวนลิขสิทธิ์ 2564
            </div>
        </div>
        </>
    )
}

export default Login
