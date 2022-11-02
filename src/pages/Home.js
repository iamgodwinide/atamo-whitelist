import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Header from '../components/Header'
import { useAlert } from 'react-alert'
import axios from 'axios';

const Home = () => {
    const alert = useAlert();
    const [account, setAccount] = useState(null);
    const [personalKey, setPersonalKey] = useState("");
    const [step, setStep] = useState(1);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [answer, setAnswer] = useState("");
    const videoPlayer = useRef();


    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccount(accounts);
                setStep(2);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const validateKey = () => {
        if (personalKey.length === 9) setStep(3);
        else alert.error("Invalid key")
    }

    const handleTweet = () => {
        if (code) {
            const tweetContent = `%0A%0AThe Key has been submitted %0A%0AMay polis guide me`
            const link = `https://twitter.com/intent/tweet?text=${tweetContent}&url=https://atamoascension.xyz`;
            window.open(link, "_blank");
        } else {
            alert.error(error);
            setStep(1);
        }
    }


    const generateCode = async () => {
        try {
            const req = await axios.get(`https://atamoascension.xyz/api/code-generate/${account}`);
            const res = await req.data;
            console.log(res)
            if (res.success) {
                setCode(res.code);
            } else {
                console.log(res.msg)
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
                alert.success("The key has been submitted.");
                generateCode();
                setStep(4);
            } else {
                alert.error("Incorrect answer");
            }
        } catch (err) {
            setFetching(false);
            alert.error("Somthing went wrong");
        }
    }


    return (
        loading
            ? <div className='loader'>
                <video src='/gate.mp4' preload onEnded={handleEnd} ref={videoPlayer} className='video' />
                <div className='overlay'>
                    <button onClick={handlePlay}>click to enter</button>
                </div>
            </div>
            : <div>
                <Header />
                <div className='main'>
                    <h1>Enter while the gate is still open.</h1>
                    {
                        step === 1
                        &&
                        <>
                            <p>connect your wallet to proceed.</p>
                            <button className='connect-btn' onClick={connectWallet}>connect wallet</button>

                        </>
                    }
                    {
                        step === 2
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
                        step === 3
                        && <div className='captcha-wrap'>
                            <p>Final Step: Solve The Puzzle Below</p>
                            <textarea readOnly>
                                T119/J694/Q084/D492/N028/M984/V174/C226/X923/P732/O811/Z381/B877/C375/I278/J272/W438/Y173/R575/T576/E979/E632/G574/D789/S438/A187/P039/K178/U986/T987/G872/I872/K732/M173/L582/N748/M721/F874/F800/K947/T753/R704/M891/Z474/C864/X910/L018/P972/E849/H817/H782/W848/E591/S985/F984/L008/T983/Y881/U044/M383/J758/V949/R185/U133/J818/R898/L018/F911/G984/B985/M144/U589/X890/Q987/G982/O764/H567/B984/U849/R817/K178/P164/P875/N649/D754/777A/S940/T092/H829/K583/L849/L894/E198/W871/R148/E572/V382/E513/R672/S187/E354/U057/H831/B875/V784/C378/M361/N389/U487/I287/R677/T787/Y858/E849/W631/Q563/G744/373t/R813/A570/S478/D367/F465/V276/B743/M466/N564/J321/K549/L322/M442/M297/R734/W464/Y095/R005/B007/M223/J999/X312/M847/H763/U637/Q331/R478/F356/X367/G124/L454/Y764/T447/C834/W173/R448/H539/V840/N944/M827/V837/E744/S765/J656/K444/R431/X544/Z650/Z338/Q644/L571/B348/P473/O574/I373/U661/Y833/W119/W119/733A/Q758/D746/S422/A093/M786/N465/V761/R869/C744/T277/S653/G544/H564/J988/P747/O904/E367/W913/Q367/M546/V985/Y784/T847/T999/C846/B549/R148/E572/V382/E513/R672/S187/E354/Z899/E168/H617/K381/P344/P675/B737/E673/Q938/I783/O098/U889/M176/N476/B764/X367/Z646/W918/G781/H171/B754/Y478/T176/R873/E179/R377/H378/P399/C933/W456/337s/R848/H901/J367/K654/L647/G366/W221/V464/Q653/P544/R677/T787/Y858/E849/W631/Q563/G744/773P/R813/A570/S478/D367/F465/V276/B743/C833/F763/D989/E387/B731/C673/A791/V794/S947/N746/F631/J377/I145/K356/L446/U338/B635/V154/C454/X656/M546/C654/Z471/M200/Q176/L480/R767/R873/V167/C464/F099/G873/D338/S763/A553/E733/Q197/R148/E572/V382/E513/R672/S187/E354/T576/E979/E632/G574/D789/S438/A187/P039/K178/U986/T987/G872/I872/K732/M173/L582/N748/M721/F874/F800/K947/T753/R704/M891/Z474/C864/X910/L018/P972/E849/H817/H782/W848/E591/S985/F984/L008/T983/Y881/C781/R186/M731/G500/T873/R148/E572/V382/E513/R672/S187/E354X365/X187/H801/E404/E402/A081/C089/B873/N673/333o/W987/T633/R476/S655/C378/V367/B473/M839/N476/T683/A001/B002/T781/U564/I164/O031/X312/M847/H763/U637/Q331/R478/F356/X367/G124/L454/Y764/T447/C834/W173/R448/H539/V840/N944/M827/V837/E744/S765/J656/K444/R431/X544/Z650/Z338/Q644/L571/B348/P473/O574/I373/U661/K387/K176/B890/V783/C367/X975/M084/N889/Y378/A178/Y478/R148/E572/V382/E513/R672/S187/E354/B348/P473/O574/I373/U661/Y833/T119/T119/377G/R088/C981/B873/F890/G893/F016/Y371/E187/E018/Z218/E126/U467/V091/V647/E310/N095/B019/R893/R972/Q176/W504/S947/E911/R874/T658/Y678/U101/I176/O476/P173/L438/K287/F762/D199/P119/P119/E168/H617/K381/P344/P675/B737/E673/Q938/I783/O098/U889/M176/N476/B764/X367/Z646/L018/P972/E849/H817/H782/D711/D971/V789/Z089/V081/T671/T789/O871/R148/E572/V382/E513/R672/S187/E354/V647/E310/N095/B019/R893/R972/Q176/W504/S947/E911/R874/T658/Y678/U101/I176/O476/P173/D091/V789/R866/E786/Q986/Q971/C081/N872/E871/V986/J176/K763/L365/C796/X876/Z656/N555/Q567/E376/B309/X801/H189/J091/C378/M361/N389/U487/I287/R677/T787/Y858/E849/W631/Q563/G744/R186/M731/G500/T873/X365/X187/H801/E404/E402/A081/C089/B873/I677/O654/U765/P363/Y665/X753/Z016/N617/W571/D780/R688/Q875/X875/H966/J154/K161/L157/X657/Q744/W933/E091/R767/T145/Y536/U656/I365/O510/P364/R148/E572/V382/E513/R672/S187/E354/R813/A570/S478/D367/F465/V276/B743/M466/N564/J321/K549/L322/M442/M297/R734/W464/Y095/R005/B007/M223/A019/R223/737a/Y383/A763/L586/L109/A978/H618/W113/I484/N910/C017/D861/O178/E876/G874/A487/N100/O918/A675/R680/B817/I477/N167/B767/I477/E187/V674/I658/V604/O887/L476/T167/A859/N769/O984/I157/F768/M876/A103/Z457/A363/L174/A476/K487/N387/Y687/B478/L480/E005/R771/P474/R837/Z947/G998/I187/P816/T871/A765/L468/G477/R197/A767/C776/L187/A478/K388/L119/A599/R148/E572/V382/E513/R672/S187/E354/Z081/E187/C971/H191/A494/F901/Y019/E178/R176/U187/A673/H695/Y109/A998/S018/Z813/A587/G909/L781/O874/N463/K186/A367/O911/A716/H180/R617/777W/F763/D989/E387/C017/D861/O178/E876/G874/R893/R972/Y671/J573/N783/M717/F783/T716/P257/R769/T985/U856/C849/L894/K859/B476/E847/R922/Z011/R148/E572/V382/E513/R672/S187/E354/O018/E971/U367/G168/A018/L576/O614/N178/K501/J617/U014/U467/R197/Z186/P119
                            </textarea>
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