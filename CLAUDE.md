# Alumni Tutoring — Tutor Application Portal

## Overview
Multi-step tutor application flow. Prospective tutors fill out a form, select AP subjects, record teaching videos, and get scored (TQS — Teaching Quality Score). Single-purpose app — keep it focused.

## Tech Stack
- **Frontend:** React 18 + TypeScript, Vite (dev port 8080), React Router v6
- **Styling:** Tailwind CSS + Radix UI (shadcn-style components in `src/components/ui/`)
- **Forms:** React Hook Form + Zod validation
- **State:** TanStack React Query, Supabase JS client
- **Video:** Browser MediaRecorder API for teaching video capture
- **PDF:** React PDF for document viewing
- **Animation:** Framer Motion
- **Deployment:** Vercel (SPA)

## Commands
```bash
npm run dev        # Start dev server (localhost:8080)
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint
```

## Project Structure
```
src/
  components/
    ui/                        # 50+ shadcn-style UI primitives
    kibo-ui/                   # Custom branded components (Rating)
    TutorApplicationPage.tsx   # Main application flow (form → topics → recording → review → eval)
    TutorDirectory.tsx         # Tutor roster/search
    TutorProfilePage.tsx       # Individual tutor profile
    TutorOnboardingPolicy.tsx  # Onboarding docs
    VaultPage.tsx              # Educational resources
    QuizComponent.tsx          # SAT/test prep quiz
    PDFViewer.tsx              # PDF document rendering
  integrations/supabase/
    client.ts        # Supabase client
    types.ts         # Auto-generated DB types (do NOT edit manually)
  hooks/             # Custom hooks
  lib/               # Utilities (cn(), etc.)
  pages/             # Stub files — routing is component-based
```

## Application Flow
1. **Form** — Personal info, education, test scores, availability, subjects
2. **Select Topics** — Choose 1-3 AP subjects from 40 options
3. **Prep** — 30-second countdown before recording
4. **Recording** — Video teaching response per topic with specific prompts
5. **Review** — Preview all recordings before submission
6. **Evaluating** — System scores via `tqs_score` (Teaching Quality Score)
7. **Done** — Results and next steps

## Key Tables
- **tutor_applications** — id, ap_scores, tqs_score, status, teaching_video_url, etc.
- Resumes + headshots uploaded as Supabase storage files
- Local storage caches ongoing application ID (`alumni_apply_app_id`)

## Key Patterns

### Single-purpose app
- One route: `/` → TutorApplicationPage
- All other routes redirect to `/`
- Don't add unrelated features — this is application-only

### Same Supabase project
- Shares database with portal, executive, landing, and sales
- Do not edit `types.ts` — auto-generated

### Styling
- Same Tailwind + Radix patterns as portal/executive
- Light mode only
- Premium design — this is a tutor's first impression of the company

## Rules

### Before starting work
- Pull latest: `git pull origin master`

### Code quality
- Do not add dependencies without asking
- Do not add `console.log` in committed code
- Run `npm run build` to verify no errors before committing

### After pushing
- Provide the GitHub PR link: `https://github.com/Padrejonesy/alumni-apply/pull/new/<branch>`
