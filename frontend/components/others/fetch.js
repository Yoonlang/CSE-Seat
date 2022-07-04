export const myFetch = async (method="GET", subURL="", body) => {
    if(method === "GET"){
        return await fetch(process.env.NEXT_PUBLIC_API_URL + subURL, {
            method: method
        })
    }
    return await fetch(process.env.NEXT_PUBLIC_API_URL + subURL, {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}