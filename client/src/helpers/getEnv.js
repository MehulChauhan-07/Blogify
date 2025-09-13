export const getEnv = (envname) => {
  const env = import.meta.env;
  const value = env[envname];

  // Provide fallback for API URL if not set
  if (envname === "VITE_API_BASE_URL" && !value) {
    return "http://localhost:5000/api";
  }

  return value;
};

// Keep the old function for backward compatibility
export const getEvn = getEnv;
