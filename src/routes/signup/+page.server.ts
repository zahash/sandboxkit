import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { safedb } from '$lib/server';
import { hash } from 'bcrypt';

const insert = `insert into users (user, pass) values (?, ?)`;

const Form = z.object({
    user: z.string(),
    pass: z.string()
});
type Form = z.infer<typeof Form>;

export const actions = {
    signup: async ({ request }) => {
        const result = Form.safeParse(Object.fromEntries(await request.formData()));
        if (!result.success) {
            console.log(result.error);
            return { success: false, errorKind: 'malformedData' };
        }

        const hashed = await hash(result.data.pass, 10);

        const { err } = await safedb(db => db.run(
            `insert into users (user, pass) values (?, ?)`,
            [result.data.user, hashed],
        ));
        if (err) { return { success: false, errorKind: 'DatabaseError' }; }

        throw redirect(303, "/login")
    }
} satisfies Actions;
