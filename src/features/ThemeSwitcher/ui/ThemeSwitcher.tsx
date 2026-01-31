import { memo, useCallback } from 'react';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../../../shared/ui/deprecated/Button/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();
    const handleTheme = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);
    return (
        <ToggleFeatures
            name="isNewDesignEnabled"
            on={
                <Button theme={ButtonTheme.CLEAR} className={classNames('', {}, [className])} onClick={handleTheme}>
                    <Icon width={40} height={40} Svg={ThemeIcon} />
                </Button>
            }
            off={
                <Button theme={ButtonTheme.CLEAR} className={classNames('', {}, [className])} onClick={handleTheme}>
                    <IconDeprecated width={40} height={40} inverted Svg={ThemeIconDeprecated} />
                </Button>
            }
        />
    );
});
