import { AxiosInstance } from 'axios';
// eslint-disable-next-line big-react-app-plugin/layer-imports
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export interface ThunkExtraArg {
    api: AxiosInstance;
}
export interface ThunkConfig<T> {
    extra: ThunkExtraArg;
    rejectValue: T;
    state: StateSchema;
}
