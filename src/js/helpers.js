export const getJson = async function(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw res.status;
        const data = await res.json();

        return data;
    } catch (err) {
        throw err;
    }
}