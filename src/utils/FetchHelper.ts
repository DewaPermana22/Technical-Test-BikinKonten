
interface ParamFetchHelper {
    url: string,
    method?: string,
    body?: any
}
export async function FetchHelper ({url, method = 'GET', body} : ParamFetchHelper) {
    const res = await fetch(url, {method, body});
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};