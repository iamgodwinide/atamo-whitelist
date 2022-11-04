import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Header from '../components/Header'
import { useAlert } from 'react-alert'
import axios from 'axios';

const Home = () => {
    const alert = useAlert();
    const [account, setAccount] = useState("");
    const [personalKey, setPersonalKey] = useState("");
    const [step, setStep] = useState(1);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [fontLoading, sefontLoading] = useState(true);
    const [answer, setAnswer] = useState("");
    const [muted, setMuted] = useState(false);
    const audio = useRef();
    const bg1 = useRef();
    const bg2 = useRef();
    const bgVideo = useRef();
    const video = useRef();


    const validateKey = () => {
        if (personalKey.length === 9) {
            handleStartVideo();
        }
        else alert.error("Invalid key")
    }

    const generateCode = async () => {
        try {
            const req = await axios.get(`https://atamoascension.xyz/api/code-generate/${account}`);
            const res = await req.data;
            console.log(res)
            if (res.success) {
                setCode(res.code);
            } else {
                setError(res.msg);
            }
        } catch (err) {
            setTimeout(generateCode, 3000)
        }
    }

    const handleEnd = () => {
        console.log("here")
        bgVideo.current.style.display = "none";
        bg2.current.style.zIndex = "-1";
        bg1.current.style.zIndex = "-2";
        setStep(2);
        audio.current.play();
    }

    const handleStartVideo = () => {
        bgVideo.current.style.zIndex = "210";
        video.current.play();
    }

    const handleAnswer = async () => {
        try {
            setFetching(true);
            const req = await axios.get(`https://atamoascension.xyz/api/puzzle/${answer}`);
            const res = await req.data;
            setFetching(false);
            if (res.success) {
                setStep(3);
                audio.current.pause();
            } else {
                alert.error("Incorrect answer");
            }
        } catch (err) {
            setFetching(false);
            alert.error("Somthing went wrong");
        }
    }

    const submitAddress = () => {
        generateCode();
        alert.success("The key has been submitted.");
        setStep(4);
    }

    useEffect(() => {
        window.addEventListener('load', function () {
            setTimeout(() => {
                sefontLoading(false);
            }, 1000)
        })
        setTimeout(() => {
            sefontLoading(false);
        }, 10000)
    }, [])


    return (
        <div>
            <Header audio={audio} setMuted={setMuted} />
            <div className='bg1' ref={bg1} />
            <div className='bg2' ref={bg2} />
            <div className='bg-video' ref={bgVideo}>
                <video src='/Gates_to_Polis.mp4' ref={video} onEnded={handleEnd} />
            </div>
            <audio preload='true' src='/Atamo.mp3' ref={audio} />
            <div className='main'>
                {
                    step === 1
                    && <div className='form'>
                        <h3>Enter your personal key to proceed:</h3>
                        <div>
                            <input
                                value={personalKey}
                                onInput={e => setPersonalKey(e.target.value)}
                            />
                            <button onClick={validateKey}>
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                }
                {
                    step === 2
                    && <div className='puzzle-wrap puzzle-container'>
                        <h3>Solve The Puzzle Below To Continue: </h3>
                        <img src="/puzzle.png" className="puzzle" />
                        <input placeholder='Enter the answer here' value={answer}
                            onInput={e => setAnswer(e.target.value)}
                        />
                        <button className='connect-btn' onClick={handleAnswer} disabled={fetching}>
                            {
                                fetching
                                    ? "please wait..."
                                    : "confirm"
                            }
                        </button>
                    </div>
                }
                {
                    step === 3
                    && <div className='form2'>
                        <h3>Congratulations, you have made it through the gates!</h3>
                        <br />
                        <h4>Enter your minting address to be added to the AtamoList.</h4>
                        <div>
                            <input
                                value={account}
                                placeholder="0x..."
                                onInput={e => setAccount(e.target.value)}
                            />
                            <button onClick={submitAddress}>
                                submit
                            </button>
                        </div>
                    </div>
                }
                {
                    step === 4
                    &&
                    <div className='last'>
                        <h2>Your address has been whitelisted</h2>
                    </div>
                }
            </div>
        </div >
    )
}

export default Home