import joi from 'joi';

import { apiHandler } from '_helpers/server/api';
import { categoriesRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    DELETE: _delete
});

async function getById(req: Request, { params: { id } }: any) {
    return await categoriesRepo.getById(id);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    await categoriesRepo.update(id, body);
}

update.schema = joi.object({
    name: joi.string(),
    price: joi.string(),
});

async function _delete(req: Request, { params: { id } }: any) {
    await categoriesRepo.delete(id);

    // auto logout if deleted self
    
}
