import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { logout_uid, safedb } from '$lib/server';

export const load = (async ({ cookies }) => {

    const sid = cookies.get("sessionid");
    if (!sid) { throw redirect(303, "/login"); }

    const { data, err } = await safedb(db => db.get("select * from sessions where sessionid=?", [sid]));
    if (err) { return { success: false, errorKind: 'DatabaseError' }; }

    if (!data) { throw redirect(303, "/login"); }
    const { uid } = data;

    {
        const { data, err } = await safedb(db => db.get(`select user from users where uid=?`, [uid]));
        if (err) { return { success: false, errorKind: 'DatabaseError' }; }

        // if the foreign key is corrupted/not present
        // i.e., sessionid is present but the associated user not found
        if (!data) {
            logout_uid(uid);
            throw redirect(303, "/login");
        }

        return data;
    }
}) satisfies PageServerLoad;
