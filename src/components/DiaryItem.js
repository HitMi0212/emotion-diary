import React from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({id, emotion, content, date}) => {
    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/diary/${id}`);
    };

    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    return(
        <div className="DiaryItem">
            <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
                <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
            </div>
            <div className="info_wrapper" onClick={goDetail}>
                <div className="diary_date">{new Date(parseInt(date)).toLocaleDateString()}</div>
                <div className="diary_content_preview">{content.slice(0,25)}</div>
            </div>
            <div className="btn_wrapper">
                <MyButton text={"수정하기"} onClick={goEdit} />
            </div>
        </div>
    );
};

export default React.memo(DiaryItem);