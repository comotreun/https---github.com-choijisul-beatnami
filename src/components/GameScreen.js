import React, { useEffect, useState } from "react";
import pondimg from '../assets/img/pond.png';

const GameScreen = ({ ScreenName }) => {
  const [images, setImages] = useState([]); // 이미지를 위한 상태
  const imageWidth = 50; // 이미지 너비 (픽셀 단위)

  // 이미지를 생성하는 useEffect
  useEffect(() => {
    const createImageInterval = setInterval(() => {
      setImages((prevImages) => [
        ...prevImages,
        { id: Date.now(), left: 0 }
      ]);
    }, 400); // 0.4초마다 실행 (4초 동안 10개의 이미지 생성)

    return () => clearInterval(createImageInterval); // 컴포넌트 언마운트 시 인터벌 정지
  }, []);

  // 이미지를 움직이는 useEffect
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setImages((prevImages) => 
        prevImages.map(image => {
          const containerPixelWidth = document.querySelector('.image-container').offsetWidth;
          return {
            ...image,
            left: containerPixelWidth - imageWidth // 이미지가 컨테이너 끝까지 이동
          };
        })
      );
    }, 500); // 0.5초마다 실행

    return () => clearInterval(moveInterval); // 컴포넌트 언마운트 시 인터벌 정지
  }, []);

  return (
    <div>
      <div
        className="image-container"
        style={{
          width: '100%', // 컨테이너 너비를 최대 너비로 설정
          height: 500,
          border: "1px solid black",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {images.map((image) => (
          <img
            key={image.id}
            src={pondimg} // 이미지 경로
            alt="Moving"
            style={{
              position: "absolute",
              left: image.left,
              transition: "left 1s linear", // 0.5초 동안 이동
            }}
          />
        ))}
      </div>
      <button onClick={ScreenName}>랭킹으로 넘어감</button> {/* 버튼 클릭 시 ScreenName 호출 */}
    </div>
  );
};

export default GameScreen;
