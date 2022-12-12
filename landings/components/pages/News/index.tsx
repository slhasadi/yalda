import Container from "../../commons/Container";
import Divider from "../../commons/Divider";
import AboutOfSubject from "../../commons/AboutOfSubject";
import HottestNews from "./Sections/HottestNews";
import LatestNews from "./Sections/LatestNews";
import OtherNews from "./Sections/OtherNews";

const News = () => {
    return <Container>
        <LatestNews />

        <Divider />

        <HottestNews/>

        <Divider />

        <OtherNews />

        <br/>
        <br/>
    </Container>
}

export default News;
