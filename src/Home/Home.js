import React from 'react'
import './Home.css'

function Home() {

    return (
        <div id="home">
            <h1>ยินดีต้อนรับครับ</h1>
            <div id="content" style={{marginTop: 30}}>
                เว็บจัดการเว็บไซต์
                <a href="http://xn--12ca1b1ad6at4bbyx3hva0b9qja8g.com/" target="_blank" rel="noopener noreferrer">พระไตรปิฎกใกล้ตัว.com</a>
                    แบบใหม่ หากจะจัดการส่วนต่าง ๆ ของเว็บสามารถเข้าถึงได้จากแถบเมนูด้านข้าง
                <div style={{marginTop: 30}}>
                    <b>มีอะไรใหม่บ้าง</b>
                    <div>อัพเดทล่าสุดวันที่: 20 พฤษภาคม พ.ศ.2565</div><br/>
                    <ul>
                        <li>เพิ่มไอคอมแสดงผลที่เมนูด้านข้าง</li>
                        <li>สามารถแก้ไขข้อมูล"เกี่ยวกับเรา"ได้</li>
                        <li>เพิ่มการยินยอมการใช้งานคุกกี้</li>
                        <li>เพิ่มไอคอมการแจ้งเตือนที่มุมขวาบน</li>
                        <li>แก้ไขข้อผิดพลาดบางจุด</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home
