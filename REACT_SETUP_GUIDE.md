# React Hybrid Setup Guide - MLRIT Success Stories

## Step 1: Create React App with Vite

Run these commands in your project root:

```bash
# Create React + TypeScript app
npm create vite@latest react-app -- --template react-ts

# Navigate to react-app
cd react-app

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui dependencies
npm install class-variance-authority clsx tailwind-merge lucide-react

# Install additional utilities
npm install @radix-ui/react-slot
```

## Step 2: Configure Tailwind CSS

The configuration files will be created automatically in the next steps.

## Step 3: Setup shadcn/ui

```bash
# Initialize shadcn/ui (from react-app directory)
npx shadcn-ui@latest init
```

When prompted:
- TypeScript: Yes
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: Yes
- Components directory: src/components
- Utils directory: src/lib
- React Server Components: No
- Write config: Yes

## Step 4: Build for Production

```bash
# Build the React app
npm run build

# This creates /react-app/dist folder with production files
```

## Step 5: Embed in HTML

The built files will be automatically referenced in your main index.html.

---

## Project Structure

```
/react-app
  /src
    /components
      /ui              # shadcn components
      /sections        # Custom sections
    /lib               # Utilities
    App.tsx
    main.tsx
  /dist                # Production build (after npm run build)
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.js
```

---

## Next Steps

After running the commands above, I'll provide:
1. All component code
2. Configuration files
3. Build scripts
4. Embed instructions
