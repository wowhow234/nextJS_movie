interface ImgProps {
  src: string;
  alt: string;
}

const Img = ({ src, alt }: ImgProps) => {
  return <img src={src} alt={alt} />;
};
export default Img;
