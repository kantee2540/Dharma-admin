import React from 'react'
import './Home.css'

function Home() {

    return (
        <div id="home">
            <h1>ยินดีต้อนรับครับ</h1>
            <div id="content" style={{marginTop: 30}}>
                เว็บจัดการเว็บไซต์
                <a href="http://xn--12ca1b1ad6at4bbyx3hva0b9qja8g.com/" target="_blank">พระไตรปิฎกใกล้ตัว.com</a>
                แบบใหม่ หากจะจัดการส่วนต่าง ๆ ของเว็บสามารถเข้าถึงได้จากแถบเมนูด้านข้าง
                <div style={{marginTop: 30}}>
                    <b>มีอะไรใหม่บ้าง</b>
                    <ul>
                        <li>สามารถอัพโหลดไฟล์เสียงได้หลายไฟล์ในทีเดียว</li>
                        <li>สามารถเปลี่ยนปกที่หน้าเว็บไซต์ได้</li>
                        <li>จัดการผู้ที่จะมีสิทธิ์เข้าถึงในส่วนของผู้ดูแลระบบ</li>
                    </ul>
                </div>
                <div style={{marginTop: 30}}>
                    จาก กันต์ธีร์<br/>
                    นักพัฒนา
                </div>
            </div>
        </div>
    )
}

export default Home
