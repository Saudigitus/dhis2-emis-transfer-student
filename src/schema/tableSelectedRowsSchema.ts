import { atom } from 'recoil';
import { z } from 'zod';

export const selectionSchema = z.object({
    isAllRowsSelected: z.boolean(),
    selectedRows: z.array(z.object({
        teiInstance: z.object({
            attributes: z.array(z.object({
                attribute: z.string(),
                value: z.string()
            })),
            createdAt: z.any(),
            enrollments: z.array(z.object({
                enrollment: z.any(),
                orgUnit: z.any(),
                orgUnitName: z.any(),
                status: z.string()
            })),
            orgUnit: z.string(),
            trackedEntity: z.string(),
            trackedEntityType: z.string()
        }),
        transferInstance: z.object({
            event: z.string(),
            orgUnit: z.string(),
            orgUnitName: z.string(),
            dataValues: z.array(z.object({
                dataElement: z.string(),
                value: z.string()
            }))

        }),
        registrationInstance: z.object({
            event: z.string(),
            orgUnit: z.string(),
            orgUnitName: z.string(),
            dataValues: z.array(z.object({
                dataElement: z.string(),
                value: z.string()
            }))

        })
    })),
    rows: z.array(z.object({}))
})

export type SelectionSchemaConfig = z.infer<typeof selectionSchema>

export const RowSelectionState = atom<SelectionSchemaConfig>({
    key: "get-selection-rows",
    default: {
        isAllRowsSelected: false,
        selectedRows: [],
        rows: []
    }
})
