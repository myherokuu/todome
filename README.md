# Boley Board

A modern, production-quality visual workspace application for meetings, brainstorming, project planning, and task management.

## Overview

Boley Board combines the best features of digital whiteboards, sticky notes, checklists, Kanban boards, mind maps, and meeting note tools into a single, unified visual workspace. It's designed for teams to think, discuss, plan, and execute together in real-time.

## Features

### Core Workspaces
- **Whiteboard**: Freeform canvas for drawing diagrams, sketching ideas, and explaining concepts
- **Checklist**: Task management with priorities, assignees, and due dates
- **Kanban Board**: Drag-and-drop columns for workflow management (TO DO → IN PROGRESS → REVIEW → DONE)
- **Mind Map**: Central topic with branching ideas and concepts
- **Meeting Notes**: Structured meeting documentation with agenda, discussion, decisions, and action items

### Key Capabilities
- **Infinite Canvas**: Zoom, pan, and organize unlimited objects on the workspace
- **Object System**: Text, sticky notes, shapes, images, and task-based objects that support drag, resize, rotate, and connect
- **Meeting Mode**: Clean presentation interface for displaying boards during meetings
- **Real-time Collaboration**: Share boards, view-only and editor permissions, comments, and mentions
- **Export Options**: PNG, PDF, meeting summaries, and meeting minutes
- **Responsive Design**: Full experience on desktop and tablet

### Dashboard
- Create new boards with templates
- Favorite/bookmark important boards
- View recent, shared, and all boards
- Search and organize workspace
- Share boards with team members

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx                 # Main dashboard view
│   ├── Board.tsx                     # Board workspace view
│   ├── common/                       # Reusable components
│   │   ├── Button.tsx
│   │   └── BoardCard.tsx
│   ├── board/                        # Board-specific components
│   │   ├── Toolbar.tsx               # Drawing tool selector
│   │   ├── Canvas.tsx                # Main canvas router
│   │   ├── WorkspaceTab.tsx          # Workspace tabs
│   │   ├── MeetingMode.tsx           # Meeting presentation view
│   │   └── workspaces/               # Workspace-specific canvases
│   │       ├── WhiteboardCanvas.tsx
│   │       ├── ChecklistCanvas.tsx
│   │       ├── KanbanCanvas.tsx
│   │       ├── MindMapCanvas.tsx
│   │       └── MeetingCanvas.tsx
│   └── modals/
│       └── CreateBoardModal.tsx
├── store/
│   └── boardStore.ts                 # Zustand state management
├── types/
│   └── index.ts                      # TypeScript type definitions
├── utils/
│   └── mockData.ts                   # Mock data and utilities
├── App.tsx                           # Main app component
├── main.tsx                          # Entry point
└── index.css                         # Global styles
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons
- **Canvas**: HTML5 Canvas API with Konva.js support
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Demo Data

The application comes with realistic sample data including:
- 5 pre-configured boards with different templates
- Meeting notes with agendas and action items
- Kanban boards with sample cards and assignments
- Checklists with priority levels and due dates
- Mind maps with hierarchical structures
- Whiteboard with sticky notes and shapes

## Test Credentials

```
Email: smh
Password: abcd1234
```

## Feature Roadmap

### Phase 1 (Current)
- ✅ Dashboard with board management
- ✅ Multi-workspace support
- ✅ Whiteboard, Checklist, Kanban, Mind Map, Meeting Notes
- ✅ Meeting Mode presentation view
- ✅ Basic object system

### Phase 2
- 🔄 AI Assistant for summarization and task extraction
- 🔄 Real-time collaboration
- 🔄 Export functionality (PDF, PNG, minutes)
- 🔄 Advanced permissions and sharing

### Phase 3
- 📋 Mobile app support
- 📋 Custom templates
- 📋 Activity history and version control
- 📋 Advanced search and filtering

## Architecture Decisions

1. **Zustand for State**: Lightweight, easy to understand state management without boilerplate
2. **Canvas API**: Direct control over rendering for performance and flexibility
3. **Component-based**: Separate canvas implementations per workspace type for clarity
4. **Mock Data**: Realistic sample data to demonstrate full functionality
5. **Responsive Design**: Mobile-first approach with Tailwind CSS

## Performance Considerations

- Canvas-based rendering for whiteboard (efficient for many objects)
- Virtual scrolling for kanban columns (future optimization)
- Lazy loading of workspaces
- Optimized re-renders with Zustand selectors

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

The codebase follows these principles:
- Keep components focused and composable
- Use TypeScript for type safety
- Follow existing code style
- Add unit tests for new features
- Keep UI consistent with Tailwind design system

## License

MIT License - See LICENSE file for details
