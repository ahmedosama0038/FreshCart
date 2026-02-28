"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { setUserInfo, User } from "../Store/Auth.Slice";
import { clearToken } from "../Server/Auth.actions";

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      await clearToken();
dispatch(
  setUserInfo({
    isAuthenticated: false,
    userInfo: null,
  } as unknown as User) 
);

      toast.update(toastId, {
        render: "Logged out successfully 👋",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      router.replace("/Login");
    } catch (error) {
      toast.update(toastId, {
        render: "Logout failed, try again ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return { logout };
}
