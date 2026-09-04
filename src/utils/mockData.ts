import { Board, Workspace, CanvasObject, ChecklistItem, KanbanColumn, KanbanCard, MeetingNote, ActionItem } from '@/types'

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function createMockBoards(): Board[] {
  const boards: Board[] = []

  // Mock Board 1: Meeting
  boards.push({
    id: generateId(),
    title: 'AI Claim Project – Weekly Meeting',
    description: 'Weekly sync on AI Claim processing project',
    template: 'meeting',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isFavorite: true,
    isShared: true,
    owner: 'user-1',
    sharedWith: ['user-2', 'user-3'],
    workspaces: createMockMeetingWorkspaces(),
  })

  // Mock Board 2: Project Planning
  boards.push({
    id: generateId(),
    title: 'Q4 Product Roadmap',
    description: 'Planning and tracking Q4 initiatives',
    template: 'project-planning',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isFavorite: true,
    isShared: true,
    owner: 'user-1',
    sharedWith: ['user-2', 'user-4'],
    workspaces: createMockProjectWorkspaces(),
  })

  // Mock Board 3: Brainstorming
  boards.push({
    id: generateId(),
    title: 'Design System Exploration',
    description: 'Brainstorming ideas for new design system',
    template: 'brainstorming',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isFavorite: false,
    isShared: false,
    owner: 'user-1',
    sharedWith: [],
    workspaces: createMockWhiteboardWorkspaces(),
  })

  // Mock Board 4: Kanban
  boards.push({
    id: generateId(),
    title: 'Sprint 42 - Feature Development',
    description: 'Current sprint tasks and progress',
    template: 'kanban',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
    isFavorite: false,
    isShared: true,
    owner: 'user-1',
    sharedWith: ['user-2', 'user-3', 'user-5'],
    workspaces: createMockKanbanWorkspaces(),
  })

  // Mock Board 5: Checklist
  boards.push({
    id: generateId(),
    title: 'Launch Checklist - v2.0',
    description: 'Pre-launch verification checklist',
    template: 'checklist',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isFavorite: true,
    isShared: false,
    owner: 'user-1',
    sharedWith: [],
    workspaces: createMockChecklistWorkspaces(),
  })

  return boards
}

function createMockMeetingWorkspaces(): Workspace[] {
  return [
    {
      id: generateId(),
      boardId: '',
      type: 'meeting',
      title: 'Meeting Notes',
      position: 0,
      objects: [
        {
          id: generateId(),
          type: 'text',
          x: 100,
          y: 50,
          width: 600,
          height: 400,
          rotation: 0,
          content: `AGENDA
1. Project Progress Update - John (10 min)
2. OCR Implementation Status - Wan (15 min)
3. API Integration Challenges - Sarah (10 min)
4. Timeline Review & Next Steps (5 min)

DISCUSSION
- OCR accuracy at 92%, targeting 95% by EOW
- API rate limiting issue resolved
- Need additional testing resources

DECISIONS
- Proceed with Phase 2 rollout next Monday
- Allocate extra QA resources for final testing
- Schedule daily standups through launch

ISSUES
- Performance bottleneck in batch processing (High)
- Missing test coverage for edge cases (Medium)

ACTION ITEMS
☐ Review OCR accuracy metrics - Wan - Due: 2026-09-06
☐ Complete API integration - Sarah - Due: 2026-09-07
☐ Set up monitoring dashboard - John - Due: 2026-09-08
☑ Prepare launch documentation - Mike - Due: 2026-09-05

NEXT STEPS
- Begin Phase 2 testing Monday
- Weekly check-ins through launch
- Post-launch monitoring setup`,
          color: '#ffffff',
        },
      ],
    },
    {
      id: generateId(),
      boardId: '',
      type: 'checklist',
      title: 'Meeting Checklist',
      position: 1,
      objects: [
        {
          id: generateId(),
          type: 'checklist',
          x: 50,
          y: 50,
          width: 400,
          height: 300,
          rotation: 0,
          data: {
            items: [
              { id: '1', title: 'Review OCR accuracy', completed: true, priority: 'high' },
              { id: '2', title: 'Check API integration status', completed: true, priority: 'high' },
              { id: '3', title: 'Allocate QA resources', completed: false, priority: 'high' },
              { id: '4', title: 'Schedule daily standups', completed: false, priority: 'medium' },
              { id: '5', title: 'Prepare launch documentation', completed: true, priority: 'medium' },
            ],
          },
        },
      ],
    },
  ]
}

