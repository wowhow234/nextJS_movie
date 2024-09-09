import React, { Suspense } from "react";
import MovieCard from "../../../components/moviecard";
import Loading from "./loading";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  // console.log("props확인-------->", id);
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <MovieCard id={id} />
      </Suspense>
    </div>
  );
};
export default Page;
