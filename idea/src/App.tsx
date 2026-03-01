import React, { useState } from 'react';
import { TaskCard } from './components/TaskCard';
import { FocusPanel } from './components/FocusPanel';
import { EnhancedTimerPanel } from './components/EnhancedTimerPanel';
import { EnhancedCanvasPanel } from './components/EnhancedCanvasPanel';
import { BarChart3, Brain, Users, Plus, X } from 'lucide-react';
import './App.css';


type Color = 'blue' | 'purple' | 'green';

const COLOR_TO_ICON: Record<Color, React.ReactNode> = {
  blue: <BarChart3 className="w-5 h-5 text-blue-500" />,
  purple: <Brain className="w-5 h-5 text-purple-500" />,
  green: <Users className="w-5 h-5 text-green-500" />,
};

function generateTransform(): string {
  const depth = Math.random() * 100 + 50;
  const angle = Math.random() * 30 + 5;
  return `translateZ(${depth}px) rotateY(${angle}deg)`;
}

const MARGIN_CLASSES = [
  'ml-0',
  'ml-1',
  'ml-2',
  'ml-3',
  'ml-4',
  'ml-5',
  'ml-6',
  'ml-7',
] as const;

interface TaskCardData {
  id: number;
  title: string;
  description: string;
  color: Color;
  icon: React.ReactNode;
  transform: string;
  className: string;
}

export default function App() {
  const [taskCards, setTaskCards] = useState<TaskCardData[]>([
    {
      id: 1,
      title: "Market Research",
      description: "Analyze competitor landscape, identify target demographics, and validate product-market fit assumptions.",
      color: "blue",
      icon: <BarChart3 className="w-5 h-5 text-blue-500" />,
      transform: 'translateZ(60px) rotateY(8deg)',
      className: ''
    },
    {
      id: 2,
      title: "Brainstorm AI Features",
      description: "Explore intelligent automation, personalization algorithms, and predictive analytics capabilities.",
      color: "purple",
      icon: <Brain className="w-5 h-5 text-purple-500" />,
      transform: 'translateZ(80px) rotateY(12deg)',
      className: 'ml-6'
    },
    {
      id: 3,
      title: "User Testing",
      description: "Design usability tests, gather feedback sessions, and iterate based on user insights.",
      color: "green",
      icon: <Users className="w-5 h-5 text-green-500" />,
      transform: 'translateZ(100px) rotateY(15deg)',
      className: 'ml-3'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskColor, setNewTaskColor] = useState<Color>('blue');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const resetForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskColor('blue');
    setEditingTaskId(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowAddForm(true);
  };

  const addTaskCard = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      const newTask: TaskCardData = {
        id: Date.now(),
        title: newTaskTitle,
        description: newTaskDescription,
        color: newTaskColor,
        icon: COLOR_TO_ICON[newTaskColor],
        transform: generateTransform(),
        className: MARGIN_CLASSES[Math.floor(Math.random() * MARGIN_CLASSES.length)]
      };
      
      setTaskCards([...taskCards, newTask]);
      resetForm();
      setShowAddForm(false);
    }
  };

  const deleteTaskCard = (id: number) => {
    setTaskCards(taskCards.filter(task => task.id !== id));
  };

  const editTaskCard = (id: number) => {
    setShowAddForm(true);
    const task = taskCards.find(t => t.id === id);
    if (task) {
      setEditingTaskId(id);
      setNewTaskTitle(task.title);
      setNewTaskDescription(task.description);
      setNewTaskColor(task.color);
    }
  };

  const saveTaskEdits = () => {
    if (!editingTaskId) return;
    if (!newTaskTitle.trim() || !newTaskDescription.trim()) return;
    setTaskCards(taskCards.map(task => 
      task.id === editingTaskId
        ? {
            ...task,
            title: newTaskTitle,
            description: newTaskDescription,
            color: newTaskColor,
            icon: COLOR_TO_ICON[newTaskColor],
          }
        : task
    ));
    resetForm();
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen" style={{
      '--xr-background-material': 'transparent',
      backgroundColor: 'transparent'
    }}
    enable-xr>
      <div className="relative min-h-screen pt-24" style={{ perspective: '2000px' }}>
         {showAddForm && (
           <div className="absolute top-1/2" style={{ left: '49%', transform: 'translate(-50%, -190%)', zIndex: 9999 }}>
             <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-6 h-[300px] spatial-translucent" style={{ width: '600px' }} enable-xr>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">{editingTaskId ? 'Edit Task' : 'New Task'}</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                aria-label="Close new task form"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full p-3 border border-gray-200 rounded-xl text-sm mb-4 text-white bg-white/10"
            />
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Task description..."
              className="w-full p-3 border border-gray-200 rounded-xl resize-none h-20 text-sm mb-4 text-white bg-white/10"
            />
            <div className="flex items-center gap-2 mb-4 mt-1">
              <span className="text-sm text-white">Color:</span>
              {(['blue', 'purple', 'green'] as const).map(color => (
                <button
                  key={color}
                  onClick={() => setNewTaskColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    newTaskColor === color ? 'border-gray-400' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color === 'blue' ? '#3b82f6' : color === 'purple' ? '#8b5cf6' : '#10b981' }}
                  aria-label={`Select color ${color}`}
                  type="button"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={editingTaskId ? saveTaskEdits : addTaskCard}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                type="button"
              >
                {editingTaskId ? 'Save Changes' : 'Add Task'}
              </button>
              <button
                onClick={() => { resetForm(); setShowAddForm(false); }}
                className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm hover:bg-white/30 transition-colors"
                type="button"
              >
                Cancel
              </button>
            </div>
            </div>
          </div>
        )}

        <div className="absolute top-1/2 -translate-y-1/2 space-y-6" style={{ left: '32px' }}>
          <div className="mb-4">
            <button 
              onClick={openAddForm}
              className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors shadow-lg"
              aria-label="Add task"
              type="button"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>

          {taskCards.map((task) => (
            <div
              key={task.id}
              style={{ transform: task.transform }}
              className={`relative group ${task.className}`}
            >
              <TaskCard
                title={task.title}
                description={task.description}
                color={task.color}
                icon={task.icon}
                onDelete={() => deleteTaskCard(task.id)}
                onEdit={() => editTaskCard(task.id)}
              />
            </div>
          ))}
        </div>

        <div 
          className="absolute top-1/2 z-10 transition-all duration-300"
          style={{
            left: '49%',
            transform: showAddForm ? 'translate(-50%, -50%) translateZ(0px)' : 'translate(-50%, -50%) translateZ(0px)',
          }}
        >
          <EnhancedCanvasPanel />
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 space-y-8" style={{ left: 'calc(100% - 340px)' }}>
          <div
            style={{
              transform: 'translateZ(70px) rotateY(-8deg)',
            }}
          >
            <FocusPanel />
          </div>
          
          <div
            style={{
              transform: 'translateZ(90px) rotateY(-12deg)',
            }}
          >
            <EnhancedTimerPanel />
          </div>
        </div>
      </div>
    </div>
  );
}