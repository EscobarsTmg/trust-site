import WalletConnect from "../components/WalletConnect";

const assets = [
  { symbol: "USDT", name: "Tether USD", amount: "0.00", value: "$0.00", change: "0.00%" },
  { symbol: "TRX", name: "TRON", amount: "0.00", value: "$0.00", change: "0.00%" },
  { symbol: "BTC", name: "Bitcoin", amount: "0.00", value: "$0.00", change: "0.00%" },
  { symbol: "ETH", name: "Ethereum", amount: "0.00", value: "$0.00", change: "0.00%" }
];

export default function Home() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#assets" aria-label="VaultView home">
          <span className="brand-mark">V</span>
          <span>VaultView</span>
        </a>

        <nav className="nav">
          <a href="#assets">Assets</a>
          <a href="#security">Security</a>
          <a href="#about">About</a>
        </nav>

        <WalletConnect />
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Secure wallet dashboard</span>
          <h1>Your assets, clearly organized.</h1>
          <p>
            Connect a compatible wallet to view the active address. VaultView
            does not request token approvals, transfers or transaction signatures.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#assets">View assets</a>
            <a className="button button-ghost" href="#security">How security works</a>
          </div>
          <div className="trust-row">
            <span>Read-only connection</span>
            <span>No approvals</span>
            <span>No transfers</span>
          </div>
        </div>

        <div className="hero-card" aria-label="Portfolio preview">
          <div className="card-orbit orbit-one" />
          <div className="card-orbit orbit-two" />
          <div className="portfolio-card">
            <div className="portfolio-head">
              <span>Portfolio value</span>
              <span className="live-pill">Live</span>
            </div>
            <strong>$0.00</strong>
            <span className="muted">Connect a wallet to begin</span>
            <div className="mini-chart" aria-hidden="true">
              <i style={{ height: "30%" }} />
              <i style={{ height: "44%" }} />
              <i style={{ height: "36%" }} />
              <i style={{ height: "58%" }} />
              <i style={{ height: "51%" }} />
              <i style={{ height: "72%" }} />
              <i style={{ height: "66%" }} />
              <i style={{ height: "84%" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" id="assets">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2>Assets</h2>
          </div>
          <span className="muted">Balances are not requested until a data provider is configured.</span>
        </div>

        <div className="asset-panel">
          <div className="asset-head row-grid">
            <span>Asset</span>
            <span>Balance</span>
            <span>Value</span>
            <span>24h</span>
          </div>
          {assets.map((asset) => (
            <div className="asset-row row-grid" key={asset.symbol}>
              <div className="asset-name">
                <span className="coin">{asset.symbol.slice(0, 1)}</span>
                <div>
                  <strong>{asset.symbol}</strong>
                  <span>{asset.name}</span>
                </div>
              </div>
              <span>{asset.amount}</span>
              <strong>{asset.value}</strong>
              <span className="neutral-change">{asset.change}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="security-grid" id="security">
        <article className="info-card">
          <span className="info-icon">01</span>
          <h3>Connection only</h3>
          <p>The wallet flow is limited to account connection and disconnection.</p>
        </article>
        <article className="info-card">
          <span className="info-icon">02</span>
          <h3>No hidden permissions</h3>
          <p>No ERC-20/TRC-20 approval or spending allowance request is generated.</p>
        </article>
        <article className="info-card">
          <span className="info-icon">03</span>
          <h3>Explicit actions</h3>
          <p>Any future transaction feature must show its exact amount and destination first.</p>
        </article>
      </section>

      <footer id="about">
        <a className="brand footer-brand" href="#assets">
          <span className="brand-mark">V</span>
          <span>VaultView</span>
        </a>
        <span>Secure asset dashboard</span>
      </footer>
    </main>
  );
}
