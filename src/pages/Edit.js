import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {DiaryStateContext} from "../App";
import DiaryEditor from "../components/DiaryEditor";

const getStringDate = (date) => {
    return date.toISOString().slice(0,10);
}

const Edit = () => {

    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);

    console.log(id);
    console.log(diaryList);

    useEffect(() => {
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it) => it.id === parseInt(id));
            console.log(targetDiary);

            if(targetDiary){
                setOriginData(targetDiary);
            } else {
                // undefined일 경우 false가 들어간다.
                navigate('/', {replace : true});
            }

        }
    }, [id, diaryList]);

    return(
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}></DiaryEditor>}
        </div>
    )
}

export default Edit;