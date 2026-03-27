# 🚀 Complete Deployment Guide - Step by Step

Follow this guide to deploy your RainShield app in 30 minutes!

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] GitHub account with RainSheild repository
- [ ] All credentials ready (check `DEPLOYMENT_CREDENTIALS.md`)
- [ ] MongoDB Atlas database set up
- [ ] Razorpay account (for payments)
- [ ] Google Cloud account (for Maps & OAuth)

---

## 🎯 Deployment Order

**IMPORTANT:** Deploy in this order:
1. Backend first (Railway) ← Get backend URL
2. Frontend second (Vercel) ← Use backend URL
3. Update backend with frontend URL ← Connect them

---

# PART 1: Deploy Backend on Railway (15 minutes)

## Step 1: Create Railway Account

1. **Open Railway website**
   - Go to: https://railway.app/
   - You'll see the Railway homepage

2. **Sign up with GitHub**
   - Click the "Login" button (top right)
   - Click "Login with GitHub"
   - Authorize Railway to access your GitHub account
   - Click "Authorize Railway"

3. **Complete setup**
   - You'll be redirected to Railway dashboard
   - You might see a welcome screen - click "Continue"

---

## Step 2: Create New Project

1. **Start new project**
   - On Railway dashboard, click "New Project" button
   - You'll see several options

2. **Deploy from GitHub**
   - Click "Deploy from GitHub repo"
   - You'll see a list of your repositories

3. **Select your repository**
   - Find "RainSheild" in the list
   - Click on it
   - Railway will start analyzing your repository

4. **Wait for detection**
   - Railway will detect it's a Node.js project
   - It will show "Node.js" as the detected framework
   - Click "Deploy Now" or "Add variables"

---

## Step 3: Configure Root Directory

**CRITICAL:** Railway needs to know your backend is in a subfolder!

1. **Click on your service**
   - You'll see a card with your project name
   - Click on it to open service settings

2. **Go to Settings**
   - Look for tabs at the top
   - Click "Settings" tab

3. **Set Root Directory**
   - Scroll down to find "Root Directory" section
   - Click "Edit" or the input field
   - Type: `backend`
   - Press Enter or click "Update"

4. **Verify**
   - Make sure it shows "Root Directory: backend"
   - This tells Railway to look in the backend folder

---

## Step 4: Add Environment Variables

**IMPORTANT:** This is where you add your secrets!

1. **Go to Variables tab**
   - Click "Variables" tab at the top
   - You'll see an empty variables list

2. **Choose input method**
   - You'll see two options:
     - "New Variable" (one at a time)
     - "Raw Editor" (paste all at once)
   - Click "Raw Editor" for faster setup

3. **Copy your credentials**
   - Open `DEPLOYMENT_CREDENTIALS.md` file (in your local folder)
   - Find the "Railway Backend Environment Variables" section
   - Copy ALL the variables (from PORT to FRONTEND_URL)

4. **Paste in Raw Editor**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri_here
   JWT_SECRET=your_jwt_secret_here
   RAZORPAY_KEY_ID=your_razorpay_key_here
   RAZORPAY_KEY_SECRET=your_razorpay_secret_here
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   NODE_ENV=production
   FRONTEND_URL=https://temporary-placeholder.com
   ```

5. **Important notes**
   - Replace all `your_*_here` with actual values from your `.env` file
   - Keep `FRONTEND_URL` as placeholder for now (we'll update it later)
   - Make sure there are NO extra spaces
   - Each variable on a new line

6. **Save variables**
   - Click "Update Variables" button
   - Railway will automatically redeploy

---

## Step 5: Deploy and Get URL

1. **Wait for deployment**
   - Go to "Deployments" tab
   - You'll see deployment in progress
   - Status will show "Building" → "Deploying" → "Success"
   - This takes 2-3 minutes

2. **Check deployment logs**
   - Click on the active deployment
   - You'll see logs scrolling
   - Look for: "✅ Server running on port 5000"
   - If you see errors, check your environment variables

3. **Get your Railway URL**
   - Go to "Settings" tab
   - Scroll to "Networking" section
   - You'll see "Public Networking"
   - Click "Generate Domain"
   - Railway will create a URL like: `rainshield-production-xxxx.up.railway.app`
   - **COPY THIS URL** - you'll need it for frontend!

4. **Test your backend**
   - Open a new browser tab
   - Go to: `https://your-railway-url.up.railway.app/api/umbrellas`
   - You should see: `[]` (empty array) or JSON data
   - If you see this, backend is working! ✅

---

## Step 6: Seed Database (Optional)

