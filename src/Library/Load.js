import React from 'react'
import { Spinner } from 'react-bootstrap'
import './Load.css'

function Load() {
    return (
        <div id="load-container">
            <div id="load-content">
                <Spinner variant="seconary" animation="border" className="spinner"/>
                <div id="load-text">
                    <b>กำลังโหลด...</b>
                </div>
            </div>
        </div>
    )
}

export default Load
