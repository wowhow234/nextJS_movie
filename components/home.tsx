import { Metadata } from "next";
import Link from "next/link";

export interface SearchParams {
  language: string;
  sort_by: string;
  region: string;
}

const metadata: Metadata = {
  title: "Home",
};

export const OPTION = {
  method: "get",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION,
  },
};

export const getMovies = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const params: SearchParams = {
    language: "ko-KR",
    sort_by: "popularity.desc",
    region: "KR",
  };
  const queryString = new URLSearchParams(params).toString();
  // console.log("---queryString----", queryString);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/now_playing?${queryString}`,
    OPTION
  );
  // console.log("response----->", response);
  // console.log("process.env----->", process.env.API_URL);
  const json = await response.json();
  // console.log("--------------------------", json);
  return json;
};

export default async function HomePage() {
  const movies = await getMovies();
  // console.log(movies);

  return (
    <div className="flex flex-wrap w-full h-96">
      {movies.results.map((movie) => (
        <div key={movie.id} className="border border-black w-1/3 flex-center">
          <Link href={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={`${movie.title}`}
              className="box-border object-cover w-[100%] h-[100%]"
            />
            <div className="text-center text-xl">{movie.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
