import { Theme } from '../const/theme';

export interface JsonSettingsProperties {
    theme?: Theme;
    isFirstVisit?: boolean;
    isPageHasBeenOpen?: boolean;
}
