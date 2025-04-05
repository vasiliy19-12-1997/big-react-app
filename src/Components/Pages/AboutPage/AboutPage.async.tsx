import React from "react";

export const AboutPageAxync = React.lazy(
  () =>
    new Promise((resolve, reject) => {
      // @ts-ignore
      setTimeout(() => resolve(import("./AboutPage")), 2000);
    })
);
