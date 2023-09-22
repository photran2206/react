import { db } from '../db';

const Cate = db.Category;

export const categoriesRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    const getCate = await Cate.find();
    return getCate;
}

async function getById(id: string) {
    try {
        return await Cate.findById(id);
    } catch {
        throw 'Cate Not Found';
    }
}



async function create(params: any) {
    // validate
    if (await Cate.findOne({ name: params.name })) {
        throw 'name "' + params.name + '" is already taken';
    }

    const user = new Cate(params);

    // hash password
  
    // save user
    await user.save();
}

async function update(id: string, params: any) {
    const cate = await Cate.findById(id);

    // validate
    if (!cate) throw 'cate not found';
    if (cate.productName !== params.productName && await Cate.findOne({ productName: params.productName })) {
        throw 'productName "' + params.productName + '" is already taken';
    }

    // copy params properties to cate
    Object.assign(cate, params);

    await cate.save();
}

async function _delete(id: string) {
    await Cate.findByIdAndRemove(id);
}

