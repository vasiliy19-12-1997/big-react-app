import React from "react";

export const MainPageAsync = React.lazy(
  () =>
    new Promise((resolve, reject) => {
      // @ts-ignore
      setTimeout(() => resolve(import("./MainPage")), 2000);
    })
);
