import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginUsername = (state:StateSchema) => state.login?.username || '';
