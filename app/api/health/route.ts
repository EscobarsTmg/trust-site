export async function GET() {
  return Response.json({
    ok: true,
    service: "vaultview",
    walletMode: "connect-only"
  });
}
