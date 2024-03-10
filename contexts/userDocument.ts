import { UserDocument } from "@/lib/types";
import { create } from "zustand";

export type UserDocumentStore = {
  userDocument: UserDocument | null;
  setUserDocument: (userDocument: UserDocument) => void;
};

export const useUserDocumentStore = create<UserDocumentStore>()((set) => ({
  userDocument: null,
  setUserDocument: (userDocument: UserDocument) => set({ userDocument }),
}));
