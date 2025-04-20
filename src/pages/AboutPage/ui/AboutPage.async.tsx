import React from 'react';

export const AboutPageAsync = React.lazy(
    () => new Promise((resolve, reject) => {
        // @ts-ignore для теста
        setTimeout(() => resolve(import('./AboutPage')), 2000);
    }),
);
