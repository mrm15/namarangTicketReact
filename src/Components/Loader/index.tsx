import Loader1 from "./Loader1";
import Loader2 from "./Loader2.tsx";

const index = ({type = 1, text = 'در حال بارگزاری...'}) => {


    if (type === 1) {
        return <Loader1 text={text}/>
    }
    if (type === 2) {
        return <Loader2 text={text}/>
    }
};

export default index;
