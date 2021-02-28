import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createSound } from '../Network/Sound'
import { useHistory } from 'react-router-dom'
import Load from '../Library/Load'
import './Sound.css'

function CreatePackage() {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const submit = () =>{
        setLoading(true)
        createSound(name,
            ()=>{
                setLoading(false);
                history.push("/sound");
            },
            (error)=>{
                setLoading(false);
                alert(error.message);
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
