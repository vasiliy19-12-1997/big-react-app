import { memo } from 'react';
import { Sceleton } from '@/shared/ui/redesigned/Sceleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { MainLayout } from '../MainLayout';
import cls from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => {
    return (
        <MainLayout
            header={
                <HStack className={cls.header}>
                    <Sceleton width={40} height={40} border="50%" />
                </HStack>
            }
            content={
                <VStack>
                    <Sceleton width="70%" height={32} border="16px" />
                    <Sceleton width="40%" height={20} border="16px" />
                    <Sceleton width="50%" height={20} border="16px" />
                    <Sceleton width="30%" height={32} border="16px" />
                    <Sceleton width="80%" height="40%" border="16px" />
                    <Sceleton width="80%" height="40%" border="16px" />
                </VStack>
            }
            sidebar={<Sceleton border="32px" width={220} height="100%" />}
        />
    );
});
