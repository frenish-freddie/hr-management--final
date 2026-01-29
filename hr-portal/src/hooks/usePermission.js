/**
 * Custom hook to check user permission level
 */
export function usePermission() {
    const seniority = (localStorage.getItem("seniority") || "").toLowerCase();
    const isSenior = seniority.includes("senior");
    return { isSenior, seniority };
}
