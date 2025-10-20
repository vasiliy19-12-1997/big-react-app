import { Flex, FlexProps } from '../Flex/Flex';
import { ErrorPage } from '@/widgets/ErrorPage';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = (props: HStackProps) => {
    return (
        <Flex direction="row" {...props}>
            <ErrorPage />
        </Flex>
    );
};
