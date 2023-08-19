import { atom } from "recoil";

export const ApprovalButtonClicked = atom<string>({
    key: "approval-clicked",
    default: ""
})
