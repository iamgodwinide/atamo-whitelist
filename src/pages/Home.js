import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Header from '../components/Header'
import { useAlert } from 'react-alert'
import axios from 'axios';
import { Progress } from 'reactstrap';

const Home = () => {
    const alert = useAlert();
    const [account, setAccount] = useState(null);
    const [personalKey, setPersonalKey] = useState("");
    const [step, setStep] = useState(1);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [fontLoading, sefontLoading] = useState(true);
    const [answer, setAnswer] = useState("");
    const [muted, setMuted] = useState(false);
    const videoPlayer = useRef();
    const audio = useRef();


    const validateKey = () => {
        if (personalKey.length === 9) {
            setStep(2);
            audio.current.play();
        }
        else alert.error("Invalid key")
    }

    // const handleTweet = () => {
    //     if (code) {
    //         const tweetContent = `%0A%0AThe Key has been submitted %0A%0AMay polis guide me`
    //         const link = `https://twitter.com/intent/tweet?text=${tweetContent}&url=https://atamoascension.xyz`;
    //         window.open(link, "_blank");
    //     } else {
    //         alert.error(error);
    //         setStep(1);
    //     }
    // }


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

    const handlePlay = () => {
        videoPlayer.current.style.zIndex = 3;
        videoPlayer.current.play();
    }

    const handleEnd = () => {
        setLoading(false);
    }

    const handleAnswer = async () => {
        try {
            setFetching(true);
            const req = await axios.get(`https://atamoascension.xyz/api/puzzle/${answer}`);
            const res = await req.data;
            setFetching(false);
            if (res.success) {
                setStep(3);
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
            sefontLoading(false);
        })
        setTimeout(() => {
            sefontLoading(false);
        }, 10000)
    }, [])


    return (
        loading
            ? <div className='loader'>
                {
                    fontLoading
                        ?
                        <div className='loading-wrap'>
                            <Progress
                                animated
                                className="my-3"
                                color="danger"
                                value="100"
                                style={{
                                    width: "40%",
                                    height: "1.7em"
                                }}
                            />
                        </div>
                        : <>
                            <video src='/gate.mp4' preload='true' onEnded={handleEnd} ref={videoPlayer} className='video' />
                            <div className='overlay'>
                                <button onClick={handlePlay}>click to enter</button>
                            </div>
                        </>
                }
            </div>
            : <div>
                {/* <Header audio={audio} setMuted={setMuted} /> */}
                <audio preload='true' src='/Atamo.mp3' ref={audio} />
                <div className='main'>
                    <h1>Enter while the gate is still open.</h1>
                    {
                        step === 1
                        && <div className='form'>
                            <label>Enter your personal key to proceed:</label>
                            <div>
                                <input
                                    value={personalKey}
                                    onInput={e => setPersonalKey(e.target.value)}
                                />
                                <button onClick={validateKey}>
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    }
                    {
                        step === 2
                        && <div className='puzzle-wrap'>
                            <p>Solve The Puzzle Below To Continue: </p>
                            <img src="puzzle.png" className="puzzle" />
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
                            <label>Final Step Enter the address to be whitelisted:</label>
                            <div>
                                <input
                                    value={account}
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
                        <div>
                            <h2>The Key has been submitted</h2>
                        </div>
                    }
                </div>
            </div>
    )
}

export default Home