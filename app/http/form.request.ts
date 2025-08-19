import client from "./client";

type RequestType = 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'GET';

export default async function formRequest(
    // credentials: { [k: string]: FormDataEntryValue },
    credentials: Record<string, FormDataEntryValue>,
    url: string,
    method: RequestType = 'POST'
) {
    const formData = new FormData();
    formData.append("_method", method);

    for (const key in credentials)
        formData.append(key, credentials[key]);

    const response = await client.post(`/api/${url}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
};