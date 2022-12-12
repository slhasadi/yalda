import React from "react"
import "./styles.scss"
import Play from "../../assets/icons/icons_play_red.png"
import Pause from "../../assets/icons/icons_pause_red.png"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const AudioPlayer = (props) => {
    const audioPlayer = React.useRef()
    const [ isPlaying, setPlay ] = React.useState(false)
    const [ seekbar, setSeekbar ] = React.useState();
    const play = () => {
        if( audioPlayer.current ){
            setPlay(true)
            audioPlayer.current.play()
        }
    }
    const pause = () => {
        if( audioPlayer.current ){
            setPlay(false)
            audioPlayer.current.pause()
        }
    }
    React.useEffect(() => {
        console.log(seekbar);
    },[seekbar])
    return(
        <>
            <audio 
                ref={audioPlayer} 
                onTimeUpdate={() => {setSeekbar(audioPlayer.current.currentTime)}}
                id="player" 
                src={"https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"}>
            </audio>
            <div className="audioPlayer">
                <Slider
                    onChange={(e) => {if(audioPlayer.current) {audioPlayer.current.currentTime = e.target.value } }}
                    value={seekbar}
                    step={0}
                    min={0}
                    max={audioPlayer.current && audioPlayer.current.duration}
                />
                { !isPlaying && <img className="controlIcon" src={Play} alt={"play"} onClick={() => play()} /> }
                { isPlaying &&<img className="controlIcon" src={Pause} alt={"pause"} onClick={() => pause()} /> }
            </div>
        </>
    )
}
export default AudioPlayer
