import joi from 'joi';

import { categoriesRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await categoriesRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await categoriesRepo.create(body);
}

create.schema = joi.object({
    name: joi.string().required(),
});