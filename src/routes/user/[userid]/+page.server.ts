import type { PageServerLoad } from './$types';

export const load = (async ({ params, setHeaders }) => {
    setHeaders({
        "cache-control": "max-age=60"
    });

    return { userid: params.userid, name: "zahash", age: 24 };
}) satisfies PageServerLoad;
