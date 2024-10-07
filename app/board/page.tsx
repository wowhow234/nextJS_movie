"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { deleteNote, updateNote } from "../../lib/features/movie/movieSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OPTION } from "../(home)/page";
import { SearchParams } from "../(home)/page";

export default function Board() {
  const [movies, setMovies] = useState([]);
  // reducer의 현재 state 사용하기 -> redux에 저장된 모든 state를 불러오는거임
  const notes = useSelector((state: RootState) => state.movie.list);
  // console.log("my notes----->", notes);

  const dispatch = useDispatch();

  // const onClickUpdate = (id: string) => {
  //   dispatch(updateNote(id));
  // };

  const onClickDelete = (id: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(deleteNote(id));
    } else {
      return;
    }
  };

  useEffect(() => {
    // console.log("컴포넌트 렌더링-----------------");
    async function fetchMovies() {
      const params: SearchParams = {
        language: "ko-KR",
        sort_by: "popularity.desc",
        region: "KR",
      };
      const queryString = new URLSearchParams(params).toString();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/now_playing?${queryString}`,
        // {
        //   ...OPTION,
        //   cache: "no-store",
        // }
        OPTION
      );
      const data = await response.json();
      setMovies(data.results);
      // console.log("--------------------------", data); // fetch 결과
    }
    fetchMovies();
    // console.log("렌더링완료---------------");
  }, []);

  // console.log("movies------", movies); // movies에 data.results 담긴 값 출력

  const FindId = ({ id }) => {
    console.log("id--------", id);
    // console.log("id의 타입 : ", typeof id); // string
    // 현재 {id} 로 표기해서 string으로 들어오고 있음
    //------------------id 찾기 test---------------
    // console.log("movies[1]출력 : ", movies[1]);
    // console.log("movies[1]의 id------", movies[1].id);
    // console.log("movies[0].id의 타입 : ", typeof movies[0].id); // number
    // 근데 movies의 각 객체에 있는 id는 number 타입이다.
    // 문자열을 숫자형으로 바꿔주자.     ↓ number    ↓ id는 string
    const movieItem = movies.find((item) => item.id === parseInt(id));
    if (movieItem) {
      // console.log("경로확인-----", movieItem.poster_path);
    } else {
      console.log(`movie id'${id}' is not exist in now_playing api`);
    }
    // console.log("find item 출력----->", item);
    return (
      <>
        {movieItem ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movieItem.poster_path}`}
            alt={`${movieItem.title}`}
          />
        ) : (
          <div className="my-3 ml-3 p-3 border border-gray-200 w-[280px] h-[400px] content-center">
            movie id '{id}' is not exists in now_playing api.
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="mt-2.5">
        {/* <p>{JSON.stringify(notes)}</p> */}
        {notes.map((item) => (
          <div
            key={item.id}
            className="border border-gray-400 flex flex-col md:flex-row  mb-2.5"
          >
            <div className="margin-0auto w-fit h-fit md:min-w-[300px] md:min-h-[400px]">
              <FindId id={item.id} />
            </div>
            <div className="w-full p-3.5">
              <div className="text-gray-900 font-bold text-[40px] mb-2">
                {item.title}
              </div>
              <p className="mb-4 text-gray-600 flex item-center">
                관람일
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-gray-500 w-[1.5rem] h-[1.5rem] mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                {item.wdate}
              </p>
              <p className="text-gray-700 text-base break-all">{item.review}</p>
              <div className="mt-[10px]">
                <Link href={`/board/${item.id}/modify`}>
                  <button>수정하기</button>
                </Link>
                <button onClick={() => onClickDelete(item.id)}>삭제하기</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
