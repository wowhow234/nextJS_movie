import { OPTION } from "../app/(home)/page";
import Link from "next/link";
import Img from "./image";

interface movieInfoParams {
  language: string;
}

// 영화 상세
const getMovie = async (id: string) => {
  // console.log(`movie fetching : ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // console.log("id------------>", id);
  // console.log("typeof id : ", typeof id); // string, not object

  const params: movieInfoParams = {
    language: "ko-KR",
  };
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${id}?${queryString}`,
    OPTION
  );
  // console.log("url----------->", `${process.env.API_URL}/${id}?${queryString}`);

  return response.json();
};

const MovieInfo = async ({ id }: { id: string }) => {
  const movie = await getMovie(id);
  // console.log("movie-----", movie);
  const average = movie.vote_average.toFixed(1);

  return (
    <div className="border border-gray-400 w-full md:max-w-full md:flex">
      <div className="m-3 w-fit h-fit md:min-w-[270px] md:min-h-[400px]">
        <Img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={`${movie.title}`}
        />
      </div>
      <div className="self-center m-3 font-gothic flex flex-col">
        <div className="text-3xl font-bold">{movie.title}</div>
        <div className="m-1 mb-3.5 text-slate-400">
          <span>{movie.original_title}</span>
        </div>
        <div className="m-1">
          <span>개봉일 : </span>
          {movie.release_date}
        </div>
        <div className="m-1">
          <span>런타임 : </span>
          {movie.runtime}분
        </div>
        <div className="m-1">
          <span>평점 : </span>
          {average}
        </div>
        <div className="m-1 mt-2.5">
          <span>{movie.overview}</span>
        </div>
        <div className="m-1 border border-gray-400 rounded shadow text-black w-40 h-9 text-center bg-white hover:bg-gray-100 text-black py-2 px-4">
          <Link href={`/board/${movie.id}`}>노트에 추가하기</Link>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
