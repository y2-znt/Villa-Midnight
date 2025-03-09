export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

if (!API_BASE_URL) {
  console.warn("⚠️ NEXT_PUBLIC_API_URL is not defined! API calls will fail.");
}

export const getToken = () => {
  if (typeof window === "undefined") return null;
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.exp * 1000 < Date.now()) {
      console.log("Token expired, removing...");
      localStorage.removeItem("token");
      return null;
    }

    return token;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};
