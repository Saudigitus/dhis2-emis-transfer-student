import { atom } from "recoil"
import { z } from "zod"

export const selectedTabSchema = z.object({name: z.string(), value: z.string()})

export type SelectedTabSchema = z.infer<typeof selectedTabSchema>

export const TabsState = atom<SelectedTabSchema>({
    key: "tabs-state",
    default: { name: "Incoming transfer", value: "incoming" }

})
