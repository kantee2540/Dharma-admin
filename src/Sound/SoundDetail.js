import React, { useState, useEffect, useContext } from 'react'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import { soundDetail, uploadFileCover, updateName, uploadSound, deleteSoundFile, deletePackage } from '../Network/Sound'
import { baseResource } from '../Network/Config'
import { AlertContext } from '../Library/Alert'
import dayjs from 'dayjs'
import Load from '../Library/Load'
import DefaultImage from '../assets/images/default_image.png'
import './Sound.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

function SoundDetail() {
    let { soundId } = useParams()
    const history = useHistory();
    const alert = useContext(AlertContext);
    const [isLoading, setLoading] = useState(false);
    const [detail, setDetail] = useState({package_image: '', sound_package_name: ''});
    const [name, setName] = useState('');
    const [selectedImage, setImage] = useState(null);
    const [selectedSound, setSound] = useState(null);
    const [data, setData] = useState([]);
    const currentPath = baseResource+ "/" + detail.sound_package_folder + "/"
    const currentImage = detail.sound_package_folder !== undefined ? currentPath + detail.package_image : DefaultImage

    const fetchData = () =>{
        setLoading(true)
        soundDetail(soundId,
            (data)=>{
                setDetail(data);
                if(data.sound_package_name !== undefined){
                    setData(data.data);
                    setName(data.sound_package_name)
                    setLoading(false)
                }else{
                    setLoading(false)
                }
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
                setLoading(false)
            })
    }

    const uploadImage = () =>{
        setLoading(true)
        uploadFileCover(detail.id, selectedImage,
            ()=>{
                setImage(null);
                alert.setMessages("เปลี่ยนปกชุดไฟล์เสียงสำเร็จ", 'SUCCESS')
                fetchData();
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
                setLoading(false)
            })
    }

    const updatePackageName = () =>{
        setLoading(true)
        updateName(detail.id, name,
            ()=>{
                fetchData();
                alert.setMessages("เปลี่ยนชื่อชุดไฟล์เสียงสำเร็จ", 'SUCCESS')
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
                setLoading(false)
            }
        )
    }

    const uploadSoundFile = () =>{
        setLoading(true)
        uploadSound(detail.id, selectedSound,
            ()=>{
                fetchData()
                alert.setMessages("อัพโหลดไฟล์เสียงสำเร็จ", 'SUCCESS')
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
                setLoading(false)
            }
        )
    }

    const deleteFile = (soundId) =>{
        setLoading(true)
        deleteSoundFile(detail.id, soundId,
            ()=>{
                fetchData()
                alert.setMessages("ลบไฟล์เสียงแล้ว", 'SUCCESS')
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
                setLoading(false)
            }
        )
    }

    const deleteSoundPackage = () =>{
        setLoading(true)
        deletePackage(detail.id,
            ()=>{
                history.push("/sound");
                alert.setMessages("ลบชุดไฟล์เสียงสำเร็จ", 'SUCCESS')
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
                setLoading(false)
            })
    }

    useEffect(() =>{ 
        fetchData() 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    return (
        <>
        {isLoading ? <Load/>:null}
        { detail.sound_package_name !== undefined ?
        <div id="sound">
            <h3>{detail.sound_package_name}</h3>
            <div>
                วันที่เผยแพร่ : {dayjs(detail.created_at).format("D MMMM BBBB")}
            </div>
            <hr className="break-line"/>
                <div className="sound-title"><b>แก้ไขชื่อชุดไฟล์เสียง</b></div>
                <Form onSubmit={(e)=>{
                    e.preventDefault()
                    updatePackageName()
                }}>
                    <Form.Control
                    value={name}
                    required
                    onChange={(e)=>setName(e.target.value)}
                    />
                    <Button 
                    type="submit"
                    style={{marginTop: 20}}>
                        แก้ไขชื่อ
                    </Button>
                </Form>
            <hr className="break-line"/>
            <div>
                <div className="sound-title"><b>รูปปกของชุดเสียง</b></div>
                { detail.package_image !== null ?
                <a href={currentImage} target="_blank" rel="noreferrer noopener">
                    <img 
                    className="cover-image"
                    src={currentImage}
                    alt='previewimage'/>
                </a>
                : null
                }
                <div className="select-image">
                    <Form 
                    style={{display: 'flex'}}
                    onSubmit={(e)=>{
                        e.preventDefault();
                        uploadImage()
                    }}>
                        <Row style={{width:'100%'}}>
                            <Col xs={6} md={8} lg={9}>
                                <Form.File 
                                style={{width:'100%'}} 
                                className="custom-file-upload"
                                accept=".jpg,.jpeg,.png"
                                onChange={(e)=>{
                                    setImage(e.target.files[0])
                                }}
                                required/>
                            </Col>
                            <Col xs={6} md={4} lg={3}>
                                <Button type="submit">อัพโหลดรูป</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                
            </div>
            <hr className="break-line"/>
            <div>
                <div className="sound-title"><b>ไฟล์เสียงทั้งหมด</b></div>
                <Form 
                style={{display: 'flex', width: '100%', marginBottom: 30}}
                onSubmit={(e)=>{
                    e.preventDefault();
                    uploadSoundFile();
                }}>
                    <Row style={{width:'100%'}}>
                        <Col xs={6} md={8} lg={9}>
                            <Form.File 
                            style={{width:'100%'}} 
                            multiple
                            className="custom-file-upload"
                            onChange={(e)=>{
                                setSound(e.target.files)
                                
                            }}
                            required/>
                        </Col>
                        <Col xs={6} md={4} lg={3} style={{textAlign: 'right'}}>
                            <Button type="submit">อัพโหลดเสียง</Button>
                        </Col>
                    </Row>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ไฟล์</th>
                            <th>วันที่เผยแพร่</th>
                            <th>ตัวอย่าง</th>
                            <th>ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((item, key)=>
                        <tr key={key}>
                            <td>{key+1}</td>
                            <td>{item.sound_file}</td>
                            <td>
                                {dayjs(item.created_at).format("D MMMM BBBB")}
                            </td>
                            <td>
                                <a 
                                href={currentPath + item.sound_file} 
                                className="preview_button"
                                target="_blank"
                                rel="noreferrer noopener">
                                    <FontAwesomeIcon icon={faPlayCircle}/>
                                </a>
                            </td>
                            <td>
                                <div
                                className="delete_button"
                                onClick={()=>{
                                    if(window.confirm("ต้องการลบไฟล์เสียงนี้หรือไม่")){
                                        deleteFile(item.sound_id)
                                    }else{ }
                                }}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </div>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <hr className="break-line"/>
            <div>
                <div className="sound-title"><b>ลบชุดไฟล์เสียงนี้</b></div>
                <div>ไฟล์เสียงทั้งหมดจะถูกลบ และไม่สามารถกู้คืนได้</div>
                <Button 
                variant="danger" 
                style={{marginTop: 20}}
                onClick={()=>{
                    if(window.confirm("ต้องการจะลบชุดไฟล์เสียงนี้เลยหรือไม่ ไฟล์เสียงทั้งหมดจะถูกลบออกจากระบบ")){
                        deleteSoundPackage()
                    }else {}
                }}>
                    ลบชุดไฟล์เสียง
                </Button>
            </div>
        </div>
        :
        <div id="sound" className="not-found">
            <div className="not-found-icon">
                <i className="fas fa-question-circle"></i>
            </div>
            <div className="not-found-title">ไม่พบชุดไฟล์เสียง</div>
            <div>ชุดไฟล์เสียงนี้ถูกลบแล้วหรือไม่เจอในระบบ</div>
        </div>
        }
        </>
    )
}

export default SoundDetail
