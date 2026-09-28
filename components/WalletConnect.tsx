"use client";

import { useEffect, useRef, useState } from "react";
import { Wallet } from "lucide-react";
import {
  WalletConnectWallet,
  WalletConnectChainID
} from "@tronweb3/walletconnect-tron";

type WalletState = "idle" | "connecting" | "connected" | "error";

export default function WalletConnect({ compact = false }: { compact?: boolean }) {
  const walletRef = useRef<WalletConnectWallet | null>(null);
  const [state, setState] = useState<WalletState>("idle");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const getWallet = () => {
    if (walletRef.current) return walletRef.current;

    const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;
    if (!projectId) {
      throw new Error("WalletConnect project ID is not configured.");
    }

    const wallet = new WalletConnectWallet({
      network: WalletConnectChainID.Mainnet,
      options: {
        relayUrl: "wss://relay.walletconnect.com",
        projectId,
        metadata: {
          name: "VirtualWallet",
          description: "VirtualWallet secure wallet connection",
          url: window.location.origin,
          icons: [window.location.origin + "/icon.svg"]
        }
      },
      allWallets: "SHOW",
      themeMode: "light",
      enableWalletGuide: true,
      themeVariables: {
        "--w3m-z-index": 10000
      }
    });

    wallet.on("disconnect", () => {
      setAddress("");
      setState("idle");
      setMessage("");
    });

    wallet.on("accountsChanged", (accounts) => {
      const next = accounts?.[0] || "";
      setAddress(next);
      setState(next ? "connected" : "idle");
    });

    walletRef.current = wallet;
    return wallet;
  };

  useEffect(() => {
    let active = true;

    void (async () => {
      try {
        const wallet = getWallet();
        const status = await wallet.checkConnectStatus();
        if (active && status?.address) {
          setAddress(status.address);
          setState("connected");
        }
      } catch {
        // Wallet connection remains inactive until configuration is present.
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const connect = async () => {
    setState("connecting");
    setMessage("");

    try {
      const wallet = getWallet();
      const result = await wallet.connect();
      const next = result?.address || "";
      setAddress(next);
      setState(next ? "connected" : "idle");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Wallet connection failed.");
    }
  };

  const disconnect = async () => {
    try {
      await walletRef.current?.disconnect();
    } finally {
      setAddress("");
      setState("idle");
      setMessage("");
    }
  };

  const shortAddress = address
    ? address.slice(0, 6) + "…" + address.slice(-4)
    : "";

  return (
    <div className="relative">
      {address ? (
        <button
          onClick={disconnect}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-violet-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {shortAddress}
        </button>
      ) : (
        <button
          onClick={connect}
          disabled={state === "connecting"}
          className={
            compact
              ? "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-violet-300 disabled:opacity-60"
              : "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:-translate-y-0.5 hover:bg-violet-700 disabled:opacity-60"
          }
        >
          <Wallet className="h-4 w-4" />
          {state === "connecting" ? "Connecting…" : "Connect Wallet"}
        </button>
      )}

      {message ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-rose-100 bg-white p-3 text-xs leading-5 text-rose-600 shadow-xl">
          {message}
        </div>
      ) : null}
    </div>
  );
}
