import { useEffect } from 'react'

const useCustomCursor = () => {
    useEffect(() => {
        const applyCustomCursor = () => {
            const links = document.querySelectorAll('a');

            const colors = [
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-green')
                    .trim(),
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-lightgreen')
                    .trim(),
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-orange')
                    .trim(),
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-lightorange')
                    .trim(),
            ];

            const getRandomColor = (): string => {
                return colors[Math.floor(Math.random() * colors.length)];
            };

            const createSVG = (color: string): string => {
                return `
                    <svg fill="${color}" width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)">
                        <path d="M256,464c114.87,0,208-93.13,208-208S370.87,48,256,48,48,141.13,48,256,141.13,464,256,464ZM175.91,240,240,303.58V154h32V303.58L336.09,240l22.54,22.71L256,364.54,153.37,262.7Z" />
                    </svg>
                `;
            };

            const createDataURL = (svgString: string): string => {
                return `data:image/svg+xml;base64,${btoa(svgString)}`;
            };

            links.forEach((link) => {
                const randomColor = getRandomColor();
                const svgString = createSVG(randomColor);
                const dataURL = createDataURL(svgString);
                (
                    link as HTMLElement
                ).style.cursor = `url(${dataURL}) 10 10, auto`;
            });
        };

        setTimeout(applyCustomCursor, 0);

        const observer = new MutationObserver(applyCustomCursor);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);
};

export default useCustomCursor;
