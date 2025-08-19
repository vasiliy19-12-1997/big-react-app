import { getScrollRestorationByPath, scrollRestorationSliceActions } from 'features/ScrollRestoration';
import {
    memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from 'app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { useThrotle } from 'shared/lib/hooks/useThrotle/useThrotle';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children:ReactNode;
  onScrollEnd?:()=>void
}
export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const scrollPosition = useSelector((state:StateSchema) => getScrollRestorationByPath(state, pathname));
    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });
    const onScroll = useThrotle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollRestorationSliceActions.setScrollPosition({ path: pathname, position: e?.currentTarget?.scrollTop }));
    }, 700);
    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });
    return (
        <section onScroll={onScroll} ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
            {children}
            <div ref={triggerRef} />
        </section>
    );
});
