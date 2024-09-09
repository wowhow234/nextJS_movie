"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../lib/store";
import { useState } from "react";

import { Input } from "../../../../components/moviecard";
import { updateNote } from "../../../../lib/features/movie/movieSlice";
import { useParams, useRouter } from "next/navigation";

const ReviewModify = ({ params: { id } }) => {
  // store에 있는 state의 list를 찾음
  const notes = useSelector((state: RootState) => state.movie.list);

  // 그 중에서 id가 일치한 것 찾아냄
  const findNote = notes.find((item) => item.id === id);

  const [modifyInputs, setModifyInputs] = useState<Input>({
    title: findNote.title,
    wdate: findNote.wdate,
    review: findNote.review,
  });
  const { title, wdate, review } = modifyInputs;
  const onHandleChange = (e) => {
    setModifyInputs({
      ...modifyInputs,
      [e.target.name]: e.target.value,
    });
    // console.log("input value : ", e.target.value);
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  //   console.log("-----------------------------------");
  // console.log("useParams : ", params); // {"id":"1209217"}
  // console.log("id : ", id); // "1209217"
  // console.log("type of id : ", typeof id); // string

  // const [isEdit, setIsEdit] = useState(false);

  const onSubmitUpdate = (e) => {
    alert("수정했습니다.");
    e.preventDefault();
    // console.log("변경된 input 확인", modifyInputs);
    dispatch(
      updateNote({
        id,
        title: modifyInputs.title,
        wdate: modifyInputs.wdate,
        review: modifyInputs.review,
      })
    );
    router.push("/board");
  };

  useEffect(() => {
    // console.log("해당 영화 노트 확인", findNote);
  }, [modifyInputs]);

  return (
    <>
      {/* <h3>해당 영화의 ID : {JSON.stringify(id)}</h3>
      <h3>useParams :{JSON.stringify(params)}</h3>
      <h3> 그냥 ID : {id}</h3> */}
      <form onSubmit={onSubmitUpdate}>
        <label className="mb-2">제목</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onHandleChange}
          className="mb-4"
        />
        <label className="mb-2">관람일</label>
        <input
          type="date"
          name="wdate"
          value={wdate}
          onChange={onHandleChange}
          className="mb-4 w-[200px]"
        />
        <label className="mb-2">감상평</label>
        <textarea
          name="review"
          value={review}
          onChange={onHandleChange}
          className="mb-4"
        />
        <button type="submit">수정하기</button>
      </form>
    </>
  );
};

export default ReviewModify;
