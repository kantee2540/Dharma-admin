import React, { useState, useContext } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createSound } from '../Network/Sound'
import { useHistory } from 'react-router-dom'
import { AlertContext } from '../Library/Alert'
import Load from '../Library/Load'
import './Sound.css'

function CreatePackage() {
    const alert = useContext(AlertContext)
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const submit = () =>{
        setLoading(true)
        createSound(name,
            ()=>{
                setLoading(false);
                alert.setMessages("สร้างชุดไฟล์เสียงแล้ว", "SUCCESS")
                history.push("/sound");
            },
            (error)=>{
                setLoading(false);
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
            })
    }

    return (
        <>
        {isLoading ? <Load/>: null}
        <div id="sound">
            <h1>สร้างชุดเสียง</h1>
            <Row style={{marginTop: 30}}>
                <Col xl={7}>
                    <Form
                    onSubmit={(e)=>{
                        e.preventDefault();
                        submit();
                    }}>
                        <Form.Group>
                            <Form.Label>ชื่อชุดเสียง</Form.Label>
                            <Form.Control
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            placeholder="ตัวอย่าง 'ธรรมมะสวัสดี' "/>
                            <Button 
                            type="submit"
                            className="submit-button">
                                สร้างชุดเสียง
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default CreatePackage
