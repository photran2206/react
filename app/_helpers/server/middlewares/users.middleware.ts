import { db } from '../db';

const User = db.User;


export const usersMiddleware = {
   checkIdUser: checkIdUser
};

async function checkIdUser(id: string) {
    return {
        success: true,
        message: 'Gà'
    }
}

