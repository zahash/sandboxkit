import { Database } from 'sqlite3';
import { open } from 'sqlite';
import { randomBytes } from 'crypto';

export function sessionid() {
    return randomBytes(16).toString('base64');
}

const database = await open({
    filename: 'db.sqlite',
    driver: Database
});

export async function safedb(callback: (db: any) => Promise<any>) {
    try {
        return { data: await callback(database) }
    } catch (err) {
        console.log(err);
        return { err }
    }
}

export async function logout_uid(uid: number) {
    return await safedb(db => db.run(`delete from sessions where uid=?`, [uid]));
}

export async function logout_sid(sid: string) {
    return await safedb(db => db.run(`delete from sessions where sessionid=?`, [sid]));
}