If you want sample data for testing:

1. **Open service settings**
   - Click on your service in Railway dashboard

2. **Run seed command**
   - Go to "Settings" tab
   - Scroll to "Service" section
   - Look for "Custom Start Command" or "Run Command"
   - Enter: `npm run seed`
   - Click "Run" or "Deploy"

3. **Wait for seeding**
   - Check logs for: "✅ Database seeded successfully!"
   - This adds 300+ umbrellas and 3 test users

4. **Test credentials** (after seeding)
   - Email: `student1@cu.edu.in`
   - Password: `password123`

---

# PART 2: Deploy Frontend on Vercel (10 minutes)

## Step 7: Create Vercel Account

1. **Open Vercel website**
   - Go to: https://vercel.com/
   - You'll see the Vercel homepage

2. **Sign up with GitHub**
   - Click "Sign Up" button
   - Click "Continue with GitHub"
   - Authorize Vercel to access your repositories
   - Click "Authorize Vercel"

3. **Complete setup**
   - You might be asked to verify email
   - You'll be redirected to Vercel dashboard

---

## Step 8: Import Project

1. **Add new project**
   - On Vercel dashboard, click "Add New..." button (top right)
   - Select "Project" from dropdown

2. **Import Git Repository**
   - You'll see "Import Git Repository" section
   - Find "RainSheild" in the list
   - Click "Import" button next to it

3. **Wait for analysis**
   - Vercel will analyze your repository
   - It will detect "Create React App"

---

## Step 9: Configure Project Settings

1. **Set Framework Preset**
   - Framework Preset: Should auto-detect "Create React App"
   - If not, select it from dropdown

2. **Set Root Directory** ⚠️ IMPORTANT!
   - Look for "Root Directory" section
   - Click "Edit" button
   - You'll see folder structure
   - Click on "frontend" folder
   - Click "Continue"
   - Verify it shows: "Root Directory: frontend"

3. **Build Settings** (usually auto-filled)
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
   - Leave these as default

---

## Step 10: Add Environment Variables

**CRITICAL:** Frontend needs to know where backend is!

1. **Expand Environment Variables section**
   - Look for "Environment Variables" section
   - Click to expand it

2. **Add variables one by one**
   
   **Variable 1:**
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-railway-url.up.railway.app/api`
   - **IMPORTANT:** Replace `your-railway-url` with your actual Railway URL from Step 5
   - **IMPORTANT:** Must end with `/api`
   - Example: `https://rainshield-production-xxxx.up.railway.app/api`
   - Click "Add"

   **Variable 2:**
   - Name: `REACT_APP_RAZORPAY_KEY_ID`
   - Value: Your Razorpay key (from `DEPLOYMENT_CREDENTIALS.md`)
   - Click "Add"

   **Variable 3:**
   - Name: `REACT_APP_GOOGLE_MAPS_API_KEY`
   - Value: Your Google Maps API key (from `DEPLOYMENT_CREDENTIALS.md`)
   - Click "Add"

   **Variable 4:**
   - Name: `REACT_APP_GOOGLE_CLIENT_ID`
   - Value: Your Google OAuth Client ID (from `DEPLOYMENT_CREDENTIALS.md`)
   - Click "Add"

3. **Verify all variables**
   - You should see 4 environment variables
   - Double-check the `REACT_APP_API_URL` has your Railway URL
   - Make sure no extra spaces

---

## Step 11: Deploy Frontend

1. **Start deployment**
   - Click "Deploy" button
   - Vercel will start building your app

2. **Wait for build**
   - You'll see build logs
   - Status: "Building" → "Deploying" → "Ready"
   - This takes 2-3 minutes

3. **Check for errors**
   - If build fails, check the logs
   - Common issues:
     - Missing environment variables
     - Wrong root directory
     - Syntax errors in code

4. **Get your Vercel URL**
   - Once deployed, you'll see "Congratulations!" screen
   - Click "Visit" button
   - Or copy the URL shown (e.g., `rain-sheild.vercel.app`)
   - **SAVE THIS URL** - you need it for next step!

5. **Test your frontend**
   - Your app should load
   - You should see the splash screen
   - Then the login page
   - If you see errors, check browser console (F12)

---

# PART 3: Connect Frontend & Backend (5 minutes)

## Step 12: Update Backend CORS

**IMPORTANT:** Backend needs to allow requests from frontend!

1. **Go back to Railway dashboard**
   - Open: https://railway.app/dashboard
   - Click on your backend service

