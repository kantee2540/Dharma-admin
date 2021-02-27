import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { listSound } from '../Network/Sound'
import { baseResource } from '../Network/Config'
import Load from '../Library/Load'
import './Sound.css'

function Sound() {
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () =>{
        setLoading(true)
        listSound(
            (data)=>{
                setLoading(false);
                setItems(data);
            },
            (error)=>{
                setLoading(false);
                alert(error);
            }
        )
    }

    return (
        <>
        {isLoading ? <Load/>: null}
        <div id="sound">
            <h1>ฟังเสียง</h1>
            <div id="sound-container">
                <div className="create-sound-button">
                   <i className="fas fa-plus" style={{marginRight: 15}}></i>
                   สร้างชุดเสียง
               </div>
               <div>
                   <Row>
                   { items.map((item, key)=>
                    <Col lg={6} xl={4} key={key}>
                        <SoundItem
                        title={item.sound_package_name}
                        imageUri={baseResource+ "/" + item.sound_package_folder + "/" + item.package_image}
                        />
                    </Col>
                    
                   )}
                   </Row>
               </div>
            </div>
        </div>
        </>
    )
}

function SoundItem(props){
    return(
        <div className="sound-item">
            <div className="sound-img-container">
                <img src={props.imageUri} className="sound-img"/>
            </div>
            <div className="sound-item-detail">{props.title}</div>
        </div>
    )
}

export default Sound
