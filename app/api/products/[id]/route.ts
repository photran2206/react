import joi from 'joi';

import { cookies } from 'next/headers';

import { apiHandler } from '_helpers/server/api';
import { productsRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    DELETE: _delete
});

async function getById(req: Request, { params: { id } }: any) {
    return await productsRepo.getById(id);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    await productsRepo.update(id, body);
}

update.schema = joi.object({
    name: joi.string(),
    price: joi.number(),
});

async function _delete(req: Request, { params: { id } }: any) {
    await productsRepo.delete(id);

    // auto logout if deleted self
    // if (id === req.headers.get('userId')) {
    //     cookies().delete('authorization');
    //     return { deletedSelf: true };
    // }
}
