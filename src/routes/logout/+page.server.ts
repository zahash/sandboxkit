import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { logout_sid } from '$lib/server';

export const load = (async ({ cookies }) => {
    const sid = cookies.get("sessionid");
    if (!sid) { throw redirect(303, "/login"); }

    const { err } = await logout_sid(sid);
    if (err) { return { success: false, errorKind: 'DatabaseError' }; }

    throw redirect(303, "/login");
}) satisfies PageServerLoad;
