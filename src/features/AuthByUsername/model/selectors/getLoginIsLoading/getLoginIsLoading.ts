import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginIsLoading = (state: StateSchema) => state.login?.isLoading || false;