function createMockProjectWorkspaces(): Workspace[] {
  return [
    {
      id: generateId(),
      boardId: '',
      type: 'mindmap',
      title: 'Q4 Roadmap Mind Map',
      position: 0,
      objects: [
        {
          id: generateId(),
          type: 'mindmap',
          x: 400,
          y: 200,
          width: 800,
          height: 600,
          rotation: 0,
          data: {
            root: 'Q4 Roadmap',
            nodes: [
              { text: 'Features', children: ['Auth v2', 'Real-time Sync', 'Mobile App'] },
              { text: 'Infrastructure', children: ['Database Upgrade', 'CDN Setup', 'Monitoring'] },
              { text: 'Design', children: ['Design System', 'Component Library', 'Accessibility'] },
              { text: 'Operations', children: ['Team Hiring', 'Process Documentation', 'Launch Plan'] },
            ],
          },
        },
      ],
    },
  ]
}

function createMockWhiteboardWorkspaces(): Workspace[] {
  return [
    {
      id: generateId(),
      boardId: '',
      type: 'whiteboard',
      title: 'Brainstorming Canvas',
      position: 0,
      objects: [
        {
          id: generateId(),
          type: 'sticky',
          x: 100,
          y: 100,
          width: 200,
          height: 150,
          rotation: -5,
          content: 'Minimalist Aesthetic',
          color: '#fef08a',
        },
        {
          id: generateId(),
          type: 'sticky',
          x: 350,
          y: 120,
          width: 200,
          height: 150,
          rotation: 3,
          content: 'Dark Mode Support',
          color: '#bfdbfe',
        },
        {
          id: generateId(),
          type: 'sticky',
          x: 600,
          y: 80,
          width: 200,
          height: 150,
          rotation: -8,
          content: 'Real-time Collaboration',
          color: '#bbf7d0',
        },
        {
          id: generateId(),
          type: 'text',
          x: 150,
          y: 350,
          width: 700,
          height: 100,
          rotation: 0,
          content: 'Core Design Principles:\n1. Simplicity - Remove unnecessary elements\n2. Accessibility - WCAG compliance\n3. Performance - Fast interactions\n4. Scalability - Supports teams of any size',
          color: '#f0f0f0',
        },
        {
          id: generateId(),
          type: 'rectangle',
          x: 100,
          y: 500,
          width: 150,
          height: 100,
          rotation: 0,
          strokeColor: '#3b82f6',
          strokeWidth: 2,
        },
        {
          id: generateId(),
          type: 'rectangle',
          x: 300,
          y: 500,
          width: 150,
          height: 100,
          rotation: 0,
          strokeColor: '#ef4444',
          strokeWidth: 2,
        },
      ],
    },
  ]
}

