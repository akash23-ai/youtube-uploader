import z from "zod"

export const uploadInput = z.object({
    title : z.string(),
    description : z.string(),
    tags : z.string().array() || z.string()
})