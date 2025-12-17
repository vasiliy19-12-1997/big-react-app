import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
export const login =((username: string = 'user2', password: string = '123') => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8001/login',
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
  });
});