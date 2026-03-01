# IdeaVerse Components - Developer Guide

Complete guide for using IdeaVerse's reusable spatial components in your projects.

## Available Components

- **FocusPanel** - Daily task management with completion tracking
- **EnhancedTimerPanel** - 25-minute Pomodoro timer with progress visualization  
- **TaskCard** - 3D task cards with color coding and actions
- **EnhancedCanvasPanel** - Interactive drawing canvas with brush tools

---

## ⚡ Quick Start (5 minutes)

### **1. Install Dependencies**
```bash
npm install react react-dom lucide-react
npm install -D @types/react @types/react-dom tailwindcss
```

### **2. Copy Component**
Choose and copy any component file to your project:
```bash
# Examples:
# src/components/FocusPanel.tsx
# src/components/EnhancedTimerPanel.tsx
# src/components/TaskCard.tsx
# src/components/EnhancedCanvasPanel.tsx
```

### **3. Use in Your Project**
```tsx
import { FocusPanel } from './components/FocusPanel';

function App() {
  return (
    <div className="w-80">
      <FocusPanel />
    </div>
  );
}
```

---

## Required Styles

Add to your global CSS:
```css
.spatial-translucent {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

[enable-xr] {
  transform-style: preserve-3d;
}
```

**Tailwind Config:**
```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: { 'md': '20px' }
    }
  }
}
```

---

## Usage Examples

### **Simple Task List**
```tsx
import { FocusPanel } from './components/FocusPanel';

export default function TodoApp() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-white text-2xl mb-6">My Tasks</h1>
      <FocusPanel />
    </div>
  );
}
```

### **Pomodoro Timer**
```tsx
import { EnhancedTimerPanel } from './components/EnhancedTimerPanel';

export default function FocusApp() {
  return (
    <div className="min-h-screen bg-purple-900 p-8">
      <h1 className="text-white text-2xl mb-6">Focus Session</h1>
      <EnhancedTimerPanel />
    </div>
  );
}
```

### **3D Task Cards**
```tsx
import { TaskCard } from './components/TaskCard';
import { BarChart3 } from 'lucide-react';

export default function TaskManager() {
  return (
    <div className="min-h-screen bg-blue-900 p-8" style={{ perspective: '2000px' }}>
      <TaskCard
        title="My Task"
        description="Task description here"
        color="blue"
        icon={<BarChart3 className="w-5 h-5 text-blue-500" />}
        onEdit={() => console.log('Edit')}
        onDelete={() => console.log('Delete')}
      />
    </div>
  );
}
```

### **Drawing Canvas**
```tsx
import { EnhancedCanvasPanel } from './components/EnhancedCanvasPanel';

export default function DrawingApp() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-white text-2xl mb-6">Drawing Area</h1>
      <div className="w-[600px] h-[500px]">
        <EnhancedCanvasPanel />
      </div>
    </div>
  );
}
```

---

## Main Steps

1. ✅ **Choose a component**
2. ✅ **Copy the file
3. ✅ **Install dependencies**
4. ✅ **Import and use**
5. 🎨 **Customize as needed**

---

## Support

- **GitHub**: [IdeaVerse Repository](https://github.com/liliangisellyps/Ideaverse-WebSpatial)
- **Issues**: Use GitHub Issues to report problems

---

## License

Components are provided as examples and reference. For commercial use, contact the author.
