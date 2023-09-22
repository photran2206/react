'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { useCategoryService } from '_services';

export default Categories;

function Categories() {
    const categoryService = useCategoryService();
    const categories = categoryService.categories;

    useEffect(() => {
        categoryService.getAll();
    }, []);

    return (
        <>
            <h1>Category</h1>
            <Link href="/categories/add" className="btn btn-sm btn-success mb-2">Add Category</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <TableBody />
                </tbody>
            </table>
        </>
    );

    function TableBody() {
        if (categories?.length) {
            return (categories.map((categories: any) =>
                <tr key={categories.name}>
                    <td>{categories.name}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                        <Link href={`/categories/edit/${categories.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                        <button onClick={() => categoryService.delete(categories.id)} className="btn btn-sm btn-danger btn-delete-categories" style={{ width: '60px' }} disabled={categories.isDeleting}>
                            {
                                categories.isDeleting
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
