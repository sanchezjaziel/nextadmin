# Presupuesto Next.js

A modern budget management application built with Next.js 14, TypeScript, and React.

## Features

- 💰 Track income and expenses
- 📊 Real-time balance calculation
- 💾 Persistent storage with localStorage
- 🎨 Beautiful gradient UI with animations
- 📱 Fully responsive design
- 🌙 Dark mode design

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS Variables
- **State Management**: React Hooks
- **Data Persistence**: localStorage

## Project Structure

```
presupuesto-nextjs/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── BalanceCard.tsx     # Balance display
│   ├── TransactionForm.tsx # Add transaction form
│   ├── TransactionList.tsx # Transaction list
│   └── TransactionItem.tsx # Individual transaction
├── hooks/
│   └── useLocalStorage.ts  # localStorage hook
├── types/
│   └── transaction.ts      # TypeScript types
└── utils/
    └── helpers.ts          # Utility functions
```

## License

MIT
