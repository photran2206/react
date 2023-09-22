import { create } from 'zustand';

import { useAlertService } from '_services';
import { useFetch } from '_helpers/client';

export { useProductService };

// user state store
const initialState = {
    products: undefined,
    product: undefined,
    loading: false,
};
const productStore = create<IProductStore>(() => initialState);

function useProductService(): IProductService {
    const alertService = useAlertService();
    const fetch = useFetch();
    const { products, product, loading } = productStore();

    const handleApiError = (error: any) => {
        alertService.error(error);
    };

    return {
        products,
        product,
        loading,

        getAll: async () => {
            try {
                productStore.setState({ loading: true });
                const data = await fetch.get('/api/products');
                productStore.setState({ products: data, loading: false });
            } catch (error: any) {
                handleApiError(error);
                productStore.setState({ loading: false });
            }
        },

        getById: async (id) => {
            try {
                productStore.setState({ loading: true, products: undefined });
                const data = await fetch.get(`/api/products/${id}`);
                console.log('data', data);
                productStore.setState({ product: data, loading: false });
            } catch (error: any) {
                handleApiError(error);
                productStore.setState({ loading: false });
            }
        },

        create: async (product) => {
            try {
                await fetch.post('/api/products', product);
            } catch (error: any) {
                handleApiError(error);
            }
        },

        update: async (id, params) => {
            try {
                await fetch.put(`/api/products/${id}`, params);

                if (id === product?.id) {
                    productStore.setState({ product: { ...product, ...params } });
                }
            } catch (error: any) {
                handleApiError(error);
            }
        },

        delete: async (id) => {
            try {
                alertService.clear();
                productStore.setState({
                    products: products!.map(x => {
                        if (x.id === id) { x.isDeleting = true; }
                        return x;
                    })
                });

                const response = await fetch.delete(`/api/users/${id}`);
                productStore.setState({ products: products!.filter(x => x.id !== id) });
            } catch (error: any) {
                handleApiError(error);
                productStore.setState({
                    products: products!.map(x => {
                        if (x.id === id) { x.isDeleting = false; }
                        return x;
                    })
                });
            }
        }
    }
}

// interfaces

interface IProduct {
    id: string;
    name: string;
    price: string;
    isDeleting?: boolean;
}

interface IProductStore {
    products?: IProduct[];
    product?: IProduct;
    loading: boolean;
}

interface IProductService extends IProductStore {
    getAll: () => Promise<void>;
    getById: (id: string) => Promise<void>;
    create: (product: IProduct) => Promise<void>;
    update: (id: string, params: Partial<IProduct>) => Promise<void>;
    delete: (id: string) => Promise<void>;
}
