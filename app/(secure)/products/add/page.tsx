'use client';
import { AddEdit } from '_components/products';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCategoryService } from '_services';

export default Add;

function Add() {
    const router = useRouter();

    const categoryService = useCategoryService();
    const category = categoryService.categories;

    useEffect(() => {
        // fetch product for add/edit form
        categoryService.getAll();
    }, [router]);

    return <AddEdit title="Add Product" category={category}/>;
}