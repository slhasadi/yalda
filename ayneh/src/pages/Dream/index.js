import React from "react"
import "./styles.scss"
import Back from "../../assets/icons/back.svg"
import Search from "../../assets/icons/ic-search.svg"
import { GetDreamList } from "../../network/cnt"
const alphabets = ["ا","ب","پ","ت","ث","ج","چ","ح","خ","د","ذ","ر","ز","ژ","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ک","گ","ل","م","ن","و","ه","ی"]
const DreamPage = (props) => {
    const appMode = props.match.params.mode;
    const [ searchRes, setSearchres ] = React.useState([])
    const [ selectedChar, setSelectedChar ] = React.useState(alphabets[0])
    let [ wordsList, setWords ] = React.useState([])
    let [ page, setPage ] = React.useState(1)
    React.useEffect(() => {
        // console.log(selectedChar);
        getWords()
    },[selectedChar])
    const getWords = () => {
        GetDreamList(selectedChar,page).then((res) => {
            let newWords = wordsList.concat(res.data.results) 
            setWords(newWords)
        }).catch((e) => {
            console.error(e);
        })
    }
    const onChangeHandler = (e) => {
        let word = e.target.value;
        if ( word.length >= 2 ){
            GetDreamList(word).then((res) => {
                // console.log(res.data);
                setSearchres(res.data.results)
            }).catch((e) => {
                console.error(e);
            })
        } else if (word.length === 0 ){
            setSearchres([])
        }
    }
    const handleScroll = (e) => {
        // console.log(e.target.scrollHeight - e.target.scrollTop, e.target.clientHeight);
        const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
        if (bottom) {
            // console.log("bottom");
            setPage(++page)
            getWords()
        }
    }
    return(
        <div className="dreamPageContainer">
            <div className="header">
                <div className="back" onClick={() => props.history.goBack()}>
                    <img src={Back} alt="back" className="backIcon" />
                </div>
                <p className="pageTitle">تعبیر خواب</p>
            </div>
            <div className="main noPadding">
                <div className="searchBarContainer">
                    <p className="title">منبع: اپلیکیشن تعبیر خواب بنفش 2</p>
                    <div className="searchBox">
                        <img className="icon" src={Search} alt="search" />
                        <input onChange={(e) => onChangeHandler(e)} autoFocus={true} placeholder={"جستجوی موضوع خواب"} className="searchInput" />
                        { searchRes.length !== 0 &&
                            <div className="searchResult">
                                { searchRes.map((item, i) => 
                                    <p onClick={() => props.history.push("/"+appMode+"/dream/"+item.id)} key={item.id+"-"+i}>{item.subject}</p>
                                )}
                            </div>
                        }
                    </div>
                    <div className="alphabetList">
                        { alphabets.map((char, index) =>
                            <p 
                                onClick={() => {setSelectedChar(char);setPage(1);setWords([])}}
                                className={selectedChar === char ? "char active" : "char"} 
                                key={char + index}>{char}</p>
                        )}
                    </div>
                </div>
                <div className="wordsList" onScroll={(e) => handleScroll(e)}>
                    { wordsList.length !== 0 &&
                        <div>
                            { wordsList.map((word, i) => 
                                <p onClick={() => props.history.push("/"+appMode+"/dream/"+word.id)} className="word" key={word.id+"-"+i}>{word.subject}</p>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default DreamPage;