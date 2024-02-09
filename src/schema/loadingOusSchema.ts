import { atom } from "recoil";

export const loadingOusState = atom<boolean>({
    key: "loading-ous",
    default: false
})
