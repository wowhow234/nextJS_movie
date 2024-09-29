// 영화 동영상만 모아 놓은 컴포넌트
import { OPTION } from "./home";

interface movieVideoParams {
  language: string;
}

// 영화 예고편
const getVideos = async (id: string) => {
  // console.log(`video fetching : ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const params: movieVideoParams = {
    language: "ko-KR",
  };
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${id}/videos?${queryString}`,
    OPTION
  );
  // console.log("response--------", response);
  return response.json();
};

const MovieVideos = async ({ id }: { id: string }) => {
  const videos = await getVideos(id);
  // console.log("videos-------", videos);
  // console.log("results is array? ", Array.isArray(videos.results)); // results가 배열인가요?

  const VideoKey = () => {
    const isEmptyArr = (arr) => {
      if (Array.isArray(videos.results) && arr.length === 0) {
        return false; // 배열인지 확인 & 빈 배열(길이가 0) 이면 false
      }
      return true; // results에 결과가 존재하면 true 반환
    };

    if (isEmptyArr(videos.results) === true) {
      // results 에 결과 값이 담겨 있는 경우
      const video_key = videos.results[0].key;
      return (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video_key}?loop=1&autoplay=0&mute=1&playlist=${video_key}`}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      return <h4>비디오를 불러올 수 없습니다.</h4>;
    }
    // console.log("videos.results.key ====", videos.results[0].key);
  };

  return (
    <>
      {/* <h6>{JSON.stringify(videos)}</h6> */}
      <div className="appearance-none block w-10/12 h-8 bg-gray-200  border border-gray-200 mb-5">
        <span className="ml-4 text-gray-600 text-[20px]">트레일러</span>
      </div>
      <div className="border border-black justify-center">
        <VideoKey />
      </div>
    </>
  );
};

export default MovieVideos;
