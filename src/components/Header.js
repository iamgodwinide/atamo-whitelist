import React from 'react'
import './index.css'
import Slider from './Slider'

const Header = ({ audio, setMuted, step }) => {
    return (
        <nav>
            <img className='logo' src='/LOGO 2.png' />
            {
                step === 2
                &&
                <Slider audio={audio} setMuted={setMuted} />
            }
        </nav>
    )
}

export default Header