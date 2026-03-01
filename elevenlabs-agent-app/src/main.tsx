import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import TranscriptWindow from './pages/TranscriptWindow'
import SummaryWindow from './pages/SummaryWindow'
import AudioWindow from './pages/AudioWindow'

const basename = typeof __XR_ENV_BASE__ !== 'undefined' ? __XR_ENV_BASE__ : ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="transcript" element={<TranscriptWindow />} />
          <Route path="summary" element={<SummaryWindow />} />
          <Route path="audio" element={<AudioWindow />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
