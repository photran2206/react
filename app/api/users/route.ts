import joi from 'joi';

import { usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create,
    DELETE: abc

});

async function getAll() {

    console.log('vao 3');
    return await usersRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

async function abc(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}


create.schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().min(6).required(),
});