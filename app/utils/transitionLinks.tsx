'use client';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context';

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
    filter?: any;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({children, href, filter, ...props}) => {
    const { state, dispatch } = useAppContext()
    const router = useRouter();

    const handleTransition = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        const body = document.querySelector('body');

        body?.classList.add('page-transition');
        if (filter) {
            dispatch({ type: 'SET_FILTER', payload: { key: 'featured', value: filter.join(',') } })
        }

        await sleep(500);
        router.push(href);
        await sleep(500);

        body?.classList.remove('page-transition');
    };

    return (
        <Link {...props} href={href} onClick={handleTransition}>
            {children}
        </Link>
    );
};
