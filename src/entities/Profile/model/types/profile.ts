import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ValidateProfileErrors } from '../consts/profileConsts';

export interface Profile {
    id?: string;
    first?: string;
    lastname?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
}
export interface ProfileSchema {
    id?: string;
    data?: Profile;
    form?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    validateErrors?: ValidateProfileErrors[];
}
