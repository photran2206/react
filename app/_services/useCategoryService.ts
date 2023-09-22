import { create } from 'zustand';

import { useAlertService } from '_services';
import { useFetch } from '_helpers/client';

export { useCategoryService };

// user state store
const initialState = {
    categories: undefined,
    category: undefined,
    loading: false,
};
const categoryStore = create<ICategoryStore>(() => initialState);

function useCategoryService(): ICategoryService {
    const alertService = useAlertService();
    const fetch = useFetch();
    const { categories, category, loading } = categoryStore();
    const handleApiError = (error: any) => {
        alertService.error(error);
    };

    return {
        categories, category, loading,
        getAll: async () => {
            try {
                categoryStore.setState({ loading: true });
                const data = await fetch.get('/api/categories');
                categoryStore.setState({ categories: data, loading: false });
            } catch (error: any) {
                handleApiError(error);
                categoryStore.setState({ loading: false });
            }
        },

        getById: async (id) => {
            try {
                categoryStore.setState({ loading: true, categories: undefined });
                const data = await fetch.get(`/api/categories/${id}`);
                categoryStore.setState({ category: data, loading: false });
            } catch (error: any) {
                handleApiError(error);
                categoryStore.setState({ loading: false });
            }
        },

        create: async (category) => {
            try {
                await fetch.post('/api/categories', category);
            } catch (error: any) {
                handleApiError(error);
            }
        },

        update: async (id, params) => {
            try {
                await fetch.put(`/api/categories/${id}`, params);

                if (id === category?.id) {
                    categoryStore.setState({ category: { ...category, ...params } });
                }
            } catch (error: any) {
                handleApiError(error);
            }
        },

        delete: async (id) => {
            try {
                alertService.clear();
                categoryStore.setState({
                    categories: categories!.map(x => {
                        if (x.id === id) { x.isDeleting = true; }
                        return x;
                    })
                });

                const response = await fetch.delete(`/api/categories/${id}`);
                categoryStore.setState({ categories: categories!.filter(x => x.id !== id) });
            } catch (error: any) {
                handleApiError(error);
                categoryStore.setState({
                    categories: categories!.map(x => {
                        if (x.id === id) { x.isDeleting = false; }
                        return x;
                    })
                });
            }
        }
    }
}

// interfaces

interface ICategory {
    id: string;
    name: string;
    isDeleting?: boolean;
}

interface ICategoryStore {
    categories?: ICategory[];
    category?: ICategory;
    loading: boolean;
}

interface ICategoryService extends ICategoryStore {
    getAll: () => Promise<void>;
    getById: (id: string) => Promise<void>;
    create: (category: ICategory) => Promise<void>;
    update: (id: string, params: Partial<ICategory>) => Promise<void>;
    delete: (id: string) => Promise<void>;
}
