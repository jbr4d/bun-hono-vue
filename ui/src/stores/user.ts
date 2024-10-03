import { defineStore } from "pinia";
import { computed } from "vue";
import { useCurrentUser } from "@/composables/useUser";

export const useUserStore = defineStore("user", () => {
const { data: currentUser } = useCurrentUser();
//   function clear() {
//     // TODO: clear current user
//   }

  return {
    isAuthenticated: computed(() => currentUser.value !== undefined),
    userData: computed(() => currentUser.value?.user),
  };
});
