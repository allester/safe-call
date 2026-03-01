import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrainingFlow from "./TrainingFlow";
<<<<<<< HEAD
import ImagePage from "./imagePage/image";
import Start from "./Start/start";
=======

>>>>>>> de4e6165263f735746e3c32e608b846d131e0964
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [isImageMode, setIsImageMode] = useState(
    () => localStorage.getItem("isImageMode") || "VR"
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isImageMode" && e.newValue) {
        setIsImageMode(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSetIsImageMode = (newVal: string) => {
    setIsImageMode(newVal);
    localStorage.setItem("isImageMode", newVal);
  };

  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/" element={<Start isImageMode={isImageMode} setIsImageMode={handleSetIsImageMode} />} />
        <Route path="ImageMode" element={<ImagePage isImageMode={isImageMode} setIsImageMode={handleSetIsImageMode} />} />
        <Route path="error" element={<TrainingFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