function createMockKanbanWorkspaces(): Workspace[] {
  return [
    {
      id: generateId(),
      boardId: '',
      type: 'kanban',
      title: 'Sprint Board',
      position: 0,
      objects: [
        {
          id: generateId(),
          type: 'kanban',
          x: 0,
          y: 0,
          width: 1200,
          height: 600,
          rotation: 0,
          data: {
            columns: [
              {
                id: 'col-1',
                title: 'TO DO',
                cards: [
                  {
                    id: 'card-1',
                    title: 'Implement user notifications',
                    description: 'Add email and push notification system',
                    priority: 'high',
                    assignee: 'John',
                    dueDate: new Date('2026-09-10'),
                    checklist: [
                      { id: '1', title: 'Design notification schema', completed: true },
                      { id: '2', title: 'Implement email service', completed: false },
                      { id: '3', title: 'Add push notification', completed: false },
                    ],
                  },
                  {
                    id: 'card-2',
                    title: 'Update API documentation',
                    description: 'Add missing endpoints to OpenAPI spec',
                    priority: 'medium',
                    assignee: 'Sarah',
                    dueDate: new Date('2026-09-12'),
                  },
                ],
              },
              {
                id: 'col-2',
                title: 'IN PROGRESS',
                cards: [
                  {
                    id: 'card-3',
                    title: 'Fix search performance',
                    description: 'Optimize search queries for large datasets',
                    priority: 'high',
                    assignee: 'Wan',
                    dueDate: new Date('2026-09-08'),
                    checklist: [
                      { id: '1', title: 'Add database indexes', completed: true },
                      { id: '2', title: 'Implement caching', completed: true },
                      { id: '3', title: 'Run performance tests', completed: false },
                    ],
                  },
                  {
                    id: 'card-4',
                    title: 'Design responsive layout',
                    description: 'Mobile and tablet optimizations',
                    priority: 'medium',
                    assignee: 'Mike',
                    dueDate: new Date('2026-09-09'),
                  },
                ],
              },
              {
                id: 'col-3',
                title: 'REVIEW',
                cards: [
                  {
                    id: 'card-5',
                    title: 'Authentication refactor',
                    description: 'Migrate to OAuth 2.0',
                    priority: 'high',
                    assignee: 'Alex',
                    dueDate: new Date('2026-09-07'),
                  },
                ],
              },
              {
                id: 'col-4',
                title: 'DONE',
                cards: [
                  {
                    id: 'card-6',
                    title: 'Setup monitoring',
                    description: 'Configure error tracking and logging',
                    priority: 'high',
                    assignee: 'John',
                    dueDate: new Date('2026-09-01'),
                  },
                  {
                    id: 'card-7',
                    title: 'Database migration',
                    description: 'Upgrade to PostgreSQL 14',
                    priority: 'medium',
                    assignee: 'Wan',
                    dueDate: new Date('2026-09-02'),
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ]
}

function createMockChecklistWorkspaces(): Workspace[] {
  return [
    {
      id: generateId(),
      boardId: '',
      type: 'checklist',
      title: 'Launch Checklist',
      position: 0,
      objects: [
        {
          id: generateId(),
          type: 'checklist',
          x: 50,
          y: 50,
          width: 500,
          height: 700,
          rotation: 0,
          data: {
            items: [
              // Backend
              { id: '1', title: 'Database backup verification', completed: true, priority: 'high' },
              { id: '2', title: 'Performance testing complete', completed: true, priority: 'high' },
              { id: '3', title: 'Security audit passed', completed: true, priority: 'high' },
              // Frontend
              { id: '4', title: 'Cross-browser testing', completed: true, priority: 'high' },
              { id: '5', title: 'Mobile responsiveness verified', completed: true, priority: 'high' },
              { id: '6', title: 'Accessibility compliance check', completed: false, priority: 'high' },
              // Deployment
              { id: '7', title: 'Staging environment ready', completed: true, priority: 'high' },
              { id: '8', title: 'Production infrastructure setup', completed: false, priority: 'high' },
              { id: '9', title: 'DNS and CDN configured', completed: false, priority: 'medium' },
              // Documentation
              { id: '10', title: 'API documentation complete', completed: true, priority: 'medium' },
              { id: '11', title: 'User guide published', completed: false, priority: 'medium' },
              { id: '12', title: 'Release notes prepared', completed: false, priority: 'medium' },
              // Marketing
              { id: '13', title: 'Marketing materials ready', completed: false, priority: 'medium' },
              { id: '14', title: 'Social media posts scheduled', completed: false, priority: 'low' },
              { id: '15', title: 'Email announcement drafted', completed: false, priority: 'low' },
            ],
          },
        },
      ],
    },
  ]
}
