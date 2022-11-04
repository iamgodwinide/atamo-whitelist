import { useEffect, useRef, useState } from 'react';

const Slider = ({ setMuted, audio }) => {

    const rangeSliderRef = useRef();
    const [volume, setVolume] = useState((audio.current?.volume || 1) * 100);

    useEffect(() => {
        const slider = rangeSliderRef.current;
        const onChange = evt => {
            const value = Math.round(evt.detail.value);
            if (value === 0) setMuted(true);
            else setMuted(false);
            setVolume(value);
            audio.current.volume = value / 100;
        };

        slider?.addEventListener('change', onChange);

        return () => {
            slider?.removeEventListener('change', onChange);
        };
    }, []);

    return (

        <div className="speaker-wrap">
            <i class="fas fa-volume-up fa-2x mr-1" style={{ marginRight: ".3em", color: "#e74525" }}></i>
            <toolcool-range-slider
                slider-width="300px"
                slider-height="10px"
                // style={{ margin: "0 10px", width: "100%" }}
                slider-radius="1rem"
                pointer-width="1.2em"
                pointer-height="1.2em"
                pointer-bg="#e74525"
                pointer-bg-hover="#e74525"
                pointer-bg-focus="#e74525"
                slider-bg="#e74525"
                slider-bg-fill="#181818"
                value={volume}
                ref={rangeSliderRef}
            ></toolcool-range-slider>
        </div>

    )
};

export default Slider;