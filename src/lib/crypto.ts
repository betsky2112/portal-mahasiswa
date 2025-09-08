import crypto from 'crypto';
export function sha512(s: string) {
    return crypto.createHash('sha512').update(s).digest('hex');
}
