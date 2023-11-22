import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { safedb, sessionid } from '$lib/server';
import { compare } from 'bcrypt';

const Form = z.object({
    user: z.string(),
    pass: z.string()
});
type Form = z.infer<typeof Form>;

export const actions = {
    login: async ({ request, cookies, url }) => {
        const result = Form.safeParse(Object.fromEntries(await request.formData()));
        if (!result.success) {
            console.log(result.error);
            return { success: false, errorKind: 'malformedData' };
        }

        const { data, err } = await safedb(db => db.get(
            `select * from users where user=?`, [result.data.user]
        ));
        if (err) { return { success: false, errorKind: 'DatabaseError' }; }

        if (!data) { return { success: false, errorKind: 'userNotFound' }; }
        const { uid, pass } = data;

        if (!(await compare(result.data.pass, pass))) {
            return { success: false, errorKind: 'invalidCreds' };
        }

        const sid = sessionid();

        {
            const { err } = await safedb(db => db.run(
                `insert into sessions (uid, sessionid) values (?, ?)`, [uid, sid]
            ));
            if (err) { return { success: false, errorKind: 'DatabaseError' }; }
        }

        cookies.set('sessionid', sid);

        let redirectTo = url.searchParams.get('redirectTo');
        if (redirectTo) { throw redirect(303, redirectTo); }
        else { throw redirect(303, "/private"); }
    }
} satisfies Actions;
