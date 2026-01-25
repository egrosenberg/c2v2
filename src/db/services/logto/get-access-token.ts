const globalAccess = globalThis as unknown as {
  token: string;
  expiresAt: number;
};

const grace = 5000;

export async function getAccessToken() {
  if (
    !globalAccess?.token ||
    new Date().getTime() >= globalAccess.expiresAt - grace
  ) {
    const uri = `https://${process.env.LOGTO_TENANT_ID}.logto.app/oidc/token`;

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.LOGTO_API_APP_ID,
        client_secret: process.env.LOGTO_API_APP_SECRET,
        resource: `https://${process.env.LOGTO_TENANT_ID}.logto.app/api`,
        scope: "all",
      } as Record<string, string>),
    };

    const response = await fetch(uri, requestOptions);

    if (!response.ok)
      throw new Error(
        "Unable to retrieve access token: " + (await response.text()),
      );

    const json = await response.json();
    const token = json.access_token;

    if (!token)
      throw new Error(
        "Unable to retrieve access token: " + JSON.stringify(json),
      );

    const expiresAt = json.expires_in
      ? Date.now() + parseFloat(json.expires_in) * 1000
      : Date.now();

    globalAccess.token = token;
    globalAccess.expiresAt = expiresAt;
  }
  return globalAccess.token;
}
