// import { OPTION } from "../app/(home)/page";

import { getMovie } from "./movie-info";

// interface movieInfoParams {
//   language: string;
// }

// // 영화 상세
//  const getMovieDetail = async ({ id }) => {
//   // console.log(`movie fetching : ${Date.now()}`);
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   // console.log("id------------>", id);
//   // console.log("typeof id : ", typeof id); // string, not object

//   const params: movieInfoParams = {
//     language: "ko-KR",
//   };
//   const queryString = new URLSearchParams(params).toString();

//   const response = await fetch(
//     `${process.env.API_URL}/${id}?${queryString}`,
//     OPTION
//   );
//   // console.log("url----------->", `${process.env.API_URL}/${id}?${queryString}`)
//   return response.json();
// };

const MovieDetail = async ({ id }) => {
  const apple = await getMovie(id);

  return (
    <div>
      <h3>무비 디테일 되나</h3>
      <span>id : {apple.id}</span>
      <span>posterpath : {apple.poster_path}</span>
    </div>
  );
};

export default MovieDetail;