2. **Update FRONTEND_URL variable**
   - Go to "Variables" tab
   - Find `FRONTEND_URL` variable
   - Click "Edit" (pencil icon)
   - Replace the placeholder with your Vercel URL
   - Example: `https://rain-sheild.vercel.app`
   - **NO trailing slash!**
   - Click "Update"

3. **Redeploy backend**
   - Railway will automatically redeploy
   - Wait 1-2 minutes
   - Check "Deployments" tab for completion

---

## Step 13: Verify Connection

1. **Test the connection**
   - Go to your Vercel URL
   - Open browser console (Press F12)
   - Go to "Network" tab
   - Try to login or register
   - You should see API calls to your Railway URL
   - Status should be 200 (success)

2. **If you see CORS errors**
   - Make sure `FRONTEND_URL` in Railway matches Vercel URL exactly
   - No trailing slash
   - Include `https://`
   - Redeploy backend after fixing

---

# PART 4: Final Testing (10 minutes)

## Step 14: Complete Testing Checklist

### Test 1: Authentication
- [ ] Go to your Vercel URL
- [ ] Click "Sign up"
- [ ] Register with email: `test@example.com`, password: `password123`
- [ ] Should redirect to dashboard
- [ ] Should show wallet balance: ₹0

### Test 2: Wallet Deposit
- [ ] Click "Wallet" in navbar
- [ ] Enter amount: ₹300
- [ ] Click "Add ₹300"
- [ ] Razorpay popup should appear
- [ ] Use test card: `4111 1111 1111 1111`
- [ ] Expiry: Any future date (e.g., 12/25)
- [ ] CVV: Any 3 digits (e.g., 123)
- [ ] Click "Pay"
- [ ] Should show success message
- [ ] Wallet should show: ₹400 (₹300 + ₹100 cashback)

### Test 3: Umbrella Selection
- [ ] Click "Umbrellas" in navbar
- [ ] Should see map with umbrella markers
- [ ] Switch to "Table" view
- [ ] Should see locations and umbrellas
- [ ] Try selecting an umbrella (click + button)
- [ ] Should show in selection count
- [ ] Click "Rent Selected"
- [ ] Should redirect to tracking page

### Test 4: Rental Tracking
- [ ] Should see active rental
- [ ] Timer should be running
- [ ] Map should show umbrella location
- [ ] Cost should be calculating
- [ ] Try "Pay & Unlock" button
- [ ] Should deduct from wallet
- [ ] Status should change to "Unlocked"

### Test 5: Drop Off
- [ ] Click "Drop Off Current" button
- [ ] Select a drop-off location
- [ ] Click "Drop Off"
- [ ] Should show success message
- [ ] Should get deposit refund
- [ ] Wallet balance should increase

### Test 6: Google OAuth (Optional)
- [ ] Logout
- [ ] Click "Continue with Google"
- [ ] Select your Google account
- [ ] Should login successfully
- [ ] Should redirect to dashboard

### Test 7: Real-time Updates (Optional)
- [ ] Open app in two browser tabs
- [ ] Make a wallet deposit in one tab
- [ ] Should see notification in other tab
- [ ] Tests Socket.io connection

---

## Step 15: Save Your URLs

Write down these URLs for future reference:

```
Frontend URL: https://_________________________________.vercel.app
Backend URL:  https://_________________________________.up.railway.app
GitHub Repo:  https://github.com/i-am-sanjaykumar07/RainSheild
```

---

# 🎊 Congratulations!

Your RainShield app is now live! 🌍

---

# 🐛 Troubleshooting Common Issues

## Issue 1: Backend not deploying on Railway

**Symptoms:**
- Build fails
- Deployment shows error

**Solutions:**
1. Check if `Root Directory` is set to `backend`
2. Verify all environment variables are added
3. Check Railway logs for specific error
4. Make sure `MONGODB_URI` is correct

**How to check logs:**
- Railway dashboard → Deployments → Click deployment → View logs

---

## Issue 2: Frontend not building on Vercel

**Symptoms:**
- Build fails with errors
- "Module not found" errors

**Solutions:**
1. Check if `Root Directory` is set to `frontend`
2. Verify all 4 environment variables are added
3. Check Vercel build logs for specific error
4. Make sure `REACT_APP_API_URL` ends with `/api`

**How to check logs:**
- Vercel dashboard → Deployments → Click deployment → View logs

---

## Issue 3: CORS Errors

**Symptoms:**
- Frontend loads but API calls fail
- Console shows: "CORS policy blocked"

