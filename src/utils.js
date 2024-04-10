import path from 'path';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { Console } from 'console';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (bodyPassword, passwordDB) => bcrypt.compareSync( bodyPassword, passwordDB);




