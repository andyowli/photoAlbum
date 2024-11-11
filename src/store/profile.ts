import { create } from "zustand";

type Profile = {
  profile: boolean;
  setProfile:(checked: boolean) => void;
};

export const useProfileStore = create<Profile>()
((set) => ({
  profile:true,
  setProfile:(checked: boolean) => set((state) => ({ profile: checked })),
}))