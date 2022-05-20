import React, { useState, useEffect, useRef, useContext } from 'react'
import './Cover.css'
import { Row, Col } from 'react-bootstrap'
import { listCover, uploadCover, updateDefaultCover, deleteImageCover } from '../Network/Cover'
import { baseResource } from '../Network/Config'
import Load from '../Library/Load'
import { AlertContext } from '../Library/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

function Cover() {
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const fileInput = useRef(null);
    const alert = useContext(AlertContext);

    const fetchData = () =>{
        setLoading(true);
        listCover(
            (data)=>{
                setItems(data)
                setLoading(false)
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
            }
        )
    }

    const handlerClick = (e) =>{
        fileInput.current.click();
    }

    const fileInputChange = (e) =>{
        let file = e.target.files[0]
        uploadCover(file,
            ()=>{
                fetchData()
                alert.setMessages("อัพโหลดรูปภาพสำเร็จ", "SUCCESS")
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
            }
        )
    }

    const selectImage = (coverId) =>{
        updateDefaultCover(coverId,
            ()=>{
                fetchData()
                alert.setMessages("เลือกรูปนี้เป็นค่าเริ่มต้นแล้ว", "SUCCESS")
            },
            (error)=>{
                alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
            })
    }

    const deleteImage = (coverId) =>{
        if(window.confirm("ต้องการลบรูปภาพหรือไม่ หากลบแล้วไม่สามารถกู้คืนได้")){
            deleteImageCover(coverId,
                ()=>{
                    fetchData()
                    alert.setMessages("ลบรูปภาพแล้ว", "SUCCESS")
                },
                (error)=>{
                    alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
                }
            )
        }else { }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        {isLoading ? <Load/> : null}
        <div id="cover">
            <h1>ปกหน้าแรก</h1>
            <div>เลือกรูปที่ต้องการให้แสดงในหน้าแรก โดยคลิกรูปภาพที่ต้องการแสดง</div>
            <div style={{marginTop: 20}}>
                <input type="file" 
                ref={fileInput} 
                onChange={fileInputChange}
                hidden/>
                <div className="upload-button" onClick={handlerClick}>
                   <FontAwesomeIcon icon={faPlusCircle} style={{marginRight: 15}}/>
                   อัพโหลดรูป
               </div>
            </div>
            <Row style={{marginTop: 30}}>
                { items.map((item, key)=>
                <Col key={key} xs={6} md={6} lg={4}>
                    <PictureItem
                    isSelected={item.is_selected}
                    image_url={baseResource+"/home_cover/"+item.cover_file}
                    onClick={()=>selectImage(item.cover_id)}
                    onClickDelete={()=>deleteImage(item.cover_id)}
                    alt={item.cover_file}
                    />
                </Col>
                )}
            </Row>
        </div>
        </>
    )
}

function PictureItem(props){
    return(
        <div 
        className="picture-item">
            <div className={"select-button " + (props.isSelected === 1 ? "selected": "unselect")}
            onClick={props.onClick}>
                { props.isSelected === 1 ? <FontAwesomeIcon icon={faCheck}/> : null}
            </div>
            { props.isSelected !== 1 ?
            <div className="delete-button unselect"
            onClick={props.onClickDelete}>
                <FontAwesomeIcon icon={faTrash}/>
            </div> : null
            }
            <div onClick={props.onClick}>
                <img src={props.image_url} className="pic-img" alt={props.alt}/>
            </div>
           
        </div>
    )
}

export default Cover
