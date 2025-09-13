export const getEnv = (envname) => {
  const env = import.meta.env;
  return env[envname];
};

// Keep the old function for backward compatibility
export const getEvn = getEnv;
