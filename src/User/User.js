import React, { useEffect, useState, useContext } from 'react'
import './User.css'
import { Modal, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { listUser, editUser } from '../Network/User'
import { Link } from 'react-router-dom'
import { AlertContext } from '../Library/Alert'
import Load from '../Library/Load'

function User() {
    const alert = useContext(AlertContext);
    const [isLoading, setLoading] = useState(false);
    const [isUserShow, setUserShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState({name: '', email: '', userId: ''});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [items, setItems] = useState([]);
    const [isModalLoad, setModalLoad] = useState(false);

    const fetchData = () =>{
        setLoading(true);
        listUser(
            (data)=>{
                setLoading(false)
                setItems(data);
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
            }
        )
    }

    const editUserRequest = (callback) =>{
        editUser(email, name, selectedUser.userId,
            (data)=>{
                callback(data)
                alert.setMessages("แก้ไขข้อมูลผู้ใช้งานสำเร็จ", "SUCCESS")
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
                setModalLoad(false)
            }
        )
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        { isLoading ? <Load/>: null }
        <div id="user">
           <h1>บัญชีผู้ใช้ในการดูแลระบบ</h1>
           <div id="user-item-container">
               <Link className="create-user-button" to="/user/create">
                   <i className="fas fa-plus" style={{marginRight: 15}}></i>
                   สร้างบัญชีผู้ใช้
               </Link>
               <Row>
               { items.map((item, key)=>
                <Col key={key} lg={6} xl={4}>
                    <UserItem 
                    name={item.name} 
                    email={item.email}
                    onClick={()=>{
                        setSelectedUser({
                            name: item.name,
                            email: item.email,
                            userId: item.user_id
                        })
                        setName(item.name)
                        setEmail(item.email)
                        setUserShow(true)
                    }}
                    />
                </Col>
               )}               
                </Row>
           </div>
           <Modal show={isUserShow} onHide={()=>setUserShow(false)}>
               <Modal.Header closeButton>
                    <Modal.Title>ข้อมูลผู้ใช้</Modal.Title>
                </Modal.Header>
               <Modal.Body>
                   <Form
                   onSubmit={(e)=>{
                       setModalLoad(true)
                       e.preventDefault();
                       editUserRequest(
                           ()=>{
                               setModalLoad(false)
                               setUserShow(false)
                               fetchData()
                           }
                       )
                   }}>
                   <Form.Group>
                       <Form.Label>ชื่อ</Form.Label>
                       <Form.Control 
                       value={name}
                       onChange={(e)=>setName(e.target.value)}
                       />
                   </Form.Group>
                   <Form.Group>
                       <Form.Label>อีเมล</Form.Label>
                       <Form.Control 
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                       />
                   </Form.Group>
                   <div style={{marginTop: 30}}>
                        { isModalLoad ? 
                        <Alert variant="primary">
                            กำลังส่งข้อมูล..
                        </Alert> : null}
                        <Button 
                        type="submit"
                        style={{width: '100%'}}>
                            แก้ไขข้อมูล
                            </Button>
                        </div>
                   </Form>
               </Modal.Body>
           </Modal>
           
        </div>
        </>
    )
}

function UserItem(props){
    return(
        <div className="user-item" onClick={props.onClick}>
            <div className="user-icon">
                <i className="fas fa-user-circle"></i>
            </div>
            <div>
               <div className="user-title">
                    <b>{props.name}</b>
                </div>
                <div className="user-email">
                    {props.email}
                </div> 
            </div>
            
            
        </div>
    )
}

export default User
