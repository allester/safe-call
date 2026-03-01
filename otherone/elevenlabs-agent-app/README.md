# ElevenLabs Agent — Web Spatial UI

A React app that runs an **ElevenLabs Conversational AI agent** over **WebRTC** with a layout inspired by ElevenLabs UI:

- **Center**: Main agent view with an animated orb that reacts to mic input and agent output
- **Right side**: Live transcript, summary, and audio level bars (mic + agent)

## Setup

1. **Install dependencies** (already done if you cloned):

   ```bash
   npm install
   ```

2. **Configure your agent**  
   Copy `.env.example` to `.env` and set your agent ID from [ElevenLabs Conversational AI](https://elevenlabs.io/app/conversational-ai):

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```
   VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
   ```

   Use a **public** agent, or implement a backend that returns a signed URL (WebSocket) or conversation token (WebRTC) and call it from the app.

3. **Enable client events (for transcript)**  
   In the ElevenLabs dashboard, open your agent → **Advanced** → enable **Client events** so `onMessage` receives transcriptions and LLM replies.

## Run

```bash
npm run dev
```

Then open the URL shown (e.g. http://localhost:5173). Allow microphone access when prompted and click **Start conversation**.

## Build

```bash
npm run build
npm run preview   # optional: preview production build
```

## Stack

- **Vite** + **React** + **TypeScript**
- **@elevenlabs/react** — `useConversation`, WebRTC, `onMessage`, volume/frequency helpers
- **Tailwind CSS** — layout and styling
- **lucide-react** — icons

## Layout

- **Center**: Agent orb (volume-reactive visualization) and Start/End call button
- **Right column**: Transcript (live), Summary (from last assistant turns), Audio (mic + agent bar visualizer)

All of this uses the same patterns as the official ElevenLabs React/UI examples (orb, transcript, bar visualizer).
