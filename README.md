# ⚡ Boley Board - jQuery Version

A modern, lightweight visual workspace for meetings, brainstorming, and project planning. **No build required - works directly on GitHub Pages!**

## 🎯 Features

### Core Workspaces
- **Meeting Notes**: Structured documentation with agenda, discussion, decisions, and action items
- **Checklist**: Task management with priorities and due dates
- **Kanban Board**: Visual workflow (TO DO → IN PROGRESS → REVIEW → DONE)
- **Whiteboard**: Drawing canvas for sketches and diagrams (ready for expansion)

### Key Capabilities
✅ **Dashboard**: Create boards, manage favorites, view recent projects
✅ **Meeting Mode**: Beautiful presentation view for live meetings
✅ **Multiple Templates**: Quick-start templates for different use cases
✅ **Responsive Design**: Works on desktop and tablet
✅ **Zero Build Process**: Open index.html directly or deploy to GitHub Pages
✅ **Modern UI**: Bootstrap 5 + custom CSS styling

## 📁 Project Structure

```
boley-board/
├── index.html          # Main app (single file)
├── css/
│   └── style.css       # All styles (~1000 lines)
├── js/
│   └── app.js          # All functionality (~800 lines)
└── README.md           # This file
```

## 🚀 Quick Start

### Run Locally
1. Simply open `index.html` in your browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```
3. Visit `http://localhost:8000`

### Deploy to GitHub Pages

#### Option A: Simple (Recommended)
1. Go to **Settings → Pages**
2. Select: **Deploy from a branch**
3. Branch: `claude/boley-board-app-om9tgw` (this is the branch Pages has actually been
   building from — confirmed via the repo's Actions history. `main` is kept in sync
   with it but isn't the configured Pages source.)
4. Folder: **/ (root)**
5. Click **Save**
6. Visit: `https://myherokuu.github.io/todome/` (deploys within ~1 minute of a push)
7. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R) to bypass any cached copy

#### Option B: Custom Domain
Configure your DNS to point to GitHub Pages and update repository settings.

## 📊 Sample Data

The app includes 4 pre-configured boards demonstrating all features:

1. **AI Claim Project – Weekly Meeting**
   - Meeting notes with agenda, decisions, and action items
   - Checklist for tracking tasks

2. **Q4 Product Roadmap**
   - Kanban board with sprint tasks

3. **Sprint 42 - Feature Development**
   - Active development tasks across columns

4. **Launch Checklist - v2.0**
   - Pre-launch verification checklist with progress tracking

## 🎮 How to Use

### Create a New Board
1. Click **"+ Create Board"** button
2. Enter title and description
3. Choose a template
4. Click **"Create Board"**

### Open a Board
- Click any board card on the dashboard
- Workspace tabs appear at the top
- Click a tab to view that workspace

### Meeting Mode
1. Open any board
2. Click **"Meeting"** button in top-right
3. Use Previous/Next to navigate workspaces
4. Beautiful presentation view for live meetings

### Manage Boards
- ⭐ Click star to favorite
- 📝 Edit board title
- 📋 Switch between workspaces

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript + jQuery
- **Styling**: Bootstrap 5 CSS Framework
- **Icons**: Font Awesome 6
- **No Build**: Direct HTML/CSS/JS - CDN dependencies only

### Dependencies
- jQuery 3.7.0 (CDN)
- Bootstrap 5.3.0 (CDN)
- Font Awesome 6.4.0 (CDN)

## 📱 Browser Support

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 💾 Data Storage

Currently uses in-memory storage (data persists during session). To add persistence:
1. Uncomment localStorage code in `js/app.js`
2. Or integrate with backend API

## 🔐 Test Credentials

```
Email: smh
Password: abcd1234
```

(For future authentication system)

## 📦 File Sizes

- `index.html`: ~12 KB
- `css/style.css`: ~25 KB
- `js/app.js`: ~32 KB
- **Total: ~69 KB** (minified version ~40 KB)

## 🚀 Roadmap

### Phase 1 (Current) ✅
- ✅ Dashboard with board management
- ✅ Meeting notes workspace
- ✅ Checklist workspace
- ✅ Kanban workspace
- ✅ Meeting mode presentation
- ✅ Board templates
- ✅ Favorites system

### Phase 2 (Next)
- 🔄 Whiteboard canvas implementation
- 🔄 Mind map visualization
- 🔄 localStorage persistence
- 🔄 Export to PDF/PNG
- 🔄 Drag-and-drop cards

### Phase 3 (Future)
- 📋 Multi-user collaboration (WebSocket)
- 📋 Real-time sync
- 📋 Comments & mentions
- 📋 Activity history
- 📋 Mobile app

## 🎨 Customization

### Change Colors
Edit `css/style.css`:
```css
.board-topbar {
    background: #0f172a;  /* Change primary color */
}
```

### Add New Workspace Type
1. Add case in `renderWorkspaceContent()` function
2. Create new render function (e.g., `renderMindmapContent()`)
3. Add HTML template

### Modify Sample Data
Edit `BooleyBoard.loadMockData()` in `js/app.js`

## ⚙️ Configuration

### Change GitHub Pages Path
If using different repository path, update in HTML:
```html
<!-- If deploying to /repo-name/ -->
<base href="/repo-name/">
```

### Enable Persistence
Uncomment localStorage calls in `js/app.js`:
```javascript
localStorage.setItem('boards', JSON.stringify(this.boards));
```

## 🐛 Troubleshooting

**Page shows 404?**
- Ensure GitHub Pages is enabled
- Check source branch is correct
- Hard refresh (Ctrl+Shift+R)

**Styles not loading?**
- Check Bootstrap CDN is accessible
- Clear browser cache
- Open DevTools (F12) and check Console

**JavaScript errors?**
- Check jQuery is loaded before app.js
- Verify Bootstrap CDN is included
- Check browser console for specific errors

## 📝 License

MIT License - Use freely in your projects

## 👨‍💻 Author

Built with ❤️ using jQuery + Bootstrap

---

**Ready to use! No installation, no build process, no configuration. Just download and go!** 🎉
