# VirtualWallet

Responsive Next.js interface preview based on the supplied VirtualWallet reference. The original section order and eleven supplied images are retained, with expanded desktop layouts and a compact mobile layout. This independent preview is not affiliated with Trust Wallet.

## Included

- Responsive hero, feature cards, product tabs, security panels, downloads, asset cards, FAQ and footer.
- Local images and Inter fonts; no dependency on the reference server at runtime.
- Keyboard-accessible tabs, accordion, native modal dialogs and reduced-motion support.
- Shared wallet connection state across header and hero, with explicit user initiation and HTTPS checking.

## Connection boundary

Only TRON wallet connection and public-address display are implemented. The application does not call transaction signing, token approvals, transfers, seed-phrase collection or private-key collection. The wallet SDK is loaded only after the user clicks Connect. No connection metadata is sent to an application backend.

Product illustrations are previews, not live balances or claims of implemented trading, staking, recovery, security-scanning or 100+ network support. Unconfigured app-store, extension, social and service destinations open an explanatory dialog. Real destinations must be configured before presenting this as a production product.

## Develop

Use Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Optionally copy `.env.example` to `.env.local` and set a valid 32-character `NEXT_PUBLIC_REOWN_PROJECT_ID` to enable wallet connection. Without it, the page works and the connection buttons explain that setup is incomplete.

```sh
npm run lint
npm run build
npm start
```

## Assets

The eleven PNG assets under `public/images/virtualwallet` come from the user-supplied reference at `http://91.219.239.211/`. Only static images and visual styling were carried over; none of its executable JavaScript was imported. The VirtualWallet V-shield is rendered as an independent SVG mark. Local Inter font subsets are licensed under the SIL Open Font License (see `public/fonts/OFL.txt`).

## Deployment

Import the repository into Vercel as a Next.js project. Configure `NEXT_PUBLIC_REOWN_PROJECT_ID` only if address display is needed. A database is not required for this landing page. The optional existing `db/schema.sql` is not connected to the application.
