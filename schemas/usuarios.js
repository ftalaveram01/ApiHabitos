import z from 'zod';

const usuarioSchema = z.object({
    id: z.number().int().min(0),
    nombre: z.string({
        invalid_type_error: 'User name must be a string',
        required_error: 'User name is required.'
    }),
    email: z.email({
        invalid_type_error: 'Email must be a email',
        required_error: 'Email is required.'
    }),
    password: z.string({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password is required.'
    }),
});

export function validateUser(input) {
    return usuarioSchema.safeParse(input)
}

export function validatePartialUser(input) {
    return usuarioSchema.partial().safeParse(input)
}