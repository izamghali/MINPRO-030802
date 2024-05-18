export async function postRequest(data: any, segment: string) {
    const res = await fetch(`http://localhost:8000/api/${segment}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res;
}

export async function getRequest(data: any, segment: string) {
    const res = await fetch(`http://localhost:8000/api/${segment}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${data}`,
            'Content-Type': 'application/json'
        }
    })
    return res;
}