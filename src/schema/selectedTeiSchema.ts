import { atom } from "recoil"

export const SelectedTeiState = atom<Record<string, string>>({
    key: "selectedTei-get-state",
    default: {
    }
})
