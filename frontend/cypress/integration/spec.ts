import { should } from 'chai';

describe('e2e tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('App initialization', () => {
        it('has elements in the table', () => {
            cy.get('#ag-table').getAgGridData();
        });
    });

    //'[col-id="log_level"]

    describe('Manager components', () => {
        describe('Highlighter', () => {
            beforeEach(() => {
                cy.get('#highlighter-input')
                    .type('INFO')
                    .get('#highlighter-submit-button')
                    .click()
                    .wait(1000);
            });

            it('logs in table has the word INFO in field Log Level', () => {
                cy.get('#ag-table')
                    .getAgGridData({ onlyColumns: ['Log Level'] })
                    .each((log) => {
                        expect(log).to.deep.equal({ 'Log Level': 'INFO' });
                    });
            });

            it('word INFO is highlighted', () => {
                cy.get(
                    '[class="ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-wrap-text ag-cell-value"] > span'
                )
                    .children()
                    .should('exist');
            });
        });

        describe('Time queries', () => {});

        describe('Filter', () => {});

        describe('Columns', () => {});

        describe('Query', () => {});
    });
});
