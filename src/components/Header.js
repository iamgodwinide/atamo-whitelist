import React from 'react'
import './index.css'
import Slider from './Slider'

const Header = ({ audio, setMuted }) => {
    return (
        <nav>
            <img className='logo' src='/LOGO 2.png' />
            <Slider audio={audio} setMuted={setMuted} />
        </nav>
    )
}

export default Header