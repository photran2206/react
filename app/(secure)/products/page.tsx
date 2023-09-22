'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { useProductService } from '_services';

export default Users;

function Users() {
    const productService = useProductService();
    const product = productService.products;

    useEffect(() => {
        productService.getAll();
    }, []);

    return (
        <>
            <h1>Produce</h1>
            <Link href="/products/add" className="btn btn-sm btn-success mb-2">Add Product</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Price</th>
                        <th style={{ width: '30%' }}>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <TableBody />
                </tbody>
            </table>
        </>
    );

    function TableBody() {
        if (product?.length) {
            return (product.map((product: any) =>
                <tr key={product.name}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <th style={{ width: '30%' }}>Category</th>
                    <td style={{ whiteSpace: 'nowrap' }}>
                        <Link href={`/products/edit/${product.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                        <button onClick={() => productService.delete(product.id)} className="btn btn-sm btn-danger btn-delete-product" style={{ width: '60px' }} disabled={product.isDeleting}>
                            {
                                product.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                            }
                        </button>
                    </td>
                </tr>
            ));
        }
    }
}
