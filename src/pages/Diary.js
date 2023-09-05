import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import {useNavigate} from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import {getStringDate} from "../util/date";
import {emotionList} from "../util/emotion";

const Diary = ({ match }) => {
    const [data, setData] = useState();

    const { id } = match.params;
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => it.id === parseInt(id));
            if (targetDiary) {
                setData(targetDiary);
            } else {
                alert("없는 일기입니다.");
                navigate('/',{replace:true})
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className="DiaryPage">로딩중입니다...</div>;
    } else {
        const date = getStringDate(new Date(data.date));
        const curEmotionData = emotionList.find(
            (it) => it.emotion_id === parseInt(data.emotion)
        );

        return (
            <div className="DiaryPage">
                <MyHeader
                    headText={`${date} 기록`}
                    leftChild={
                        <MyButton
                            text={"< 뒤로가기"}
                            onClick={() => {
                                window.history.back();
                            }}
                        />
                    }
                    rightChild={
                        <MyButton
                            text={"수정하기"}
                            onClick={() =>
                               navigate(`edit/${data.id}`)
                            }
                        />
                    }
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div
                            className={[
                                "diary_img_wrapper",
                                `diary_img_wrapper_${data.emotion}`,
                            ].join(" ")}
                        >
                            <img
                                alt={`emotion${data.emotion}`}
                                src={
                                    process.env.PUBLIC_URL + `/assets/emotion${data.emotion}.png`
                                }
                            />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;