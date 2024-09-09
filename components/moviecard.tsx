"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../lib/features/movie/movieSlice";

export type Input = {
  title: string;
  wdate: string;
  review: string;
};

const MovieCard = ({ id }) => {
  const [inputs, setInputs] = useState<Input>({
    title: "",
    wdate: "",
    review: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  // reducer의 현재 state 사용하기 : store에 저장된 list 불러오기
  // const notes = useSelector((state: RootState) => state.movie.list);

  const { title, wdate, review } = inputs;
  const onHandleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // 1초 뒤 my note 게시판으로 이동
  const timeOut = () => {
    setTimeout(() => {
      router.push("/board");
    }, 1000);
    console.log("1초 뒤 my note 페이지로 이동");
  };

  const onSubmit = (e) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    e.preventDefault();
    dispatch(
      addNote({
        id,
        title: inputs.title,
        wdate: inputs.wdate,
        review: inputs.review,
        completed: false,
      })
    );
    timeOut();
  };

  useEffect(() => {
    // useSelector의 notes가 변경될 때만 콘솔 실행
    console.log("movieCard의 props/id----->", id);
  }, []);

  return (
    <>
      <div className="border border-black mx-auto md:w-8/12 px-3">
        <form onSubmit={onSubmit}>
          {/* <h3>해당 영화의 ID : {JSON.stringify(id)}</h3> */}
          {/* <p>{JSON.stringify(notes)}</p> */}
          <div className=" w-full ">
            <label htmlFor="title" className="mb-3 ml-0">
              제목
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onHandleChange}
              className="mb-3"
            />
          </div>
          <div className=" w-full">
            <label htmlFor="-watched-date" className="mb-3 ml-0">
              관람일
            </label>
            <input
              type="date"
              name="wdate"
              id="watched-date"
              value={wdate}
              onChange={onHandleChange}
              className="mb-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="review" className="mb-3 ml-0">
              감상평 적기
            </label>
            <textarea
              name="review"
              id="review"
              value={review}
              rows={5}
              cols={70}
              onChange={onHandleChange}
              className="mb-3"
            />
          </div>
          <button type="submit" className="ml-3">
            등록하기
          </button>
        </form>
      </div>
    </>
  );
};

export default MovieCard;
