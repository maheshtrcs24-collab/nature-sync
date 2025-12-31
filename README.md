# Nature Sync - Environmental & Community Platform

Nature Sync is a platform that connects organizers and volunteers for nature-related activities.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth

## Getting Started

### Prerequisites
- Node.js installed
- Supabase account and project

### Backend Setup
1. `cd server`
2. `npm install`
3. Create `.env` from `.env.example` and add your Supabase credentials.
4. `npm run dev`

### Frontend Setup
1. `cd client`
2. `npm install`
3. Create `.env` from `.env.example` and add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
4. `npm run dev`

## Features
- **User Authentication**: Sign up and login via Supabase.
- **Event Management**: Organizers can create, edit, and delete events.
- **Volunteer Registration**: Users can browse and register for local eco-events.
- **Responsive Design**: Modern UI that works on all devices.
