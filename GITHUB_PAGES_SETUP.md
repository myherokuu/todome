# GitHub Pages Setup - Step by Step

## Problem
Getting 404 error: `https://myherokuu.github.io/src/main.tsx`

## Root Cause
GitHub Pages source is not configured correctly to serve the `dist/` folder

## Solution - Follow These Exact Steps

### Step 1: Go to Repository Settings
```
https://github.com/myherokuu/todome/settings
```

### Step 2: Click "Pages" in Left Sidebar
Look for "Pages" under "Code and automation" section

### Step 3: Configure Build and Deployment

**IMPORTANT: Select "GitHub Actions" as Source**

You should see a dropdown that says:
- "Deploy from a branch" (currently selected - WRONG)
- "GitHub Actions" (SELECT THIS ONE - CORRECT)

Click on "GitHub Actions" option.

### Step 4: Click Save Button
Look for a blue "Save" button below the Source dropdown.

### Step 5: Wait for Deployment
- Go to Actions tab: https://github.com/myherokuu/todome/actions
- You should see a workflow running called "Deploy to GitHub Pages"
- Wait for it to complete (green checkmark ✅)
- This takes 1-3 minutes

### Step 6: Check Status
Back on Settings → Pages, you should see:
```
✅ Your site is live at https://myherokuu.github.io/todome/
```

### Step 7: Visit Your App
```
https://myherokuu.github.io/todome/
```

---

## If Still Not Working

### Option A: Manually Trigger Workflow
1. Go to Actions: https://github.com/myherokuu/todome/actions
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" dropdown
4. Click "Run workflow" button
5. Wait for completion

### Option B: Switch Branch (Backup Plan)
If GitHub Actions is not working, use this simpler method:

1. Settings → Pages
2. Select: Deploy from branch
3. Branch: `claude/boley-board-app-om9tgw`
4. Folder: `/ (root)`
5. Save

---

## Screenshot Reference

### CORRECT Configuration:
```
Build and deployment
Source: GitHub Actions (selected)
[Save button]
```

### WRONG Configuration:
```
Build and deployment  
Source: Deploy from a branch (selected) ❌
Branch: main
Folder: / (root)
```

---

## Verify Deployment

After completion, check:
1. **Actions tab** shows workflow completed ✅
2. **Settings → Pages** shows "Your site is live"
3. **Visit** https://myherokuu.github.io/todome/

If assets load (CSS/JS visible), deployment worked!

---

## Still Having Issues?

Share screenshot of:
1. GitHub Settings → Pages (the Source section)
2. GitHub Actions tab (showing workflow status)
3. Browser Network tab error (F12 → Network)

This will help diagnose the exact issue.
