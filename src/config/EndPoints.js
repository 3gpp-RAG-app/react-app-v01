const apiBaseUrl =  'http://127.0.0.1:5000/milvus';

export const apiEndpoints = {
    search: `${apiBaseUrl}/search`,
    logs:`${apiBaseUrl}/logs`,
    session: `${apiBaseUrl}/uid`,
    diff: `${apiBaseUrl}/diff`,

};