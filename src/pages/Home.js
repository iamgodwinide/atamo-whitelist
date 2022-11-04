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
    const puzzleVideo = useRef();


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
                handletweet();
            } else {
                alert.error("The Gate has been closed.");
            }
        } catch (err) {
            setTimeout(generateCode, 3000)
        }
    }

    const handleEnd = () => {
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
                setTimeout(() => {
                    // bg2.current.style.zIndex = "-1";
                    // bg1.current.style.zIndex = "-2";
                }, 1000)
            } else {
                alert.error("Incorrect answer");
            }
        } catch (err) {
            setFetching(false);
            alert.error("Somthing went wrong");
        }
    }

    const handletweet = () => {
        const tweetContent = `I have solved the first @AtamoAscension trial and ascended.%0A%0ANew keys available soon.`
        const link = `https://twitter.com/intent/tweet?text=${tweetContent}&url=https://atamoascension.xyz`;
        window.open(link, "_blank");
    }

    const submitAddress = () => {
        handletweet();
        // generateCode();
        // alert.success("The key has been submitted.");
        // setStep(4);
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
            <Header audio={audio} setMuted={setMuted} step={step} />
            {
                step !== 2
                &&
                <>
                    <div className='bg1' ref={bg1} />
                    <div className='bg2' ref={bg2} />
                </>
            }
            <div className='bg-video' ref={bgVideo}>
                <video src='/Gates_to_Polis.mp4' ref={video} onEnded={handleEnd} />
            </div>
            <audio preload='true' loop="true" src='/Atamo_Ascension_audio_reversed.wav' ref={audio} />
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
                        <video src="/Puzzle.mp4" ref={puzzleVideo} autoPlay muted className="p-video" />
                        <input placeholder='Enter trial answer' value={answer}
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
                        <h3>The AtamoList is closed for now, but tweeting out that you solved the trial could still land you an AtamoList spot.</h3>
                        <div>
                            <button onClick={submitAddress}>
                                Tweet
                            </button>
                        </div>
                    </div>
                }
                {
                    step === 4
                    &&
                    <div className='last'>
                        <h2>Your address has been Atamolisted</h2>
                    </div>
                }
            </div>
        </div >
    )
}

export default Home