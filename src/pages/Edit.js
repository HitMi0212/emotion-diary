import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";
import { DiaryStateContext } from "../App";

const Edit = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [originData, setOriginData] = useState();
    
    const diaryList = useContext(DiaryStateContext);

    useEffect(()=>{
        if(diaryList.length >= 1){
            const diary = diaryList.find((it)=>parseInt(it.id) === parseInt(id));
            
            if(diary){
                setOriginData(diary);
            } else{
                alert("없는 일기입니다.");
                navigate("/", {replace: true});
            }
        }

    }, [id, diaryList]);

    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
};

export default Edit;