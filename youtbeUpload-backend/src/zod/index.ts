import z from "zod"

export const uploadInput = z.object({
    // for validating file input
    title : z.string(),
    description : z.string(),
    tags : z.string().array() || z.string()
})