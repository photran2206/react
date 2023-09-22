'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { useAlertService, useProductService } from '_services';

export { AddEdit };

function AddEdit({ title, product }: { title: string, product?: any }) {
    const router = useRouter();
    const alertService = useAlertService();
    const productService = useProductService();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm({ defaultValues: product });
    const { errors } = formState;

    const fields = {
        name: register('name', { required: 'Name is required' }),
        price: register('price', { required: 'price is required' }),
    };

    async function onSubmit(data: any) {
        alertService.clear();
        try {
            // create or update user based on user prop
            let message;
            if (product) {
                await productService.update(product.id, data);
                message = 'Product updated';
            } else {
                await productService.create(data);
                message = 'Product added';
            }

            // redirect to user list with success message
            router.push('/products');
            alertService.success(message, true);
        } catch (error: any) {
            alertService.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{title}</h1>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">Name</label>
                    <input {...fields.name} type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message?.toString()}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Price</label>
                    <input {...fields.price} type="text" className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.price?.message?.toString()}</div>
                </div>

                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => reset()} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
            </div>
            <Link href="/products" className="btn btn-link">Cancel</Link>
        </form >
    );
}