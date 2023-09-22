import joi from 'joi';

import { productsRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await productsRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await productsRepo.create(body);
}

create.schema = joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
});