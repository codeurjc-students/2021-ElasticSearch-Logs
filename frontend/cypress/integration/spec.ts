describe('e2e tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('App initialization', () => {
        it('has elements in the table', () => {
            cy.get('#ag-table').getAgGridData();
        });
    });

    describe('Manager components', () => {
        describe('Highlighter', () => {
            describe('User types the word INFO ', () => {
                beforeEach(() => {
                    cy.get('#highlighter-input')
                        .type('INFO')
                        .get('#highlighter-submit-button')
                        .click()
                        .wait(2000);
                });

                it('Logs in table has the word INFO in field Log Level', () => {
                    cy.get('#ag-table')
                        .getAgGridData({ onlyColumns: ['Log Level'] })
                        .each((log) => {
                            expect(log).to.deep.equal({
                                'Log Level': 'INFO',
                            });
                        });
                });

                it('Word INFO is highlighted', () => {
                    cy.get(
                        '[class="ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-wrap-text ag-cell-value"] > span'
                    )
                        .children()
                        .should('exist');
                });
            });

            describe('User types a strange word', () => {
                it('No logs should be displayed', () => {
                    cy.get('#highlighter-input')
                        .type('this text is so random to even exist')
                        .get('#highlighter-submit-button')
                        .click()
                        .wait(2000)
                        .get('#ag-table')
                        .getAgGridData()
                        .should('be.empty');
                });
            });
        });

        describe('Time queries', () => {});

        describe('Filter', () => {
            describe('User look for a value that exists', () => {
                beforeEach(() => {
                    cy.get('#query-filter')
                        .click()
                        .get('#log_level')
                        .type('WARN')
                        .get('#query-filter-submit-button')
                        .click()
                        .wait(2000);
                });

                it('Log Level should have value WARN', () => {
                    cy.get('#ag-table')
                        .getAgGridData({
                            onlyColumns: ['Log Level'],
                        })
                        .each((log) => {
                            expect(log).to.deep.equal({
                                'Log Level': 'WARN',
                            });
                        });
                });
            });

            describe('User look for a value that does not exist', () => {
                beforeEach(() => {
                    cy.get('#query-filter')
                        .click()
                        .get('#log_level')
                        .type('RANDOM_VALUE')
                        .get('#query-filter-submit-button')
                        .click()
                        .wait(2000);
                });

                it('No logs should be displayed', () => {
                    cy.get('#ag-table').getAgGridData().should('be.empty');
                });
            });

            describe('User does not fill the form', () => {
                beforeEach(() => {
                    cy.get('#query-filter')
                        .click()
                        .get('#log_level')
                        .get('#query-filter-submit-button')
                        .click()
                        .wait(2000);
                });

                it('Most recent logs should be displayed', () => {
                    cy.get('#ag-table')

                        .getAgGridData({ onlyColumns: ['Timestamp'] })
                        .each((log: any) => {
                            const today = new Date();
                            const todayAsString = `${today.getDate()}/0${
                                today.getMonth() + 1
                            }/${today.getFullYear()}`;

                            expect(log['Timestamp']).to.contain(
                                todayAsString
                            );
                        })
                        .debug();
                });
            });
        });

        describe('Columns', () => {});

        describe('Query', () => {});
    });
});
