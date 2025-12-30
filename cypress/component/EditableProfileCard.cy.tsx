import { EditableProfileCard } from '@/features/editableProfileCard';
import { TestProvider } from '@/shared/lib/tests/componentRender/componentRender';

const USER_ID = '1';
describe('EditableProfileCard.cy.ts', () => {
    it('playground', () => {
        cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' }).as('getProfile');
        cy.mount(
            <TestProvider
                options={{
                    initialState: {
                        user: { authData: { id: USER_ID, username: 'admin' } },
                    },
                }}
            >
                <EditableProfileCard id={USER_ID} />
            </TestProvider>,
        );
    });
});
