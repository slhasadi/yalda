import React from "react"
import "./styles.scss"
import Back from "../../assets/icons/back.svg"
import AstrologyCard from "../../components/AstrologyCard"
import Chinese from "../../assets/images/background_chinese.png";
const MahoParvinPage = (props) => {
    return(
        <div className="mahoParvinPageContainer">
            <div className="header">
                <div className="back" onClick={() => props.history.goBack()}>
                    <img src={Back} alt="back" className="backIcon" />
                </div>
                <p className="pageTitle">ماه و پروین</p>
            </div>
            <div className="main">
                <AstrologyCard
                    title={"طالع بینی چینی"}
                    bg={Chinese}
                    category={"chinese"}
                    options={[
                        {
                            title: "نوع طالع را انتخاب کنید: ",
                            type: "radio_button",
                            items: [
                                {
                                    label: "طالع شخصی",
                                    cat_id: "persoanl",
                                },
                                {
                                    label: "تاثیر سالها",
                                    cat_id: "years",
                                },
                                {
                                    label: "رابطه دوستی",
                                    cat_id: "friendship"
                                },
                                {
                                   label: "رابطه عاطفی",
                                   cat_id: "relationship" 
                                },
                                {
                                    label: "رابطه کاری",
                                    cat_id: "job"
                                },
                                {
                                    label: "رابطه والدین و فرزند",
                                    cat_id: "parentchild"
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </div>
    )
}
export default MahoParvinPage;