const apiBaseUrl = 'http://127.0.0.1:5000/milvus';
//'http://16.16.24.95:8000/milvus';

export const apiEndpoints = {
    search: `${apiBaseUrl}/search`,
    logs:`${apiBaseUrl}/logs`,
    session: `${apiBaseUrl}/uid`,

};