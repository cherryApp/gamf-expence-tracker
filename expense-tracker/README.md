# Expense Tracker

A modern expense tracking application built with Next.js 15, TypeScript, TailwindCSS, and PostgreSQL.

## Features

- ✅ Create, read, update, and delete expenses
- ✅ Track spending balance
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Modern UI with smooth animations
- ✅ Docker containerization

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 18+
- Docker & Docker Compose (for containerized setup)
- PostgreSQL (for local development)

## Setup Instructions

### 1. Install Dependencies

```bash
# Fix npm permissions first (if needed)
sudo chown -R $(whoami):$(whoami) ~/.npm

# Install dependencies
npm install
```

### 2. Setup Database

#### Using Docker (Recommended):
```bash
# Start PostgreSQL container
docker-compose up -d postgres

# Run Prisma migrations
npx prisma generate
npx prisma migrate dev --name init
```

#### Local PostgreSQL:
```bash
# Create database
createdb expense_tracker

# Set up Prisma
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Environment Variables

Copy the appropriate environment file:
```bash
# For local development
cp .env.local .env

# For Docker development
cp .env.docker .env
```

### 4. Run the Application

```bash
# Start development server
npm run dev

# Or use Docker
npm run docker:dev
```

Visit `http://localhost:3000`

## API Endpoints

- `GET /api/expenses` - List all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/[id]` - Update expense
- `DELETE /api/expenses/[id]` - Delete expense
- `GET /api/balance` - Get current balance

## Project Structure

```
expense-tracker/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ExpenseForm.tsx
│   ├── ExpenseList.tsx
│   ├── ExpenseItem.tsx
│   └── BalanceDisplay.tsx
├── lib/                   # Utilities and helpers
│   ├── db.ts              # Database connection
│   └── types.ts           # TypeScript types
├── prisma/                # Database schema
│   └── schema.prisma
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations

## Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose build
```

## Issues and Troubleshooting

### npm Permission Errors
If you encounter npm permission errors, run:
```bash
sudo chown -R $(whoami):$(whoami) ~/.npm
```

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env` file
- Verify database exists

### Prisma Issues
- Run `npx prisma generate` after schema changes
- Run `npx prisma migrate dev` for database migrations