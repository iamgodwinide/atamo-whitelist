import React from 'react'
import './index.css'
import Slider from './Slider'

const Header = ({ audio, setMuted }) => {
    return (
        <nav>
            <a href="#">Gates of polis</a>
            <Slider audio={audio} setMuted={setMuted} />
        </nav>
    )
}

export default Header