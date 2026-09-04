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

    // Whiteboard interaction state (not persisted)
    wbDrag: null,
    selectedElementId: null,

    // Extract page coordinates from either a mouse or touch event so every
    // whiteboard drag handler works the same on desktop and touchscreens
    eventPoint(e) {
        const oe = e.originalEvent || e;
        if (oe.touches && oe.touches.length > 0) {
            return { pageX: oe.touches[0].pageX, pageY: oe.touches[0].pageY };
        }
        if (oe.changedTouches && oe.changedTouches.length > 0) {
            return { pageX: oe.changedTouches[0].pageX, pageY: oe.changedTouches[0].pageY };
        }
        return { pageX: e.pageX, pageY: e.pageY };
    },

    // Escape user-supplied text before injecting into HTML strings
    escapeHtml(str) {
        return String(str ?? '').replace(/[&<>"']/g, ch => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[ch]));
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
    handleLogin(username, password) {
        if (this.validUsers[username] && this.validUsers[username] === password) {
            this.currentUser = { username, name: username };
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
            const username = this.currentUser?.username;
            this.currentUser = null;
            this.currentBoard = null;
            this.currentWorkspace = null;
            this.boards = [];
            sessionStorage.removeItem('boley_user');
            if (username) {
                sessionStorage.removeItem('boley_boards_' + username);
            }
            $('#loginView').show();
            $('#dashboard').hide();
            $('#boardView').hide();
            $('#meetingView').hide();
            $('#loginForm')[0].reset();
        }
    },

    // Load user-specific data
    loadUserData() {
        const key = 'boley_boards_' + this.currentUser.username;
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
        const key = 'boley_boards_' + this.currentUser.username;
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
        $(document).off('submit', '#loginForm').on('submit', '#loginForm', (e) => {
            e.preventDefault();
            const usernameField = $('#loginUsername');
            const passwordField = $('#loginPassword');

            if (usernameField.length === 0 || passwordField.length === 0) {
                alert('Form elements not found. Please refresh the page.');
                return;
            }

            const username = usernameField.val() ? usernameField.val().trim() : '';
            const password = passwordField.val() ? passwordField.val() : '';

            if (!username || !password) {
                alert('Please enter both username and password.');
                return;
            }

            if (this.handleLogin(username, password)) {
                this.attachEventHandlers();
                this.showDashboard();
            } else {
                alert('Invalid credentials. Please try again.\n\nDemo: smh / abcd1234');
                passwordField.val('');
                usernameField.focus();
            }
        });

        // Logout handler
        $(document).off('click', '#logoutBtn').on('click', '#logoutBtn', (e) => {
            e.preventDefault();
            this.handleLogout();
        });

        // Dashboard
        $(document).off('click', '#createBoardBtn').on('click', '#createBoardBtn', () => this.showCreateBoardModal());
        $(document).off('click', '#confirmCreateBoard').on('click', '#confirmCreateBoard', () => this.createBoard());

        // Template selection
        $(document).off('click', '.template-card').on('click', '.template-card', function() {
            $('.template-card').removeClass('selected');
            $(this).addClass('selected');
            $('#boardTemplate').val($(this).data('template'));
        });

        // Board view
        $(document).off('click', '#backBtn').on('click', '#backBtn', () => this.showDashboard());
        $(document).off('click', '#meetingModeBtn').on('click', '#meetingModeBtn', () => this.toggleMeetingMode());

        // Tool selection
        $(document).off('click', '.tool-btn').on('click', '.tool-btn', function() {
            const tool = $(this).data('tool');
            if (tool === 'mindmap') {
                alert('Mind Map view is not built yet. Try Sticky Notes, Rectangle, Circle or Arrow to sketch ideas spatially in the meantime.');
                return;
            }
            $('.tool-btn').removeClass('active');
            $(this).addClass('active');
            BooleyBoard.selectedTool = tool;
            BooleyBoard.deselectWhiteboardElement();
            $('#whiteboardCanvas').attr('class', 'whiteboard-canvas tool-' + BooleyBoard.selectedTool);
        });

        // Meeting mode navigation
        $(document).off('click', '#exitMeetingBtn').on('click', '#exitMeetingBtn', () => this.exitMeetingMode());
        $(document).off('click', '#prevWorkspace').on('click', '#prevWorkspace', () => this.previousWorkspace());
        $(document).off('click', '#nextWorkspace').on('click', '#nextWorkspace', () => this.nextWorkspace());

        // Board card clicks
        $(document).off('click', '.board-card').on('click', '.board-card', function() {
            const boardId = $(this).data('board-id');
            BooleyBoard.openBoard(boardId);
        });

        // Favorite button
        $(document).off('click', '.favorite-btn').on('click', '.favorite-btn', function(e) {
            e.stopPropagation();
            const boardId = $(this).closest('.board-card').data('board-id');
            BooleyBoard.toggleFavorite(boardId);
        });

        // Workspace tabs
        $(document).off('click', '.workspace-tab').on('click', '.workspace-tab', function() {
            const boardId = $(this).data('board-id');
            const workspaceId = $(this).data('workspace-id');
            BooleyBoard.openWorkspace(boardId, workspaceId);
        });

        // Board title edit
        $(document).off('change', '#boardTitle').on('change', '#boardTitle', (e) => {
            if (this.currentBoard) {
                this.currentBoard.title = $(e.target).val();
                this.currentBoard.updatedAt = new Date();
                this.saveUserData();
            }
        });

        // Delete board
        $(document).off('click', '#deleteBtn').on('click', '#deleteBtn', () => {
            if (this.currentBoard && confirm('Delete this board? This cannot be undone.')) {
                this.boards = this.boards.filter(b => b.id !== this.currentBoard.id);
                this.saveUserData();
                this.showDashboard();
            }
        });

        // Checklist item checkbox
        $(document).off('change', '.checklist-item input[type="checkbox"]').on('change', '.checklist-item input[type="checkbox"]', function() {
            if (!BooleyBoard.currentWorkspace) return;
            const items = BooleyBoard.currentWorkspace.items || [];
            const itemId = $(this).closest('.checklist-item').data('item-id');
            const item = items.find(i => i.id === itemId);
            if (item) {
                item.completed = $(this).is(':checked');
                BooleyBoard.currentBoard.updatedAt = new Date();
                BooleyBoard.saveUserData();
                BooleyBoard.openWorkspace(BooleyBoard.currentBoard.id, BooleyBoard.currentWorkspace.id);
            }
        });

        // Add checklist item
        $(document).off('click', '#addChecklistBtn').on('click', '#addChecklistBtn', () => {
            if (!this.currentWorkspace) return;
            const items = this.currentWorkspace.items || [];
            items.push({
                id: this.generateId(),
                title: 'New item',
                completed: false,
                priority: 'medium'
            });
            this.currentBoard.updatedAt = new Date();
            this.saveUserData();
            this.openWorkspace(this.currentBoard.id, this.currentWorkspace.id);
        });

        // Delete checklist item
        $(document).off('click', '.delete-item-btn').on('click', '.delete-item-btn', function() {
            if (!BooleyBoard.currentWorkspace) return;
            const items = BooleyBoard.currentWorkspace.items || [];
            const itemId = $(this).closest('.checklist-item').data('item-id');
            const idx = items.findIndex(i => i.id === itemId);
            if (idx >= 0) {
                items.splice(idx, 1);
                BooleyBoard.currentBoard.updatedAt = new Date();
                BooleyBoard.saveUserData();
                BooleyBoard.openWorkspace(BooleyBoard.currentBoard.id, BooleyBoard.currentWorkspace.id);
            }
        });

        // Edit checklist item title
        $(document).off('blur', '.item-title').on('blur', '.item-title', function() {
            if (!BooleyBoard.currentWorkspace) return;
            const items = BooleyBoard.currentWorkspace.items || [];
            const itemId = $(this).closest('.checklist-item').data('item-id');
            const item = items.find(i => i.id === itemId);
            if (item) {
                item.title = $(this).text().trim() || 'Untitled item';
                BooleyBoard.currentBoard.updatedAt = new Date();
                BooleyBoard.saveUserData();
            }
        });

        // Add kanban card
        $(document).off('click', '.add-card-btn').on('click', '.add-card-btn', function() {
            if (!BooleyBoard.currentWorkspace) return;
            const colId = $(this).closest('.kanban-column').data('col-id');
            const columns = BooleyBoard.currentWorkspace.columns || [];
            const col = columns.find(c => c.id === colId);
            if (col) {
                col.cards = col.cards || [];
                col.cards.push({
                    id: BooleyBoard.generateId(),
                    title: 'New task',
                    priority: 'medium',
                    assignee: '',
                    dueDate: ''
                });
                BooleyBoard.currentBoard.updatedAt = new Date();
                BooleyBoard.saveUserData();
                BooleyBoard.openWorkspace(BooleyBoard.currentBoard.id, BooleyBoard.currentWorkspace.id);
            }
        });

        // Delete kanban card
        $(document).off('click', '.delete-card-btn').on('click', '.delete-card-btn', function() {
            if (!BooleyBoard.currentWorkspace) return;
            const colId = $(this).closest('.kanban-column').data('col-id');
            const cardId = $(this).closest('.kanban-card').data('card-id');
            const columns = BooleyBoard.currentWorkspace.columns || [];
            const col = columns.find(c => c.id === colId);
            if (col && col.cards) {
                const idx = col.cards.findIndex(c => c.id === cardId);
                if (idx >= 0) {
                    col.cards.splice(idx, 1);
                    BooleyBoard.currentBoard.updatedAt = new Date();
                    BooleyBoard.saveUserData();
                    BooleyBoard.openWorkspace(BooleyBoard.currentBoard.id, BooleyBoard.currentWorkspace.id);
                }
            }
        });

        // Edit meeting notes
        $(document).off('blur', '.notes-content').on('blur', '.notes-content', function() {
            if (BooleyBoard.currentWorkspace && BooleyBoard.currentWorkspace.type === 'meeting') {
                BooleyBoard.currentWorkspace.content = $(this).text();
                BooleyBoard.currentBoard.updatedAt = new Date();
                BooleyBoard.saveUserData();
            }
        });

        // Edit kanban card title
        $(document).off('blur', '.kanban-card-title').on('blur', '.kanban-card-title', function() {
            if (!BooleyBoard.currentWorkspace) return;
            const colId = $(this).closest('.kanban-column').data('col-id');
            const cardId = $(this).closest('.kanban-card').data('card-id');
            const columns = BooleyBoard.currentWorkspace.columns || [];
            const col = columns.find(c => c.id === colId);
            const card = col && (col.cards || []).find(c => c.id === cardId);
            if (card) {
                card.title = $(this).text().trim() || 'Untitled task';
                BooleyBoard.currentBoard.updatedAt = new Date();
                BooleyBoard.saveUserData();
            }
        });

        // Whiteboard: start placing/drawing on the canvas (mouse + touch)
        $(document).off('mousedown touchstart', '#whiteboardCanvas').on('mousedown touchstart', '#whiteboardCanvas', function(e) {
            if ($(e.target).closest('.wb-element, .wb-delete-btn, .wb-svg-el').length) return;

            BooleyBoard.deselectWhiteboardElement();

            const tool = BooleyBoard.selectedTool;
            if (tool === 'select') return;

            e.preventDefault();
            const pt = BooleyBoard.eventPoint(e);
            const offset = $(this).offset();
            const x = pt.pageX - offset.left;
            const y = pt.pageY - offset.top;

            if (tool === 'sticky' || tool === 'text') {
                BooleyBoard.addWhiteboardElement({
                    type: tool,
                    x: x - (tool === 'sticky' ? 90 : 60),
                    y: y - (tool === 'sticky' ? 70 : 20),
                    width: tool === 'sticky' ? 180 : 140,
                    height: tool === 'sticky' ? 140 : 40,
                    text: ''
                });
                return;
            }

            if (['rectangle', 'circle', 'arrow', 'pen'].includes(tool)) {
                BooleyBoard.wbDrag = { tool, startX: x, startY: y, points: [{ x, y }] };
            }
        });

        // Whiteboard: track drag for shapes/pen/arrow (mouse + touch)
        $(document).off('mousemove.wb touchmove.wb').on('mousemove.wb touchmove.wb', function(e) {
            if (!BooleyBoard.wbDrag) return;
            const $canvas = $('#whiteboardCanvas');
            if ($canvas.length === 0) { BooleyBoard.wbDrag = null; return; }
            e.preventDefault();
            const pt = BooleyBoard.eventPoint(e);
            const offset = $canvas.offset();
            BooleyBoard.updateWbDragPreview(pt.pageX - offset.left, pt.pageY - offset.top);
        });

        // Whiteboard: finish drag and commit the new element (mouse + touch)
        $(document).off('mouseup.wb touchend.wb touchcancel.wb').on('mouseup.wb touchend.wb touchcancel.wb', function(e) {
            if (!BooleyBoard.wbDrag) return;
            const drag = BooleyBoard.wbDrag;
            BooleyBoard.wbDrag = null;
            $('#wbPreview, #wbPreviewPoly, #wbPreviewLine').remove();

            const $canvas = $('#whiteboardCanvas');
            if ($canvas.length === 0) return;
            const pt = BooleyBoard.eventPoint(e);
            const offset = $canvas.offset();
            const x = pt.pageX - offset.left;
            const y = pt.pageY - offset.top;

            if (drag.tool === 'pen') {
                if (drag.points.length > 1) {
                    BooleyBoard.addWhiteboardElement({ type: 'pen', points: drag.points });
                }
                return;
            }

            if (drag.tool === 'arrow') {
                if (Math.abs(x - drag.startX) > 3 || Math.abs(y - drag.startY) > 3) {
                    BooleyBoard.addWhiteboardElement({ type: 'arrow', points: [{ x: drag.startX, y: drag.startY }, { x, y }] });
                }
                return;
            }

            // rectangle / circle
            const width = Math.abs(x - drag.startX);
            const height = Math.abs(y - drag.startY);
            if (width < 5 || height < 5) return;
            BooleyBoard.addWhiteboardElement({
                type: drag.tool,
                x: Math.min(x, drag.startX),
                y: Math.min(y, drag.startY),
                width, height
            });
        });

        // Whiteboard: select and drag-move an existing element (mouse + touch)
        $(document).off('mousedown touchstart', '.wb-element').on('mousedown touchstart', '.wb-element', function(e) {
            if (BooleyBoard.selectedTool !== 'select') return;
            if ($(e.target).closest('.wb-delete-btn').length) return;

            const id = $(this).data('el-id');
            BooleyBoard.selectWhiteboardElement(id);

            // Tapping into the editable text should just place the cursor, not start a drag
            if ($(e.target).closest('.wb-text').length) return;

            e.preventDefault();
            e.stopPropagation();

            const el = BooleyBoard.getWhiteboardElement(id);
            if (!el) return;
            const startPt = BooleyBoard.eventPoint(e);
            const startElX = el.x, startElY = el.y;
            let moved = false;

            $(document).on('mousemove.wbmove touchmove.wbmove', function(ev) {
                const movePt = BooleyBoard.eventPoint(ev);
                const dx = movePt.pageX - startPt.pageX;
                const dy = movePt.pageY - startPt.pageY;
                if (!moved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) moved = true;
                if (moved) {
                    ev.preventDefault();
                    el.x = startElX + dx;
                    el.y = startElY + dy;
                    $(`.wb-element[data-el-id="${id}"]`).css({ left: el.x + 'px', top: el.y + 'px' });
                }
            });
            $(document).on('mouseup.wbmove touchend.wbmove touchcancel.wbmove', function() {
                $(document).off('mousemove.wbmove touchmove.wbmove mouseup.wbmove touchend.wbmove touchcancel.wbmove');
                if (moved) {
                    BooleyBoard.currentBoard.updatedAt = new Date();
                    BooleyBoard.saveUserData();
                }
            });
        });

        // Whiteboard: select a pen stroke or arrow
        $(document).off('click', '.wb-svg-el').on('click', '.wb-svg-el', function(e) {
            if (BooleyBoard.selectedTool !== 'select') return;
            e.stopPropagation();
            BooleyBoard.selectWhiteboardElement($(this).data('el-id'));
        });

        // Whiteboard: double-click a pen stroke or arrow to delete it
        // (SVG strokes have no bounding box to anchor an on-canvas delete
        // button, so this plus Delete/Backspace on a selected stroke are
        // the two ways to remove one)
        $(document).off('dblclick', '.wb-svg-el').on('dblclick', '.wb-svg-el', function(e) {
            e.stopPropagation();
            BooleyBoard.deleteWhiteboardElement($(this).data('el-id'));
        });

        // Whiteboard: delete an element
        $(document).off('click', '.wb-delete-btn').on('click', '.wb-delete-btn', function(e) {
            e.stopPropagation();
            BooleyBoard.deleteWhiteboardElement($(this).closest('.wb-element').data('el-id'));
        });

        // Whiteboard: save sticky/text edits
        $(document).off('blur', '.wb-text').on('blur', '.wb-text', function() {
            const id = $(this).closest('.wb-element').data('el-id');
            const el = BooleyBoard.getWhiteboardElement(id);
            if (el) {
                el.text = $(this).text();
                BooleyBoard.currentBoard.updatedAt = new Date();
                BooleyBoard.saveUserData();
            }
        });

        // Whiteboard: delete selected element with Delete/Backspace
        $(document).off('keydown.wbdelete').on('keydown.wbdelete', function(e) {
            if (!BooleyBoard.selectedElementId) return;
            const tag = (e.target.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || $(e.target).attr('contenteditable') === 'true') return;
            if (e.key === 'Delete' || e.key === 'Backspace') {
                e.preventDefault();
                BooleyBoard.deleteWhiteboardElement(BooleyBoard.selectedElementId);
            }
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
        $('#currentUser').text(this.currentUser?.username || 'User');

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
        const esc = this.escapeHtml.bind(this);

        return `
            <div class="col-md-6 col-lg-4">
                <div class="board-card" data-board-id="${board.id}">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div class="flex-grow-1">
                            <h5>${esc(board.title)}</h5>
                            <p>${esc(board.description)}</p>
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
                        ${board.workspaces.map(w => `<span class="badge-workspace">${esc(w.type)}</span>`).join('')}
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
                ${this.escapeHtml(ws.title)}
            </button>
        `).join('');

        $('#workspaceTabs').html(tabs);
    },

    openWorkspace(boardId, workspaceId) {
        this.currentWorkspace = this.currentBoard.workspaces.find(w => w.id === workspaceId);
        if (!this.currentWorkspace) return;

        this.selectedElementId = null;
        this.wbDrag = null;

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
                return this.renderWhiteboardContent(workspace);
            default:
                return '<p class="text-center text-muted py-5">Unknown workspace type</p>';
        }
    },

    renderMeetingContent(workspace) {
        const text = workspace.content ? this.escapeHtml(workspace.content) : 'Click to edit meeting notes...';
        return `
            <div class="meeting-notes">
                <div class="notes-content" contenteditable="true" spellcheck="false" style="min-height: 300px; padding: 15px; background: #f8f9fa; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word;">${text}</div>
            </div>
        `;
    },

    renderChecklistContent(workspace) {
        const items = workspace.items || [];
        const completed = items.filter(i => i.completed).length;
        const progress = items.length > 0 ? (completed / items.length) * 100 : 0;
        const esc = this.escapeHtml.bind(this);

        let html = `
            <div class="checklist-container">
                <div class="checklist-header">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h3>${esc(workspace.title)}</h3>
                        <button class="btn btn-sm btn-primary" id="addChecklistBtn">
                            <i class="fas fa-plus"></i> Add Item
                        </button>
                    </div>
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
                <div class="checklist-item ${cls}" data-item-id="${item.id}">
                    <input type="checkbox" ${item.completed ? 'checked' : ''}>
                    <div class="item-content">
                        <div class="item-title" contenteditable="true" spellcheck="false">${esc(item.title)}</div>
                        <div class="item-meta">
                            ${item.priority ? `<span class="priority-badge ${priorityClass}">${esc(item.priority)}</span>` : ''}
                        </div>
                    </div>
                    <button class="btn btn-sm btn-link delete-item-btn" style="text-decoration: none;">
                        <i class="fas fa-trash text-danger"></i>
                    </button>
                </div>
            `;
        });

        html += `</div></div>`;
        return html;
    },

    renderKanbanContent(workspace) {
        const columns = workspace.columns || [];
        const esc = this.escapeHtml.bind(this);

        let html = '<div class="kanban-container">';

        columns.forEach(col => {
            html += `
                <div class="kanban-column" data-col-id="${col.id}">
                    <div class="column-header">
                        <div>${esc(col.title)}</div>
                        <span class="badge bg-secondary ms-2">${(col.cards || []).length}</span>
                    </div>
                    <div class="column-cards">
            `;

            (col.cards || []).forEach(card => {
                const priorityClass = `priority-${card.priority}`;
                html += `
                    <div class="kanban-card ${priorityClass}" data-card-id="${card.id}">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div class="kanban-card-title flex-grow-1" contenteditable="true" spellcheck="false">${esc(card.title)}</div>
                            <button class="btn btn-sm btn-link delete-card-btn" style="text-decoration: none; padding: 0;">
                                <i class="fas fa-times text-danger"></i>
                            </button>
                        </div>
                        <div class="kanban-card-meta">
                            ${card.assignee ? `<span>${esc(card.assignee)}</span>` : ''}
                            ${card.dueDate ? `<span>${esc(this.formatDate(card.dueDate))}</span>` : ''}
                        </div>
                    </div>
                `;
            });

            html += `
                    <button class="btn btn-sm btn-outline-secondary w-100 mt-2 add-card-btn">
                    <i class="fas fa-plus"></i> Add Card
                </button>
                </div></div>`;
        });

        html += '</div>';
        return html;
    },

    // Whiteboard
    renderWhiteboardContent(workspace) {
        workspace.elements = workspace.elements || [];
        let svgInner = '';
        let divsHtml = '';
        workspace.elements.forEach(el => {
            if (el.type === 'pen' || el.type === 'arrow') {
                svgInner += this.renderWhiteboardSvgShape(el);
            } else {
                divsHtml += this.renderWhiteboardElementHTML(el);
            }
        });
        return `
            <div id="whiteboardCanvas" class="whiteboard-canvas tool-${this.selectedTool}">
                <svg class="wb-svg-layer">
                    <defs>
                        <marker id="wb-arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L9,3 z" fill="#0f172a"></path>
                        </marker>
                    </defs>
                    ${svgInner}
                </svg>
                ${divsHtml}
                ${workspace.elements.length === 0 ? '<div class="wb-empty-hint text-muted">Pick a tool on the left, then click (or click-drag) on the canvas to start drawing</div>' : ''}
            </div>
        `;
    },

    renderWhiteboardElementHTML(el) {
        const esc = this.escapeHtml.bind(this);
        const selectedCls = el.id === this.selectedElementId ? 'selected' : '';
        const style = `left:${el.x}px; top:${el.y}px; width:${el.width}px; height:${el.height}px;`;

        if (el.type === 'sticky') {
            return `<div class="wb-element wb-sticky ${selectedCls}" data-el-id="${el.id}" style="${style}">
                <div class="wb-text" contenteditable="true" spellcheck="false">${esc(el.text || '')}</div>
                <button class="wb-delete-btn" title="Delete"><i class="fas fa-times"></i></button>
            </div>`;
        }
        if (el.type === 'text') {
            return `<div class="wb-element wb-text-box ${selectedCls}" data-el-id="${el.id}" style="${style}">
                <div class="wb-text" contenteditable="true" spellcheck="false">${esc(el.text || '')}</div>
                <button class="wb-delete-btn" title="Delete"><i class="fas fa-times"></i></button>
            </div>`;
        }
        if (el.type === 'rectangle') {
            return `<div class="wb-element wb-shape-rect ${selectedCls}" data-el-id="${el.id}" style="${style}">
                <button class="wb-delete-btn" title="Delete"><i class="fas fa-times"></i></button>
            </div>`;
        }
        if (el.type === 'circle') {
            return `<div class="wb-element wb-shape-circle ${selectedCls}" data-el-id="${el.id}" style="${style}">
                <button class="wb-delete-btn" title="Delete"><i class="fas fa-times"></i></button>
            </div>`;
        }
        return '';
    },

    renderWhiteboardSvgShape(el) {
        const isSelected = el.id === this.selectedElementId;
        const stroke = isSelected ? '#667eea' : '#0f172a';
        const strokeWidth = isSelected ? 3 : 2;
        if (el.type === 'pen') {
            const points = (el.points || []).map(p => `${p.x},${p.y}`).join(' ');
            return `<polyline points="${points}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" data-el-id="${el.id}" class="wb-svg-el"></polyline>`;
        }
        if (el.type === 'arrow') {
            const p = el.points && el.points.length === 2 ? el.points : [{ x: 0, y: 0 }, { x: 0, y: 0 }];
            return `<line x1="${p[0].x}" y1="${p[0].y}" x2="${p[1].x}" y2="${p[1].y}" stroke="${stroke}" stroke-width="${strokeWidth}" marker-end="url(#wb-arrowhead)" data-el-id="${el.id}" class="wb-svg-el"></line>`;
        }
        return '';
    },

    getWhiteboardElement(id) {
        if (!this.currentWorkspace) return null;
        return (this.currentWorkspace.elements || []).find(el => el.id === id) || null;
    },

    addWhiteboardElement(partial) {
        if (!this.currentWorkspace) return;
        this.currentWorkspace.elements = this.currentWorkspace.elements || [];
        const el = { id: this.generateId(), ...partial };
        this.currentWorkspace.elements.push(el);
        this.currentBoard.updatedAt = new Date();
        this.saveUserData();

        this.selectedTool = 'select';
        $('.tool-btn').removeClass('active');
        $('.tool-btn[data-tool="select"]').addClass('active');

        this.openWorkspace(this.currentBoard.id, this.currentWorkspace.id);

        if (el.type === 'sticky' || el.type === 'text') {
            setTimeout(() => $(`.wb-element[data-el-id="${el.id}"] .wb-text`).trigger('focus'), 0);
        }
    },

    deleteWhiteboardElement(id) {
        if (!this.currentWorkspace) return;
        this.currentWorkspace.elements = (this.currentWorkspace.elements || []).filter(el => el.id !== id);
        if (this.selectedElementId === id) this.selectedElementId = null;
        this.currentBoard.updatedAt = new Date();
        this.saveUserData();
        this.openWorkspace(this.currentBoard.id, this.currentWorkspace.id);
    },

    selectWhiteboardElement(id) {
        this.selectedElementId = id;
        $('.wb-element, .wb-svg-el').removeClass('selected');
        $(`.wb-element[data-el-id="${id}"]`).addClass('selected');
        $(`.wb-svg-el[data-el-id="${id}"]`).attr({ stroke: '#667eea', 'stroke-width': 3 });
    },

    deselectWhiteboardElement() {
        if (!this.selectedElementId) return;
        const prevId = this.selectedElementId;
        this.selectedElementId = null;
        $('.wb-element, .wb-svg-el').removeClass('selected');
        $(`.wb-svg-el[data-el-id="${prevId}"]`).attr({ stroke: '#0f172a', 'stroke-width': 2 });
    },

    updateWbDragPreview(x, y) {
        const drag = this.wbDrag;
        if (!drag) return;

        if (drag.tool === 'pen') {
            drag.points.push({ x, y });
            const $svg = $('#whiteboardCanvas .wb-svg-layer');
            const pointsStr = drag.points.map(p => `${p.x},${p.y}`).join(' ');
            let $preview = $('#wbPreviewPoly');
            if ($preview.length === 0) {
                $svg.append(`<polyline id="wbPreviewPoly" points="${pointsStr}" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4,3"></polyline>`);
            } else {
                $preview.attr('points', pointsStr);
            }
            return;
        }

        if (drag.tool === 'arrow') {
            const $svg = $('#whiteboardCanvas .wb-svg-layer');
            let $preview = $('#wbPreviewLine');
            if ($preview.length === 0) {
                $svg.append(`<line id="wbPreviewLine" x1="${drag.startX}" y1="${drag.startY}" x2="${x}" y2="${y}" stroke="#0f172a" stroke-width="2" stroke-dasharray="4,3"></line>`);
            } else {
                $preview.attr({ x2: x, y2: y });
            }
            return;
        }

        // rectangle / circle
        const left = Math.min(x, drag.startX);
        const top = Math.min(y, drag.startY);
        const width = Math.abs(x - drag.startX);
        const height = Math.abs(y - drag.startY);
        let $preview = $('#wbPreview');
        if ($preview.length === 0) {
            const cls = drag.tool === 'circle' ? 'wb-preview wb-shape-circle' : 'wb-preview wb-shape-rect';
            $('#whiteboardCanvas').append(`<div id="wbPreview" class="${cls}" style="left:${left}px; top:${top}px; width:${width}px; height:${height}px;"></div>`);
        } else {
            $preview.css({ left, top, width, height });
        }
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

        const esc = this.escapeHtml.bind(this);
        let content = '<div class="text-center text-muted py-5">Select a workspace to present</div>';

        if (this.currentWorkspace.type === 'meeting' && this.currentWorkspace.content) {
            content = `<div class="notes-content" style="white-space: pre-wrap;">${esc(this.currentWorkspace.content)}</div>`;
        } else if (this.currentWorkspace.type === 'checklist') {
            const items = this.currentWorkspace.items || [];
            content = '<div>';
            items.forEach(item => {
                content += `<div class="mb-3"><input type="checkbox" disabled ${item.completed ? 'checked' : ''}> ${esc(item.title)}</div>`;
            });
            content += '</div>';
        } else if (this.currentWorkspace.type === 'kanban') {
            const columns = this.currentWorkspace.columns || [];
            content = '<div class="d-flex gap-3">';
            columns.forEach(col => {
                content += `<div class="flex-grow-1"><h5>${esc(col.title)}</h5>`;
                (col.cards || []).slice(0, 3).forEach(card => {
                    content += `<div class="bg-dark p-2 mb-2 rounded">${esc(card.title)}</div>`;
                });
                content += '</div>';
            });
            content += '</div>';
        } else if (this.currentWorkspace.type === 'whiteboard') {
            const count = (this.currentWorkspace.elements || []).length;
            content = `<div class="text-center text-muted py-5">Whiteboard with ${count} item(s) — open the board to view</div>`;
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
            workspaces: [this.createWorkspaceForTemplate(template)]
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
        if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
    },

    // Build a fully-formed workspace object for a given template so every
    // template actually has a renderer (previously 'project' and 'brainstorm'
    // produced workspace types the renderer didn't know, showing "Unknown
    // workspace type").
    createWorkspaceForTemplate(template) {
        const base = { id: this.generateId() };
        switch (template) {
            case 'meeting':
                return { ...base, type: 'meeting', title: 'Meeting Notes', content: '' };
            case 'project':
                return {
                    ...base, type: 'kanban', title: 'Project Plan',
                    columns: [
                        { id: this.generateId(), title: 'TO DO', cards: [] },
                        { id: this.generateId(), title: 'IN PROGRESS', cards: [] },
                        { id: this.generateId(), title: 'REVIEW', cards: [] },
                        { id: this.generateId(), title: 'DONE', cards: [] }
                    ]
                };
            case 'kanban':
                return {
                    ...base, type: 'kanban', title: 'Kanban Board',
                    columns: [
                        { id: this.generateId(), title: 'TO DO', cards: [] },
                        { id: this.generateId(), title: 'IN PROGRESS', cards: [] },
                        { id: this.generateId(), title: 'DONE', cards: [] }
                    ]
                };
            case 'brainstorm':
                return { ...base, type: 'whiteboard', title: 'Brainstorming', elements: [] };
            case 'checklist':
                return { ...base, type: 'checklist', title: 'Checklist', items: [] };
            case 'blank':
            default:
                return { ...base, type: 'whiteboard', title: 'Whiteboard', elements: [] };
        }
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
