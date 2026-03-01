import React from "react";
import { Link } from "react-router-dom";
import { initScene } from "@webspatial/react-sdk";

export default function Start({
  isImageMode,
  setIsImageMode,
}: {
  isImageMode: string;
  setIsImageMode: (isImageMode: string) => void;
}) {
  const handleImageMode = () => {
    if (isImageMode === "VR") {
      setIsImageMode("Image");
    } else {
      setIsImageMode("VR");
    }
  };

  return (
    <>
      <div className="start-page">Start</div>
      <p>
        <Link to="/ImageMode" target="_blank">
          Open Image Mode with a Link
        </Link>
      </p>
      <p>
        <button
          onClick={() => {
            initScene("ImageMode", (prevConfig) => ({
              ...prevConfig,
              defaultSize: {
                width: 800, // Adjust width here
                height: 600, // Adjust height here
              },
            }));
            window.open(`${__XR_ENV_BASE__}ImageMode`, "ImageMode");
          }}
        >
          Open Image Mode with a Button
        </button>
        <button
          onClick={() => {
            handleImageMode();
          }}
        >
          Open {isImageMode} Mode with a Button
        </button>
      </p>
    </>
  );
}
