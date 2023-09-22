'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit } from '_components/categories';
import { Spinner } from '_components';
import { useCategoryService } from '_services';

export default Edit;

function Edit({ params: { id } }: any) {
    const router = useRouter();
    const categoryService = useCategoryService();
    const category = categoryService.category;

    useEffect(() => {
        if (!id) return;

        // fetch user for add/edit form
        categoryService.getById(id);
        
    }, [router]);

    return category
        ? <AddEdit title="Edit User" category={category} />
        : <Spinner />;
}