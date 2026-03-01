import React from "react";

export default function ImagePage({
  isImageMode,
  setIsImageMode,
}: {
  isImageMode: string;
  setIsImageMode: (isImageMode: string) => void;
}) {
  return (
    <div style={{ padding: "20px", color: "white", fontSize: "24px" }}>
      <div>Imadassdsdadsge</div>
      <p> open {isImageMode} Mode with a Button</p>
    </div>
  );
}
