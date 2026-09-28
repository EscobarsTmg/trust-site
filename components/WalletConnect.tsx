"use client";

import { useEffect, useRef, useState } from "react";
import {
  WalletConnectWallet,
  WalletConnectChainID
} from "@tronweb3/walletconnect-tron";

type WalletState = "idle" | "connecting" | "connected" | "error";

export default function WalletConnect() {
  const walletRef = useRef<WalletConnectWallet | null>(null);
  const [state, setState] = useState<WalletState>("idle");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const getWallet = () => {
    if (walletRef.current) return walletRef.current;

    const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;
    if (!projectId) {
      throw new Error("NEXT_PUBLIC_REOWN_PROJECT_ID is not configured.");
    }

    const wallet = new WalletConnectWallet({
      network: WalletConnectChainID.Mainnet,
      options: {
        relayUrl: "wss://relay.walletconnect.com",
        projectId,
        metadata: {
          name: "VaultView",
          description: "Read-only wallet connection for VaultView",
          url: window.location.origin,
          icons: [window.location.origin + "/icon.svg"]
        }
      },
      allWallets: "SHOW",
      themeMode: "dark",
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
    try {
      const wallet = getWallet();
      const status = wallet.checkConnectStatus();
      if (status?.address) {
        setAddress(status.address);
        setState("connected");
      }
    } catch {
      // Project ID may intentionally be absent in local preview.
    }
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

  const short = address ? address.slice(0, 7) + "…" + address.slice(-5) : "";

  return (
    <div className="wallet-control">
      {address ? (
        <>
          <span className="wallet-dot" aria-hidden="true" />
          <span className="wallet-address">{short}</span>
          <button className="button button-ghost" onClick={disconnect}>
            Disconnect
          </button>
        </>
      ) : (
        <button
          className="button button-primary"
          onClick={connect}
          disabled={state === "connecting"}
        >
          {state === "connecting" ? "Connecting…" : "Connect wallet"}
        </button>
      )}
      {message ? <span className="wallet-error">{message}</span> : null}
    </div>
  );
}
