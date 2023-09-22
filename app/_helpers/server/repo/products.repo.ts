import { db } from '../db';

const Product = db.Product;

export const productsRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// async function authenticate({ username, password }: { username: string, password: string }) {
//     const user = await User.findOne({ username });

//     if (!(user && bcrypt.compareSync(password, user.hash))) {
//         throw 'Username or password is incorrect';
//     }

//     // create a jwt token that is valid for 7 days
//     const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

//     return {
//         user: user.toJSON(),
//         token
//     };
// }

async function getAll() {
    return await Product.find().populate("category_id", "-createdAt -updatedAt");
}

async function getById(id: string) {
    try {
        return await Product.findById(id);
    } catch {
        throw 'Product Not Found';
    }
}



async function create(params: any) {
    // validate
    if (await Product.findOne({ name: params.name })) {
        throw 'name "' + params.name + '" is already taken';
    }

    const product = new Product(params);
    await product.save();
}

async function update(id: string, params: any) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'product not found';
    if (product.productName !== params.productName && await Product.findOne({ productName: params.productName })) {
        throw 'productName "' + params.productName + '" is already taken';
    }

    // copy params properties to product
    Object.assign(product, params);
    await product.save();
}

async function _delete(id: string) {
    await Product.findByIdAndRemove(id);
}

