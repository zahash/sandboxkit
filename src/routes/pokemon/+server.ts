import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';

const Pokemon = z.object({
    name: z.string(),
    ability: z.string()
});
type Pokemon = z.infer<typeof Pokemon>;

let pokemon: Pokemon[] = [
    { name: "squirtle", ability: "aqua jet" },
    { name: "pika", ability: "thunder" }
];

export const GET: RequestHandler = async () => {
    return json(pokemon)
};

export const POST: RequestHandler = async ({ request }) => {
    let poke = Pokemon.safeParse(await request.json());
    if (!poke.success) {
        throw error(400, poke.error);
    }

    pokemon.push(poke.data);
    return new Response(null, { status: 201 });
};
