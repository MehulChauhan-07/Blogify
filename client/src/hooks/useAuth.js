import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "@/redux/user/user.slice";
import { getEnv } from "@/helpers/getEnv";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const apiUrl = getEnv("VITE_API_BASE_URL");
        console.log("Verifying auth with API URL:", apiUrl);

        const response = await fetch(`${apiUrl}/auth/verify`, {
          method: "GET",
          credentials: "include",
        });

        console.log("Auth verification response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            dispatch(setUser(data.user));
            console.log("Authentication verified:", data.user);
          } else {
            console.log("Auth verification failed - invalid response data");
            dispatch(removeUser());
          }
        } else {
          // If verification fails, clear the user state
          console.log(
            "Authentication verification failed with status:",
            response.status
          );
          dispatch(removeUser());
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        dispatch(removeUser());
      }
    };

    // Only verify if we have persisted user data but no current user state
    // This prevents unnecessary API calls on every render
    if (!user.isLoggedIn && sessionStorage.getItem("persist:root")) {
      console.log("Attempting to verify authentication...");
      verifyAuth();
    }
  }, [dispatch, user.isLoggedIn]);

  return user;
};