**Solutions:**
1. Check `FRONTEND_URL` in Railway matches Vercel URL exactly
2. No trailing slash in `FRONTEND_URL`
3. Include `https://` in `FRONTEND_URL`
4. Redeploy backend after fixing

**How to fix:**
- Railway → Variables → Edit `FRONTEND_URL` → Update → Wait for redeploy

---

## Issue 4: Maps not loading

**Symptoms:**
- Map shows gray box
- Console error: "Google Maps API error"

**Solutions:**
1. Check if `REACT_APP_GOOGLE_MAPS_API_KEY` is set in Vercel
2. Verify API key is valid in Google Cloud Console
3. Make sure "Maps JavaScript API" is enabled
4. Check API key restrictions allow your Vercel domain

**How to fix:**
- Google Cloud Console → APIs & Services → Credentials → Edit API key
- Add your Vercel domain to "Website restrictions"

---

## Issue 5: Razorpay not working

**Symptoms:**
- Payment popup doesn't appear
- Console error: "Razorpay is not defined"

**Solutions:**
1. Check if `REACT_APP_RAZORPAY_KEY_ID` is set in Vercel
2. Verify Razorpay key is correct (starts with `rzp_`)
3. Make sure you're using live key for production
4. Check Razorpay dashboard for any issues

---

## Issue 6: Google OAuth not working

**Symptoms:**
- "Google login failed" error
- OAuth popup doesn't appear

**Solutions:**
1. Check if `REACT_APP_GOOGLE_CLIENT_ID` is set in Vercel
2. Add Vercel domain to Google OAuth authorized domains
3. Go to: Google Cloud Console → Credentials → OAuth 2.0 Client IDs
4. Edit your client → Add Vercel domain to "Authorized JavaScript origins"
5. Add `https://your-vercel-domain.vercel.app` (no trailing slash)

---

## Issue 7: Database connection fails

**Symptoms:**
- Backend logs show "MongoDB connection error"
- API calls return 500 errors

**Solutions:**
1. Check if `MONGODB_URI` is correct in Railway
2. Verify MongoDB Atlas allows connections from anywhere
3. Go to: MongoDB Atlas → Network Access → Add IP Address
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Make sure database user password is correct

---

## Issue 8: Environment variables not working

**Symptoms:**
- App shows "undefined" for values
- Features not working

**Solutions:**

**For Railway (Backend):**
1. Go to Variables tab
2. Check all variables are present
3. No extra spaces in values
4. Redeploy after adding variables

**For Vercel (Frontend):**
1. Go to Settings → Environment Variables
2. Check all 4 variables are present
3. Variables must start with `REACT_APP_`
4. Redeploy after adding variables

---

# 📞 Getting Help

## Check Logs First

**Railway Logs:**
1. Railway dashboard
2. Click your service
3. Deployments tab
4. Click active deployment
5. View logs

**Vercel Logs:**
1. Vercel dashboard
2. Click your project
3. Deployments tab
4. Click active deployment
5. View Function Logs

## Common Log Messages

**Good signs:**
- ✅ "Server running on port 5000"
- ✅ "Connected to MongoDB"
- ✅ "Build completed"

**Bad signs:**
- ❌ "MongoDB connection error"
- ❌ "Module not found"
- ❌ "CORS policy blocked"

---

# 🔄 Redeploying After Changes

## Redeploy Backend (Railway)

**Automatic:**
- Push to GitHub `main` branch
- Railway auto-deploys

**Manual:**
- Railway dashboard → Deployments
- Click "Deploy" button

## Redeploy Frontend (Vercel)

**Automatic:**
- Push to GitHub `main` branch
- Vercel auto-deploys

**Manual:**
- Vercel dashboard → Deployments
- Click "Redeploy" button

---

# 🎯 Next Steps

1. **Custom Domain (Optional)**
   - Vercel: Settings → Domains → Add domain
   - Railway: Settings → Domains → Add domain

2. **Monitor Usage**
   - Railway: Check usage in dashboard
   - Vercel: Check analytics in dashboard

3. **Set up Monitoring**
   - Enable error tracking
   - Set up uptime monitoring

4. **Share Your App**
   - Share Vercel URL with friends
   - Get feedback and improve

---

# 📚 Additional Resources

- Railway Docs: https://docs.railway.app/
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Razorpay Docs: https://razorpay.com/docs/
- Google Maps API: https://developers.google.com/maps

---

**🎉 Your app is live! Start renting umbrellas! ☂️**

Need more help? Check other documentation files:
- `DEPLOYMENT.md` - Detailed deployment guide
- `SECURITY_ALERT.md` - Security best practices
- `README.md` - Project documentation
