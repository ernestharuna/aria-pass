import client from "./client";

export default async function authRequest(
    credentials: Record<string, FormDataEntryValue>,
    url: 'login' | 'register' | 'forgot-password' | 'reset-password'
) {
    await client.get('sanctum/csrf-cookie');

    const formData = new FormData();

    for (const key in credentials)
        formData.append(key, credentials[key]);

    const response = await client.post(`/api/${url}`, formData);

    return response;
};  