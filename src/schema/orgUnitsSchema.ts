import { atom } from "recoil"
import { z } from "zod"

export const ouSchema = z.array(z.object({
        id: z.string(),
        name: z.string()
    }))

type OuSchema = z.infer<typeof ouSchema>

export const OuState = atom<OuSchema | undefined>({
    key: "ouSchema-state",
    default: undefined
})
