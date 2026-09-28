create table if not exists wallet_sessions (
  id bigserial primary key,
  wallet_address text not null,
  chain text not null default 'tron',
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create index if not exists wallet_sessions_wallet_address_idx
  on wallet_sessions(wallet_address);

-- This schema stores connection metadata only.
-- Do not store private keys, seed phrases, signatures, or spending approvals.
