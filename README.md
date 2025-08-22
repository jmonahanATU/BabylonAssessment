# Babylon Radio Authentication App
A simple but professional login system built with Next.js and Firebase, featuring Babylon Radio's green branding.

---

## What This App Does
This app lets users create accounts and log in to access a personalized homepage.  
It's like a digital door – you need to sign in to get inside, and once you're in, it greets you by name.

---

## 1. How to Run This App

**Clone the repository** from this repository:
```bash
git clone [your-repo-url]
cd babylon-auth-app
```

**Install the pieces** the app needs:
```bash
npm install
```

## 2. Set up Firebase Project

### Create a Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project or use an existing one
- Enable **Authentication** with the **Email/Password** sign-in method
- Enable **Firestore Database** (start in test mode)

---

### Get Firebase Configuration
- In your Firebase project, go to **Project Settings**
- Scroll to **Your apps** and click the **web icon (`</>`)**
- Register your app and copy the **config object**

---

## 3. Create Environment File
Copy `.env.example` to `.env.local` and replace the placeholder values with your actual Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 4. Start the Development Server
```bash
npm run dev
```

## 5. Open your browser and go to http://localhost:3000

---

### Security Note

API keys and Firebase configuration are intentionally excluded from this repository following security best practices.

---

## What You'll See

### 1. **Login Page** (`/login`)
- If you're new: Fill in your full name, email, and password to create an account  
- If you have an account: Just enter your email and password to sign in  
- Click the toggle links to switch between "Sign In" and "Create Account"  

### 2. **Homepage** (`/`)
- Shows a friendly message: `"Hey, [Your Name]! You're successfully logged in"`  
- Has a logout button to sign out

---

## How I Built This

### **My Approach**
I built this app using a layered architecture approach:

1. **Foundation** – Set up Next.js with TypeScript (project initialization and configuration)  
2. **Backend Integration** – Connected Firebase SDK for authentication and Firestore database (API integration)  
3. **Frontend Components** – Created the login page and homepage using React components  
4. **UI/UX Design** – Implemented Babylon's green theme using Tailwind CSS and Shadcn/UI component library  
5. **Authentication Flow** – Implemented route protection and state management using React Context  

### **Why I Made These Choices**
- **Component-Based Architecture**: Instead of one complex form component, I created separate SignIn and SignUp components for clarity  
- **Brand-Consistent Design System**: Implemented Babylon Radio's green color palette throughout the application  
- **Type Safety**: Used TypeScript to prevent runtime errors and improve developer experience  
- **Component Library**: Leveraged Shadcn/UI for consistent, accessible form components  

---

## Technologies I Used
Think of these as the tools in my toolbox:

- **Next.js App Router** – React framework with file-based routing system  
- **Firebase Authentication & Firestore** – Backend-as-a-Service for user management and data persistence  
- **TypeScript** – Statically typed JavaScript for better code reliability  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **Shadcn/UI** – Pre-built React component library with accessibility features  
- **React Hook Form** – Form state management library  
- **Zod** – TypeScript-first schema validation library

---

## Challenges I Faced

### **1. Firestore Timestamp Serialization**
- **What happened**: User account creation dates displayed as "Invalid Date" in the UI  
- **Root cause**: Firestore returns `Timestamp` objects, not JavaScript `Date` objects  
- **Solution**: Implemented proper timestamp conversion using Firestore's `toDate()` method with fallback handling  

### **2. Authentication Logic Complexity**
- **What happened**: Initially tried a single smart form with automatic user detection  
- **Why it was challenging**: Race conditions between user existence checks and form submission  
- **Solution**: Refactored into separate authentication components for clarity and maintainability  

### **3. CSS Framework Version Compatibility**
- **What happened**: Styling conflicts when using custom CSS variables  
- **Root cause**: Tailwind CSS v4 syntax differed from v3 configuration  
- **Solution**: Adapted green theme implementation to the existing Tailwind config  

### **4. Module Resolution and Import Paths**
- **What happened**: Import/export errors between React components  
- **Root cause**: Incorrect relative import paths and inconsistent module export patterns  
- **Solution**: Standardized file structure and import patterns across components

---

## What I'd Improve in the Future

### **Easy Improvements**
- Password strength meter – show users how strong their password is as they type  
- "Remember me" checkbox – stay logged in longer  
- Profile picture upload – let users add a photo  

### **Advanced Features**
- Email verification – send emails to confirm new accounts (already set up, but delivery can be slow)  
- Password reset – let users reset forgotten passwords via email  
- Social login – sign in with Google, Facebook, etc.  
- User profiles – let users edit their information  

### **Technical Improvements**
- Better error messages – more specific help when something goes wrong  
- Loading animations – smoother visual feedback  
- Form auto-save – don't lose typed data if you refresh  
- Better security – add extra protection against hackers

---

## Testing the App
To make sure everything works:

1. **Create a new account** – Fill out the sign-up form  
2. **Log out** – Click the logout button  
3. **Log back in** – Use the same email and password  
4. **Try wrong password** – Make sure error messages show up  
5. **Test on phone** – Verify it looks good on mobile  

---

## Summary
This assessment demonstrates a complete Next.js authentication system with Firebase integration.  
All required features have been successfully implemented:

- Login page with Full Name, Email, and Password fields  
- Firebase Authentication for user registration and login  
- Homepage with personalized greeting and logout functionality  
- Input validation and error handling  
- Clean, responsive design with Babylon Radio branding  

The application is fully functional and ready for testing.
