import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from '../db';
import { usersMiddleware } from '../middlewares/users.middleware';

const User = db.User;

export const usersRepo = {
    authenticate,
    getAll,
    getById,
    getCurrent,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }: { username: string, password: string }) {
    const user = await User.findOne({ username });

    if (!(user && bcrypt.compareSync(password, user.password))) {
        throw 'Username or password is incorrectaaa';
    }


    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    return {
        user: user.toJSON(),
        token
    };
}

async function getAll() {
    console.log('vao 4')
    return await User.find();
}

async function getById(id: string) {
    try {
        return await User.findById(id);
    } catch {
        throw 'User Not Found';
    }
}

async function getCurrent() {
    try {
        const currentUserId = headers().get('userId');
        return await User.findById(currentUserId);
    } catch {
        throw 'Current User Not Found';
    }
}

async function create(params: any) {
    // validate
    if (await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    const user = new User(params);

    // hash password
    if (params.password) {
        user.password = bcrypt.hashSync(params.password, 10);
    }

    // save user
    const createUser = await user.save();

    const token = jwt.sign({ sub: createUser.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    return {
        user: createUser.toJSON(),
        token
    };
}

async function update(id: string, params: any) {
    const user = await User.findById(id);
    // validate
    if (!user) throw 'User not found';
    if (user.username !== params.username && await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(user, params);
    await user.save();
}

async function _delete(id: string) {
    const check = await usersMiddleware.checkIdUser(id);
    if(!check.success){
        throw 'Username is already taken';
    }
    await User.findByIdAndRemove(id);
}

