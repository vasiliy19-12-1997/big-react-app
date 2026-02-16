import { Story } from '@storybook/react';
// eslint-disable-next-line big-react-app-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
import { ToggleFeatures } from '@/shared/features';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        <ThemeProvider initialTheme={theme}>
            <ToggleFeatures
                name="isNewDesignEnabled"
                on={
                    <div className={`app_redesign ${theme}`}>
                        <StoryComponent />
                    </div>
                }
                off={
                    <div className={`app ${theme}`}>
                        <StoryComponent />
                    </div>
                }
            />
        </ThemeProvider>
    );
