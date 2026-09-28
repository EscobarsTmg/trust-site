# VaultView / trust-site

Secure Next.js wallet-connected asset dashboard.

## Security model

This project deliberately supports **wallet connection only**. It does not build or submit TRC-20 approvals, token transfers, transaction signatures, seed-phrase forms or private-key collection.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_REOWN_PROJECT_ID`.
3. Run `npm install`.
4. Run `npm run dev`.

## Database

`db/schema.sql` contains an optional PostgreSQL schema for storing connection metadata only. Add `DATABASE_URL` only after provisioning a separate PostgreSQL database.

## Deployment

Import `EscobarsTmg/trust-site` into Vercel and add the required environment variables.
