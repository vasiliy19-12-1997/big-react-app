import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { setFeaturesFlags } from '@/shared/features';
import { initedAuthData } from '../services/initedAuthData';
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
            // eslint-disable-next-line spaced-comment
            //Для учебного проекта сохраним в локалсторедж id пользователя, а так нельзя делать в реальных проектах
            localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id);
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
        builder.addCase(initedAuthData.fulfilled, (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
            setFeaturesFlags(payload.features);
            state._mounted = true;
        });
        builder.addCase(initedAuthData.rejected, (state) => {
            state._mounted = true;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = UserSlice;
export const { reducer: userReducer } = UserSlice;
