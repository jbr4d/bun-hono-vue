import { api } from "@/lib/api";

export async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  return res.json();
}
