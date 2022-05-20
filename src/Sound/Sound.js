import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { listSound } from '../Network/Sound'
import { baseResource } from '../Network/Config'
import { Link } from 'react-router-dom'
import Load from '../Library/Load'
import Default from '../assets/images/default_image.png'
import './Sound.css'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

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
                <Link className="create-sound-button" to="/sound/create">
                    <FontAwesomeIcon icon={faPlusCircle} style={{marginRight: 15}}/>
                   สร้างชุดเสียง
               </Link>
               <div>
                   <Row>
                   { items.map((item, key)=>
                    <Col lg={6} xl={4} key={key}>
                        <SoundItem
                        title={item.sound_package_name}
                        imageUri={item.package_image !== null ?
                            baseResource+ "/" + item.sound_package_folder + "/" + item.package_image : null}
                        to={"/sound/"+item.id}
                        date={item.created_at}
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
    let date = dayjs(props.date).format("D MMMM BBBB")
    return(
        <Link className="sound-item" to={props.to}>
            <div className="sound-img-container">
                <img src={props.imageUri !== null ? props.imageUri : Default} 
                className="sound-img"
                alt={props.title}/>
            </div>
            <div className="sound-item-detail">
                <div className="sound-text">{props.title}</div>
                <div className="sound-date">{date}</div>
            </div>
            
        </Link>
    )
}

export default Sound
