This is a [Next.js](https://nextjs.org) and [Prisma](https://www.prisma.io/) project named discuss.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

## 1. Install Prisma

```bash
pnpm add -D prisma tsx
pnpm add @prisma/client
```

## 2. Initialize Prisma

```bash
pnpx prisma init --datasource-provider sqlite
```

## 3. Create the database tables and generate the Prisma Client

```bash
pnpx prisma migrate dev --name init
```
