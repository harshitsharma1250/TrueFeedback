import {z} from 'zod' ;

export const singInScehma = z.object({
    identifier:z.string(),
    password:z.string()
})