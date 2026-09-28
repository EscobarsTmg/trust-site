"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import type { WalletConnectWallet } from "@tronweb3/walletconnect-tron";

type Connection = { address: string; busy: boolean; message: string; connect: () => Promise<void>; disconnect: () => Promise<void> };
const WalletContext = createContext<Connection | null>(null);

/** Address display only: no signing, approvals, transfers or backend writes. */
export function WalletProvider({ children }: { children: ReactNode }) {
  const walletRef = useRef<WalletConnectWallet | null>(null);
  const pending = useRef(false);
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const connect = async () => {
    if (pending.current) return;
    const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;
    if (!window.isSecureContext) { setMessage("Cüzdan bağlantısı için HTTPS kullanın."); return; }
    if (!projectId || !/^[a-f0-9]{32}$/i.test(projectId)) { setMessage("Cüzdan bağlantısı henüz yapılandırılmadı."); return; }
    pending.current = true; setBusy(true); setMessage("");
    try {
      if (!walletRef.current) {
        // Initialize only following an explicit user click.
        const { WalletConnectWallet, WalletConnectChainID } = await import("@tronweb3/walletconnect-tron");
        const wallet = new WalletConnectWallet({ network: WalletConnectChainID.Mainnet, options: { relayUrl: "wss://relay.walletconnect.com", projectId, metadata: { name: "VirtualWallet Preview", description: "Connect to display your public address only", url: window.location.origin, icons: [window.location.origin + "/icon.svg"] } }, allWallets: "SHOW", themeMode: "light", enableWalletGuide: true, themeVariables: { "--w3m-z-index": 10000 } });
        wallet.on("disconnect", () => { setAddress(""); setMessage(""); });
        wallet.on("accountsChanged", accounts => setAddress(accounts?.[0] || ""));
        walletRef.current = wallet;
      }
      const result = await walletRef.current.connect();
      setAddress(result?.address || "");
    } catch { setMessage("Bağlantı tamamlanamadı veya iptal edildi. Tekrar deneyebilirsiniz."); }
    finally { pending.current = false; setBusy(false); }
  };
  const disconnect = async () => {
    if (pending.current) return;
    pending.current = true; setBusy(true); setMessage("");
    try { await walletRef.current?.disconnect(); setAddress(""); }
    catch { setMessage("Bağlantı kapatılamadı. Cüzdanınızdan oturumu sonlandırın."); }
    finally { pending.current = false; setBusy(false); }
  };
  return <WalletContext.Provider value={{address,busy,message,connect,disconnect}}>{children}</WalletContext.Provider>;
}

export default function WalletConnect({ compact = false }: { compact?: boolean }) {
  const context = useContext(WalletContext);
  if (!context) throw new Error("WalletProvider is required");
  const {address,busy,message,connect,disconnect} = context;
  const label = address ? `${address.slice(0, 5)}…${address.slice(-4)}` : busy ? "Bağlanıyor…" : "Cüzdan Bağla";
  return <div className="wallet-control"><button className={`${compact ? "download-chip wallet-chip" : "wallet-connect-hero"} ${address ? "is-connected" : ""}`} disabled={busy} onClick={address ? disconnect : connect} title={address ? `${address} — Bağlantıyı kes` : undefined}><span className="wallet-button-label">{label}</span></button>{message && <span className="wallet-tooltip" role="status">{message}</span>}</div>;
}
