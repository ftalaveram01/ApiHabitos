import z from 'zod';

const habitoSchema = z.object({
    id: z.number().int().min(0),
    usuario_id: z.number().int().min(0),
    nombre: z.string({
        invalid_type_error: 'Habito name must be a string',
        required_error: 'Habito name is required.'
    }),
    descripcion: z.string({
        invalid_type_error: 'Email must be a string',
        required_error: 'Email is required.'
    }),
    creado_en: z.string().datetime({
        invalid_type_error: 'Created at must be a date',
    }),
});

export function validateHabito(input) {
    return habitoSchema.safeParse(input)
}

export function validatePartialHabito(input) {
    return habitoSchema.partial().safeParse(input)
}