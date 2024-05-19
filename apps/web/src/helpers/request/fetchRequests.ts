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

export async function getEventsByOrganizer(token: string | undefined, orgID: string) {
    try {
        const res = await getRequest(token, `events/${orgID}`);
        const data = await res.json();
        return data.data
    } catch (error) {
        console.log(error)
    }
}
