import { UserDocument } from "@/lib/types";
import { create } from "zustand";

interface UserDocumentState {
  userDocument: UserDocument | null;
  setUserDocument: (userDocument: UserDocument) => void;
}

export const useUserDocument = create<UserDocumentState>()((set) => ({
  userDocument: null,
  setUserDocument: (userDocument: UserDocument) => set({ userDocument }),
}));
