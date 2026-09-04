// Boley Board - jQuery Version
// Simple, no-build-required visual workspace

const BooleyBoard = {
    currentUser: null,
    currentBoard: null,
    currentWorkspace: null,
    boards: [],
    selectedTool: 'select',
    isMeetingMode: false,

    // Demo credentials
    validUsers: {
        'smh': 'abcd1234'
    },

    // Initialize app
    init() {
        this.checkSession();
        this.attachEventHandlers();
    },

    // Check if user is logged in
    checkSession() {
        const storedUser = sessionStorage.getItem('boley_user');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.loadUserData();
            this.showDashboard();
        } else {
            this.showLoginPage();
        }
    },

    // Show login page
    showLoginPage() {
        $('#loginView').show();
        $('#dashboard').hide();
        $('#boardView').hide();
        $('#meetingView').hide();
    },

    // Handle login
    handleLogin(email, password) {
        if (this.validUsers[email] && this.validUsers[email] === password) {
            this.currentUser = { email, name: email };
            sessionStorage.setItem('boley_user', JSON.stringify(this.currentUser));
            this.loadUserData();
            this.showDashboard();
            return true;
        }
        return false;
    },

    // Handle logout
    handleLogout() {
        if (confirm('Are you sure you want to logout? All unsaved data will be lost.')) {
            this.currentUser = null;
            this.currentBoard = null;
            this.currentWorkspace = null;
            this.boards = [];
            sessionStorage.removeItem('boley_user');
            sessionStorage.removeItem('boley_boards_' + this.currentUser?.email);
            $('#loginView').show();
            $('#dashboard').hide();
            $('#boardView').hide();
            $('#meetingView').hide();
            $('#loginForm')[0].reset();
        }
    },

    // Load user-specific data
    loadUserData() {
        const key = 'boley_boards_' + this.currentUser.email;
        const stored = sessionStorage.getItem(key);
        if (stored) {
            this.boards = JSON.parse(stored);
        } else {
            this.loadMockData();
            this.saveUserData();
        }
    },

    // Save user data to session storage
    saveUserData() {
        const key = 'boley_boards_' + this.currentUser.email;
        sessionStorage.setItem(key, JSON.stringify(this.boards));
    },

    // Mock data
    loadMockData() {
        this.boards = [
            {
                id: this.generateId(),
                title: 'AI Claim Project – Weekly Meeting',
                description: 'Weekly sync on AI Claim processing project',
                template: 'meeting',
                isFavorite: true,
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                workspaces: [
                    {
                        id: this.generateId(),
                        type: 'meeting',
                        title: 'Meeting Notes',
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
- Post-launch monitoring setup`
                    },
                    {
                        id: this.generateId(),
                        type: 'checklist',
                        title: 'Meeting Checklist',
                        items: [
                            { id: '1', title: 'Review OCR accuracy', completed: true, priority: 'high' },
                            { id: '2', title: 'Check API integration status', completed: true, priority: 'high' },
                            { id: '3', title: 'Allocate QA resources', completed: false, priority: 'high' },
                            { id: '4', title: 'Schedule daily standups', completed: false, priority: 'medium' }
                        ]
                    }
                ]
            },
            {
                id: this.generateId(),
                title: 'Q4 Product Roadmap',
                description: 'Planning and tracking Q4 initiatives',
                template: 'project',
                isFavorite: true,
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
                workspaces: [
                    {
                        id: this.generateId(),
                        type: 'kanban',
                        title: 'Sprint Board',
                        columns: [
                            {
                                id: 'col-1',
                                title: 'TO DO',
                                cards: [
                                    { id: '1', title: 'Implement notifications', priority: 'high', assignee: 'John', dueDate: '2026-09-10' },
                                    { id: '2', title: 'Update API docs', priority: 'medium', assignee: 'Sarah', dueDate: '2026-09-12' }
                                ]
                            },
                            {
                                id: 'col-2',
                                title: 'IN PROGRESS',
                                cards: [
                                    { id: '3', title: 'Fix search performance', priority: 'high', assignee: 'Wan', dueDate: '2026-09-08' }
                                ]
                            },
                            {
                                id: 'col-3',
                                title: 'REVIEW',
                                cards: [
                                    { id: '4', title: 'Auth refactor', priority: 'high', assignee: 'Alex', dueDate: '2026-09-07' }
                                ]
                            },
                            {
                                id: 'col-4',
                                title: 'DONE',
                                cards: [
                                    { id: '5', title: 'Setup monitoring', priority: 'high', assignee: 'John', dueDate: '2026-09-01' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: this.generateId(),
                title: 'Sprint 42 - Feature Development',
                description: 'Current sprint tasks and progress',
                template: 'kanban',
                isFavorite: false,
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 60 * 60 * 1000),
                workspaces: [
                    {
                        id: this.generateId(),
                        type: 'kanban',
                        title: 'Development Kanban',
                        columns: [
                            {
                                id: 'col-1',
                                title: 'TO DO',
                                cards: [
                                    { id: '1', title: 'User authentication', priority: 'high', assignee: 'Alice' },
                                    { id: '2', title: 'Database optimization', priority: 'medium', assignee: 'Bob' }
                                ]
                            },
                            {
                                id: 'col-2',
                                title: 'IN PROGRESS',
                                cards: [
                                    { id: '3', title: 'API testing', priority: 'high', assignee: 'Charlie' }
                                ]
                            },
                            {
                                id: 'col-3',
                                title: 'DONE',
                                cards: [
                                    { id: '4', title: 'Setup CI/CD', priority: 'high', assignee: 'David' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: this.generateId(),
                title: 'Launch Checklist - v2.0',
                description: 'Pre-launch verification checklist',
                template: 'checklist',
                isFavorite: true,
                createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                workspaces: [
                    {
                        id: this.generateId(),
                        type: 'checklist',
                        title: 'Launch Checklist',
                        items: [
                            { id: '1', title: 'Database backup verification', completed: true, priority: 'high' },
                            { id: '2', title: 'Performance testing complete', completed: true, priority: 'high' },
                            { id: '3', title: 'Security audit passed', completed: true, priority: 'high' },
                            { id: '4', title: 'Cross-browser testing', completed: true, priority: 'high' },
                            { id: '5', title: 'Mobile responsiveness verified', completed: true, priority: 'high' },
                            { id: '6', title: 'Accessibility compliance check', completed: false, priority: 'high' },
                            { id: '7', title: 'Staging environment ready', completed: true, priority: 'high' },
                            { id: '8', title: 'Production infrastructure setup', completed: false, priority: 'high' },
                            { id: '9', title: 'DNS and CDN configured', completed: false, priority: 'medium' }
                        ]
                    }
                ]
            }
        ];
    },

    // Event handlers
    attachEventHandlers() {
        // Login handlers
        $('#loginForm').on('submit', (e) => {
            e.preventDefault();
            const email = $('#loginEmail').val().trim();
            const password = $('#loginPassword').val();
            if (this.handleLogin(email, password)) {
                this.init();
            } else {
                alert('Invalid credentials. Please try again.\n\nDemo: smh / abcd1234');
                $('#loginPassword').val('');
            }
        });

        // Logout handler
        $('#logoutBtn').on('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });

        // Dashboard
        $('#createBoardBtn').on('click', () => this.showCreateBoardModal());
        $('#confirmCreateBoard').on('click', () => this.createBoard());

        // Template selection
        $('.template-card').on('click', function() {
            $('.template-card').removeClass('selected');
            $(this).addClass('selected');
            $('#boardTemplate').val($(this).data('template'));
        });

        // Board view
        $('#backBtn').on('click', () => this.showDashboard());
        $('#meetingModeBtn').on('click', () => this.toggleMeetingMode());

        // Tool selection
        $('.tool-btn').on('click', function() {
            $('.tool-btn').removeClass('active');
            $(this).addClass('active');
            BooleyBoard.selectedTool = $(this).data('tool');
        });

        // Meeting mode navigation
        $('#exitMeetingBtn').on('click', () => this.exitMeetingMode());
        $('#prevWorkspace').on('click', () => this.previousWorkspace());
        $('#nextWorkspace').on('click', () => this.nextWorkspace());

        // Board card clicks
        $(document).on('click', '.board-card', function() {
            const boardId = $(this).data('board-id');
            BooleyBoard.openBoard(boardId);
        });

        // Favorite button
        $(document).on('click', '.favorite-btn', function(e) {
            e.stopPropagation();
            const boardId = $(this).closest('.board-card').data('board-id');
            BooleyBoard.toggleFavorite(boardId);
        });

        // Workspace tabs
        $(document).on('click', '.workspace-tab', function() {
            const boardId = $(this).data('board-id');
            const workspaceId = $(this).data('workspace-id');
            BooleyBoard.openWorkspace(boardId, workspaceId);
        });
    },

    // Dashboard view
    showDashboard() {
        this.currentBoard = null;
        this.currentWorkspace = null;
        this.isMeetingMode = false;

        $('#loginView').hide();
        $('#boardView').hide();
        $('#meetingView').hide();
        $('#dashboard').show();

        // Update user display
        $('#currentUser').text(this.currentUser?.email || 'User');

        this.renderBoards();
    },

    renderBoards() {
        const favorites = this.boards.filter(b => b.isFavorite);
        const recent = [...this.boards].sort((a, b) => b.updatedAt - a.updatedAt);

        // Render favorites
        if (favorites.length > 0) {
            $('#favoritesSection').show();
            $('#favoriteBoards').html(favorites.map(b => this.createBoardCardHTML(b)).join(''));
        } else {
            $('#favoritesSection').hide();
        }

        // Render recent
        $('#recentBoards').html(recent.slice(0, 6).map(b => this.createBoardCardHTML(b)).join(''));

        // Render all
        $('#allBoards').html(this.boards.map(b => this.createBoardCardHTML(b)).join(''));
    },

    createBoardCardHTML(board) {
        const isFav = board.isFavorite ? 'active' : '';
        const date = new Date(board.updatedAt);
        const timeAgo = this.formatTimeAgo(date);

        return `
            <div class="col-md-6 col-lg-4">
                <div class="board-card" data-board-id="${board.id}">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div class="flex-grow-1">
                            <h5>${board.title}</h5>
                            <p>${board.description}</p>
                        </div>
                        <button class="btn btn-sm btn-link favorite-btn ${isFav}" style="text-decoration: none;">
                            <i class="fas fa-star"></i>
                        </button>
                    </div>
                    <div class="board-meta">
                        <span><i class="fas fa-calendar-alt"></i> Updated ${timeAgo}</span>
                        <span><i class="fas fa-cube"></i> ${board.workspaces.length} workspace(s)</span>
                    </div>
                    <div class="board-badges">
                        ${board.workspaces.map(w => `<span class="badge-workspace">${w.type}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    // Board management
    openBoard(boardId) {
        this.currentBoard = this.boards.find(b => b.id === boardId);
        if (!this.currentBoard) return;

        $('#dashboard').hide();
        $('#boardView').show();

        $('#boardTitle').val(this.currentBoard.title);

        this.renderWorkspaceTabs();
        if (this.currentBoard.workspaces.length > 0) {
            this.openWorkspace(boardId, this.currentBoard.workspaces[0].id);
        }
    },

    renderWorkspaceTabs() {
        const tabs = this.currentBoard.workspaces.map(ws => `
            <button class="workspace-tab" data-board-id="${this.currentBoard.id}" data-workspace-id="${ws.id}">
                <span>${this.getWorkspaceIcon(ws.type)}</span>
                ${ws.title}
            </button>
        `).join('');

        $('#workspaceTabs').html(tabs);
    },

    openWorkspace(boardId, workspaceId) {
        this.currentWorkspace = this.currentBoard.workspaces.find(w => w.id === workspaceId);
        if (!this.currentWorkspace) return;

        $(`[data-workspace-id="${workspaceId}"]`).addClass('active').siblings().removeClass('active');

        const content = this.renderWorkspaceContent(this.currentWorkspace);
        $('#canvasContent').html(content);
    },

    renderWorkspaceContent(workspace) {
        switch (workspace.type) {
            case 'meeting':
                return this.renderMeetingContent(workspace);
            case 'checklist':
                return this.renderChecklistContent(workspace);
            case 'kanban':
                return this.renderKanbanContent(workspace);
            case 'whiteboard':
                return '<canvas id="whiteboardCanvas" class="whiteboard-canvas"></canvas>';
            default:
                return '<p>Unknown workspace type</p>';
        }
    },

    renderMeetingContent(workspace) {
        return `
            <div class="meeting-notes">
                <div class="notes-content">${workspace.content || ''}</div>
            </div>
        `;
    },

    renderChecklistContent(workspace) {
        const items = workspace.items || [];
        const completed = items.filter(i => i.completed).length;
        const progress = items.length > 0 ? (completed / items.length) * 100 : 0;

        let html = `
            <div class="checklist-container">
                <div class="checklist-header">
                    <h3>${workspace.title}</h3>
                    <p class="mb-2">${completed} of ${items.length} completed</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                <div class="checklist-items">
        `;

        items.forEach(item => {
            const cls = item.completed ? 'completed' : '';
            const priorityClass = `priority-${item.priority}`;
            html += `
                <div class="checklist-item ${cls}">
                    <input type="checkbox" ${item.completed ? 'checked' : ''}>
                    <div class="item-content">
                        <div class="item-title">${item.title}</div>
                        <div class="item-meta">
                            ${item.priority ? `<span class="priority-badge ${priorityClass}">${item.priority}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div></div>`;
        return html;
    },

    renderKanbanContent(workspace) {
        const columns = workspace.columns || [];

        let html = '<div class="kanban-container">';

        columns.forEach(col => {
            html += `
                <div class="kanban-column">
                    <div class="column-header">
                        ${col.title}
                        <span class="badge bg-secondary ms-2">${(col.cards || []).length}</span>
                    </div>
                    <div class="column-cards">
            `;

            (col.cards || []).forEach(card => {
                const priorityClass = `priority-${card.priority}`;
                html += `
                    <div class="kanban-card ${priorityClass}">
                        <div class="kanban-card-title">${card.title}</div>
                        <div class="kanban-card-meta">
                            ${card.assignee ? `<span>${card.assignee}</span>` : ''}
                            ${card.dueDate ? `<span>${this.formatDate(card.dueDate)}</span>` : ''}
                        </div>
                    </div>
                `;
            });

            html += `</div></div>`;
        });

        html += '</div>';
        return html;
    },

    // Meeting Mode
    toggleMeetingMode() {
        if (!this.currentBoard) return;

        this.isMeetingMode = !this.isMeetingMode;

        if (this.isMeetingMode) {
            this.showMeetingMode();
        } else {
            this.exitMeetingMode();
        }
    },

    showMeetingMode() {
        $('#boardView').hide();
        $('#meetingView').show();

        $('#meetingTitle').text(this.currentBoard.title);
        $('#meetingDate').text(new Date().toLocaleDateString());
        $('#meetingTime').text(new Date().toLocaleTimeString());

        this.updateMeetingContent();
        this.updateDotIndicators();
    },

    updateMeetingContent() {
        if (!this.currentWorkspace) return;

        let content = '<div class="text-center text-muted py-5">';

        if (this.currentWorkspace.type === 'meeting' && this.currentWorkspace.content) {
            content = `<div class="notes-content">${this.currentWorkspace.content}</div>`;
        } else if (this.currentWorkspace.type === 'checklist') {
            const items = this.currentWorkspace.items || [];
            content = '<div>';
            items.forEach(item => {
                content += `<div class="mb-3"><input type="checkbox" ${item.completed ? 'checked' : ''}> ${item.title}</div>`;
            });
            content += '</div>';
        } else if (this.currentWorkspace.type === 'kanban') {
            const columns = this.currentWorkspace.columns || [];
            content = '<div class="d-flex gap-3">';
            columns.forEach(col => {
                content += `<div class="flex-grow-1"><h5>${col.title}</h5>`;
                (col.cards || []).slice(0, 3).forEach(card => {
                    content += `<div class="bg-dark p-2 mb-2 rounded">${card.title}</div>`;
                });
                content += '</div>';
            });
            content += '</div>';
        }

        $('#meetingContent').html(content);
    },

    updateDotIndicators() {
        const workspaces = this.currentBoard.workspaces;
        const currentIndex = workspaces.findIndex(w => w.id === this.currentWorkspace.id);

        let dots = '<div class="d-flex gap-2">';
        workspaces.forEach((ws, idx) => {
            const active = idx === currentIndex ? 'active' : '';
            dots += `<div class="dot-indicator ${active}" data-index="${idx}"></div>`;
        });
        dots += '</div>';

        $('#dotIndicators').html(dots);

        $('.dot-indicator').on('click', function() {
            const idx = $(this).data('index');
            BooleyBoard.currentWorkspace = workspaces[idx];
            BooleyBoard.updateMeetingContent();
            BooleyBoard.updateDotIndicators();
        });
    },

    previousWorkspace() {
        const workspaces = this.currentBoard.workspaces;
        const currentIndex = workspaces.findIndex(w => w.id === this.currentWorkspace.id);
        const nextIndex = (currentIndex - 1 + workspaces.length) % workspaces.length;
        this.currentWorkspace = workspaces[nextIndex];
        this.updateMeetingContent();
        this.updateDotIndicators();
    },

    nextWorkspace() {
        const workspaces = this.currentBoard.workspaces;
        const currentIndex = workspaces.findIndex(w => w.id === this.currentWorkspace.id);
        const nextIndex = (currentIndex + 1) % workspaces.length;
        this.currentWorkspace = workspaces[nextIndex];
        this.updateMeetingContent();
        this.updateDotIndicators();
    },

    exitMeetingMode() {
        this.isMeetingMode = false;
        $('#meetingView').hide();
        $('#boardView').show();
    },

    // Board creation
    showCreateBoardModal() {
        $('#boardTemplate').val('blank');
        $('.template-card').first().addClass('selected');
        const modal = new bootstrap.Modal($('#createBoardModal')[0]);
        modal.show();
    },

    createBoard() {
        const title = $('#boardTitleInput').val().trim();
        const description = $('#boardDescInput').val().trim();
        const template = $('#boardTemplate').val() || 'blank';

        if (!title) {
            alert('Please enter a board title');
            return;
        }

        const board = {
            id: this.generateId(),
            title,
            description,
            template,
            isFavorite: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            workspaces: [
                {
                    id: this.generateId(),
                    type: template === 'blank' ? 'whiteboard' : template,
                    title: this.getWorkspaceName(template),
                    items: [],
                    columns: [],
                    content: ''
                }
            ]
        };

        this.boards.push(board);
        this.saveUserData();
        bootstrap.Modal.getInstance($('#createBoardModal')[0]).hide();

        $('#boardTitleInput').val('');
        $('#boardDescInput').val('');

        this.renderBoards();
    },

    // Utilities
    toggleFavorite(boardId) {
        const board = this.boards.find(b => b.id === boardId);
        if (board) {
            board.isFavorite = !board.isFavorite;
            this.saveUserData();
            this.renderBoards();
        }
    },

    generateId() {
        return Math.random().toString(36).substring(2, 15);
    },

    getWorkspaceIcon(type) {
        const icons = {
            whiteboard: '✏️',
            checklist: '✓',
            kanban: '📋',
            mindmap: '🧠',
            meeting: '📅'
        };
        return icons[type] || '📝';
    },

    getWorkspaceName(template) {
        const names = {
            blank: 'Whiteboard',
            meeting: 'Meeting Notes',
            project: 'Project Plan',
            kanban: 'Kanban Board',
            brainstorm: 'Brainstorming',
            checklist: 'Checklist'
        };
        return names[template] || 'Workspace';
    },

    formatTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString();
    },

    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
};

// Initialize when ready
$(document).ready(() => {
    BooleyBoard.init();
});
