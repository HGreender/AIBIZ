# SMART Goals Chat Application

A web application that helps users transform their questions into SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound).

## Features

- Converts user input into SMART goal format
- Provides top 3 SMART goal suggestions
- Analyzes missing SMART components in user's initial question
- Dark theme and mobile-first design
- Real-time chat interface

## Technology Stack

- Next.js 14
- TypeScript
- Redux Toolkit
- SCSS Modules
- OpenAI GPT-4
- Mobile-first responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
