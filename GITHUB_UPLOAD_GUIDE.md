# How to Upload This Project to GitHub

## 📋 Before You Start

You need:
- ✅ A GitHub account (create at https://github.com/signup)
- ✅ Git installed on your computer (download from https://git-scm.com/)
- ✅ This project downloaded to your computer

---

## 🚀 Method 1: Automated Script (Easiest - Windows)

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `recipe-costing-desktop-app`
3. Description: `Professional Recipe Costing Desktop Application`
4. Choose: **Public**
5. **DO NOT** check any boxes (no README, no .gitignore, no license)
6. Click **"Create repository"**

### Step 2: Run Upload Script
1. Open the project folder
2. Double-click **`UPLOAD-TO-GITHUB.bat`**
3. Follow the prompts
4. Enter your GitHub repository URL when asked

Done! ✅

---

## 🖥️ Method 2: Manual Command Line

### Step 1: Create Repository on GitHub.com
Same as above - create an empty repository.

### Step 2: Open Terminal/Command Prompt
Navigate to project folder:
```bash
cd path/to/recipe-costing-desktop-app
```

### Step 3: Initialize Git
```bash
git init
```

### Step 4: Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 5: Add All Files
```bash
git add .
```

### Step 6: Create Initial Commit
```bash
git commit -m "Initial commit: Recipe Costing Desktop App v2.0"
```

### Step 7: Connect to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/recipe-costing-desktop-app.git
```

### Step 8: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub credentials.

---

## 🖱️ Method 3: GitHub Desktop (No Command Line)

### Step 1: Install GitHub Desktop
Download from: https://desktop.github.com/

### Step 2: Sign In
- Open GitHub Desktop
- Sign in with your GitHub account

### Step 3: Add Repository
- Click **"File"** → **"Add local repository"**
- Browse to the project folder
- Click **"Add repository"**

If it says "not a Git repository":
- Click **"create a repository instead"**
- Initialize it

### Step 4: Publish to GitHub
- Click **"Publish repository"**
- Name: `recipe-costing-desktop-app`
- Description: `Professional Recipe Costing Desktop Application`
- Uncheck **"Keep this code private"**
- Click **"Publish Repository"**

Done! ✅

---

## 🔐 Authentication Issues?

### Using Personal Access Token (Recommended)

If you have 2-factor authentication enabled:

1. **Create Token**
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name: `Recipe Costing App`
   - Select scopes: `repo` (all checkboxes under it)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Use Token as Password**
   - When prompted for password, paste the token instead

### Using SSH (Alternative)

1. **Generate SSH Key**
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. **Add to GitHub**
   - Copy the public key:
     ```bash
     cat ~/.ssh/id_ed25519.pub
     ```
   - Go to https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your key

3. **Use SSH URL**
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/recipe-costing-desktop-app.git
   ```

---

## ✅ Verification Checklist

After uploading, verify:

- [ ] All files are on GitHub
- [ ] README.md displays properly
- [ ] `.env` file is NOT uploaded (should be in .gitignore)
- [ ] Repository is set to Public
- [ ] Description is set
- [ ] Topics/tags are added

---

## 🎨 Make It Look Professional

### Add Topics (Tags)
On your GitHub repository page:
1. Click "Add topics"
2. Add these: `react`, `electron`, `mysql`, `recipe-costing`, `material-ui`, `vite`, `desktop-app`

### Add Screenshot
1. Take a screenshot of the running app
2. Save as `screenshot.png` in the project root
3. Add to README.md:
   ```markdown
   ![Screenshot](screenshot.png)
   ```
4. Commit and push:
   ```bash
   git add screenshot.png README.md
   git commit -m "Add screenshot"
   git push
   ```

### Add Social Preview Image
1. Go to repository Settings
2. Scroll to "Social preview"
3. Upload an image (1280x640px recommended)

---

## 🐛 Troubleshooting

### "fatal: not a git repository"
```bash
git init
```

### "remote origin already exists"
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/recipe-costing-desktop-app.git
```

### "failed to push"
- Make sure you created the repository on GitHub first
- Check your credentials
- Verify the repository URL is correct

### "Authentication failed"
- Use a Personal Access Token instead of password
- Or set up SSH keys

---

## 📞 Need Help?

- **GitHub Docs**: https://docs.github.com/
- **Git Tutorial**: https://git-scm.com/docs/gittutorial
- **GitHub Desktop Guide**: https://docs.github.com/en/desktop

---

## 🎉 After Upload

Your repository URL will be:
```
https://github.com/YOUR_USERNAME/recipe-costing-desktop-app
```

Share it with:
- `README.md` badge
- Social media
- Developer communities
- Potential users

Congratulations! Your project is now on GitHub! 🎊
