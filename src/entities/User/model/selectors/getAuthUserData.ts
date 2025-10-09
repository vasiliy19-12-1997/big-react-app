import { StateSchema } from '@/app/providers/StoreProvider';

export const getAuthUserData = (state:StateSchema) => state.user.authData;
