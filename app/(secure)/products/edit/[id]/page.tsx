'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit } from '_components/products';
import { Spinner } from '_components';
import { useProductService, useCategoryService } from '_services';

export default Edit;

function Edit({ params: { id } }: any) {
    const router = useRouter();
    const productService = useProductService();
    const product = productService.product;
    const categoryService = useCategoryService();
    const category = categoryService.categories;

    useEffect(() => {
        if (!id) return;

        // fetch product for add/edit form
        categoryService.getAll();
        productService.getById(id);
    }, [router]);

    return product
        ? <AddEdit title="Edit product" product={product} category={category}/>
        : <Spinner />;
}