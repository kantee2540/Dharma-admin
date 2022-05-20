import React, { useState, useEffect, useContext } from 'react'
import SunEditor from 'suneditor-react';
import './About.css'
import 'suneditor/dist/css/suneditor.min.css';
import { Button } from 'react-bootstrap';
import { getAbout, editAbout } from '../Network/About'
import { AlertContext } from '../Library/Alert'
import Loading from '../Library/Load'

function About() {
	const [isLoading, setIsLoading] = useState(false)
	const [prevAbout, setPrevAbout] = useState("")
	const [about, setAbout] = useState("")
	const alert = useContext(AlertContext);

	const fetchAbout = () => {
		setIsLoading(true)
		getAbout()
		.then((data) => {
			setAbout(data.about_content)
			setPrevAbout(data.about_content)
			setIsLoading(false)
		})
		.catch((error) => {
			window.alert(error.message)
			setIsLoading(false)
		})
	}

	function onSubmit() {
		setIsLoading(true)
		editAbout(about)
		.then(()=>{
			setIsLoading(false)
			alert.setMessages("แก้ไขข้อมูลเกี่ยวกับเว็บไซต์นี้สำเร็จ", "SUCCESS")
			fetchAbout()
		})
		.catch((error)=>{
			alert.setMessages("เกิดข้อผิดพลาดบางอย่าง", "ERROR")
			setIsLoading(false)
		})
	}

	function onDiscard(){
		setAbout(prevAbout)
	}

	useEffect(()=>{
		fetchAbout()
	},[])

	

    return (
        <div id="about">
			{ isLoading ? <Loading/> : null }
            <h1>แก้ไขหน้าเกี่ยวกับ</h1>
			<div className='editor'>
				<SunEditor
				setOptions={{
					buttonList: [
						['undo', 'redo'],
						['bold', 'underline', 'italic', 'strike'],
                		['fontSize', 'formatBlock']
					],
					height:450
				}}
				setContents={about}
				onChange={setAbout}
				/>
			</div>
			<hr/>
            <Button 
			onClick={onSubmit}
			style={{ marginRight: 8 }}>
				บันทึกความเปลี่ยนแปลง
			</Button>
			<Button 
			onClick={onDiscard} 
			disabled={about === prevAbout ? true : false}
			variant="secondary">
				ยกเลิก
			</Button>
        </div>
    )
}

export default About
