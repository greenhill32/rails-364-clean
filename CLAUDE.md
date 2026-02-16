# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**364 Ways to Say No** is a React Native app built with Expo and TypeScript. It uses file-based routing via Expo Router and supports iOS, Android, and web platforms.

## Development Commands

```bash
# Start the development server (interactive prompt for platform selection)
npm start

# Run on specific platforms
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser

# Code quality
npm run lint       # Run ESLint

# Reset project
npm run reset-project  # Moves starter code to app-example/, creates fresh app/
```

## Architecture & Routing

### File-Based Routing
Routes are auto-generated from file structure in the `app/` directory using Expo Router v6. Route definition: filename → URL path (e.g., `app/pick-golden-day.tsx` → `/pick-golden-day`).

### Navigation Stack
- Root layout (`app/_layout.tsx`): Uses `<Stack>` navigator with `headerShown: false`
- Navigation happens via `router.push()`, `router.replace()`, etc. from `expo-router`

### Current Screen Flow
```
index.tsx (splash, 2s)
  ↓
about.tsx (intro, 3s auto-progress or click "Begin")
  ↓
pick-golden-day.tsx (date selection, navigates to /calendar)
  ↓
calendar.tsx (not yet created)
```

### Key Patterns
- Screens are functional components using React hooks (`useState`, `useEffect`)
- Auto-progression: Use `useEffect` with `setTimeout` → `router.replace()` (see `index.tsx`, `about.tsx`)
- Navigation buttons: `TouchableOpacity` with `onPress={() => router.replace('/route')}`
- Styling: Inline React Native styles (no CSS/Tailwind)

## Directory Structure

```
app/               # Screen components (file-based routing)
components/        # Reusable UI components (themed-text, collapsible, etc.)
constants/         # Theme config, fonts, etc.
hooks/             # Custom React hooks
assets/            # Images, icons, fonts
scripts/           # Utility scripts (e.g., reset-project.js)
```

## Tech Stack

- **Framework**: Expo 54.0 / React Native 0.81.5
- **Routing**: Expo Router 6.0
- **Language**: TypeScript 5.9
- **Navigation**: @react-navigation (bottom-tabs, native stack)
- **Icons**: Expo Vector Icons, Expo Symbols
- **UI**: React Native core components
- **Linting**: ESLint with Expo config
- **Platform Support**: iOS (Xcode required), Android (Android Studio), Web (React Native Web)

## Build & Deployment

- Config: `app.json` (app name, version, icons, splash screen, iOS/Android settings)
- Managed with EAS (Expo Application Services) config in `eas.json`
- Typing: `tsconfig.json` extends `expo/tsconfig.base` with strict mode enabled

## Common Development Patterns

### Creating a New Screen
1. Create `app/new-screen.tsx` with default export function component
2. Use `router.push()` or `router.replace()` for navigation
3. Match styling approach: inline React Native styles with dark theme (bg: `#1a0f0a`, accent: `#D4AF37`)

### Auto-Progressing Screens
Use pattern from `index.tsx`:
```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    router.replace('/next-route');
  }, delayInMs);
  return () => clearTimeout(timer);
}, []);
```

### Reusable Components
Add TypeScript components to `components/` directory and import with path alias: `import { Component } from '@/components/component-name'`

## Path Aliases

TypeScript `compilerOptions.paths` configured: `@/*` → `./` (project root)
Use for clean imports: `import { MyComponent } from '@/components/my-component'`

## Testing & Linting

- Lint: `npm run lint` (runs `expo lint`)
- No test framework currently configured

## Important Notes

- Strict TypeScript mode enabled
- App uses inline styles; no CSS-in-JS or Tailwind
- Dark theme primary colors: `#1a0f0a` (bg), `#D4AF37` (gold accent)
- All screens currently navigate via file-based routing with Stack navigator
