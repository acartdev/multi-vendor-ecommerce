export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function getData(endpoint) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/${endpoint}`);
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("VERCEL_ENV:", process.env.VERCEL_ENV);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${baseUrl}${endpoint}:`, error);
    throw error; // re-throw the error after logging it
  }
}
