export async function fetchData(url:string,method:"GET"|"POST"|"PUT"|"DELETE"|"PATCH",auth:string|"",body:object|null) {
    try {
        const request = await fetch(import.meta.env.VITE_PUBLIC_REQUEST_URL+url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`
            },
            body: body ? JSON.stringify(body) : null
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}