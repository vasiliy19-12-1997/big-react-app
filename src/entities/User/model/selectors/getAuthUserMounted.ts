import { StateSchema } from 'app/providers/StoreProvider';

export const getAuthUserMounted = (state:StateSchema) => state.user._mounted;
