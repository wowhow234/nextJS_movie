import React, { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

// export const params = {
//   language: "ko-KR",
// };
export const queryString = new URLSearchParams("language=ko-KR").toString();

const MovieDetail = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie video</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
};

export default MovieDetail;
