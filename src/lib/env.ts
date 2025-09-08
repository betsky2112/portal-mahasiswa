export const env = {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
    MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY!,
    MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY!,
    MIDTRANS_BASE_URL: process.env.MIDTRANS_BASE_URL,
};

export function assertEnv() {
    for (const [k, v] of Object.entries(env)) {
        if (!v) throw new Error(`Missing env: ${k}`);
    }
}
