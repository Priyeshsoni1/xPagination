export const fetchTable = async () => {
  try {
    const res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("API response is not an array");
    }
    return data;
  } catch (err) {
    // alert("Error in Loading Data");
    console.log("Error in Data Fetching:", err);
    return [];
  }
};
