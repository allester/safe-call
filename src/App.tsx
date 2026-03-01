import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrainingFlow from "./TrainingFlow";
import "./App.css";

function App() {
  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/" element={<TrainingFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
