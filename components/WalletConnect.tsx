"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import type { WalletConnectWallet } from "@tronweb3/walletconnect-tron";

type Connection = {
  address: string;
  busy: boolean;
  message: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};
const WalletContext = createContext<Connection | null>(null);

// Public Reown project ID supplied for this site; deployments may override it.
const DEFAULT_REOWN_PROJECT_ID = "d60aa214058113755eff7e5d906d32d5";

/** Address display only: no signing, approvals, transfers or backend writes. */
export function WalletProvider({ children }: { children: ReactNode }) {
  const walletRef = useRef<WalletConnectWallet | null>(null);
  const pending = useRef(false);
  const disconnectRevision = useRef(0);
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const connect = async () => {
    if (pending.current || address) return;
    const projectId = (process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || DEFAULT_REOWN_PROJECT_ID).trim();
    if (!window.isSecureContext) {
      setMessage("Cüzdan bağlantısı için HTTPS kullanın.");
      return;
    }
    if (!/^[a-f0-9]{32}$/i.test(projectId)) {
      setMessage("Cüzdan bağlantısı proje ayarı geçersiz.");
      return;
    }

    pending.current = true;
    setBusy(true);
    setMessage("Cüzdan bağlantısı hazırlanıyor…");
    const revision = disconnectRevision.current;
    try {
      if (!walletRef.current) {
        const { WalletConnectWallet, WalletConnectChainID } = await import("@tronweb3/walletconnect-tron");
        const wallet = new WalletConnectWallet({
          network: WalletConnectChainID.Mainnet,
          options: {
            relayUrl: "wss://relay.walletconnect.com",
            projectId,
            metadata: {
              name: "VirtualWallet Preview",
              description: "Connect to display your public address only",
              url: window.location.origin,
              icons: [window.location.origin + "/icon.svg"],
            },
          },
          allWallets: "SHOW",
          themeMode: "light",
          enableAnalytics: false,
          themeVariables: { "--w3m-z-index": 10000 },
        });
        wallet.on("disconnect", () => {
          disconnectRevision.current += 1;
          setAddress("");
          setMessage("Cüzdan bağlantısı kapandı.");
        });
        wallet.on("accountsChanged", accounts => {
          const nextAddress = accounts?.[0] || "";
          if (!nextAddress) disconnectRevision.current += 1;
          setAddress(nextAddress);
          setMessage(nextAddress ? "Cüzdan adresi güncellendi." : "Cüzdan bağlantısı kapandı.");
        });
        walletRef.current = wallet;
      }

      let result = await walletRef.current.checkConnectStatus();
      if (revision !== disconnectRevision.current) return;
      if (!result?.address) {
        setMessage("Cüzdanınızda bağlantı isteğini onaylayın.");
        result = await walletRef.current.connect();
      }
      if (revision !== disconnectRevision.current) return;
      if (!result?.address) throw new Error("No wallet address returned");
      setAddress(result.address);
      setMessage("Cüzdan bağlandı. Yalnızca adresiniz görüntülenir.");
    } catch {
      setAddress("");
      setMessage("Bağlantı tamamlanamadı veya iptal edildi. Tekrar deneyebilirsiniz.");
    } finally {
      pending.current = false;
      setBusy(false);
    }
  };

  const disconnect = async () => {
    if (pending.current || !walletRef.current || !address) return;
    pending.current = true;
    disconnectRevision.current += 1;
    setBusy(true);
    setMessage("Bağlantı kapatılıyor…");
    try {
      await walletRef.current.disconnect();
      setMessage("Cüzdan bağlantısı kapandı.");
    } catch {
      setMessage("Yerel bağlantı temizlendi; oturumun kapatıldığı doğrulanamadı. Cüzdanınızdaki bağlı uygulamaları kontrol edin.");
    } finally {
      setAddress("");
      pending.current = false;
      setBusy(false);
    }
  };

  return <WalletContext.Provider value={{ address, busy, message, connect, disconnect }}>{children}</WalletContext.Provider>;
}

export default function WalletConnect({ compact = false }: { compact?: boolean }) {
  const context = useContext(WalletContext);
  if (!context) throw new Error("WalletProvider is required");
  const { address, busy, message, connect, disconnect } = context;
  const label = busy ? (address ? "Kapatılıyor…" : "Bağlanıyor…") : address ? `${address.slice(0, 5)}…${address.slice(-4)}` : "Cüzdan Bağla";
  return (
    <div className="wallet-control">
      <button
        type="button"
        className={`${compact ? "download-chip wallet-chip" : "wallet-connect-hero"} ${address ? "is-connected" : ""}`}
        disabled={busy}
        aria-busy={busy}
        aria-label={address ? `Bağlantıyı kes: ${address}` : "Cüzdan Bağla"}
        onClick={address ? disconnect : connect}
        title={address ? `${address} — Bağlantıyı kes` : "Yalnızca cüzdan adresinizi görüntüler"}
      >
        <span className="wallet-button-label">{label}</span>
      </button>
      {message && <span className="wallet-tooltip" role="status">{message}</span>}
      {address && !compact && <output aria-label="Bağlı cüzdan adresi" style={{ display: "block", overflowWrap: "anywhere", fontSize: "0.8rem", maxWidth: "22rem" }}>{address}</output>}
    </div>
  );
}

