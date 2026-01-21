import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { setFeaturesFlags } from '@/shared/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettingsProperties } from '../types/jsonSettings';
import { User, UserSchema } from '../types/UserSchema';

const initialState: UserSchema = {
    _mounted: false,
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeaturesFlags(action.payload.features);
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                const json = JSON.parse(user) as User;
                state.authData = json;
                setFeaturesFlags(json.features);
            }
            state._mounted = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveJsonSettings.fulfilled, (state, { payload }: PayloadAction<JsonSettingsProperties>) => {
            if (state.authData) {
                state.authData.jsonSettings = payload;
            }
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = UserSlice;
export const { reducer: userReducer } = UserSlice;
