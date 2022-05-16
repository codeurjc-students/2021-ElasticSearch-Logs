const parseDate = (dateAsString: string) => {
  const [date, time] = dateAsString.split('T');
  const [hour, min, sec] = time.split(':');
  const [year, month, day] = date.split('-');


  

  const dateToReturn = new Date();

  dateToReturn.setFullYear(parseInt(year));
  dateToReturn.setMonth(parseInt(month) - 1);
  dateToReturn.setDate(parseInt(day));

  dateToReturn.setHours(parseInt(hour));
  dateToReturn.setMinutes(parseInt(min));
  dateToReturn.setSeconds(parseInt(sec));


  return dateToReturn;
};

Cypress.Cookies.defaults({
  preserve: 'AuthToken',
});

describe('e2e tests', () => {
  beforeEach(() => {
    cy.visit('/');
    localStorage.setItem('logged', 'elasticadmin');
  });

  describe('Login', () => {
    it('is able to login', () => {
      cy.visit('/login')
        .get('#username-input')
        .type('elasticadmin')
        .get('#password-input')
        .type('MY_SECRET')
        .get('#login-submit')
        .click()
        .wait(2000);
    });
  });

  describe('App initialization', () => {
    it('has elements in the table', () => {
      cy.get('#ag-table').getAgGridData();
    });
  });

  describe('Manager components', () => {
    // describe('Highlighter', () => {
    //   describe('User types the word INFO ', () => {
    //     beforeEach(() => {
    //       cy.get('#highlighter-input')
    //         .type('INFO')
    //         .get('#highlighter-submit-button')
    //         .click()
    //         .wait(2000);
    //     });

    //     it('Logs in table has the word INFO in field Log Level', () => {
    //       cy.get('#ag-table')
    //         .getAgGridData({ onlyColumns: ['Log Level'] })
    //         .each((log) => {
    //           expect(log).to.deep.equal({
    //             'Log Level': 'INFO',
    //           });
    //         });
    //     });

    //     it('Word INFO is highlighted', () => {
    //       cy.get(
    //         '[class="ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-wrap-text ag-cell-value"] > span'
    //       )
    //         .children()
    //         .should('exist');
    //     });
    //   });

    //   describe('User types a strange word', () => {
    //     it('No logs should be displayed', () => {
    //       cy.get('#highlighter-input')
    //         .type('this text is so random to even exist')
    //         .get('#highlighter-submit-button')
    //         .click()
    //         .wait(2000)
    //         .get('#ag-table')
    //         .getAgGridData()
    //         .should('be.empty');
    //     });
    //   });
    // });

    describe('Time queries', () => {
      beforeEach(() => {
        cy.get('#time-shortcuts').click();
      });

      //   describe('User find a valid range', () => {
      //     it('Timestamp should be in the given range', () => {
      //       const date = new Date();
      //       const dateAsStringIn = `${date.getMonth() + 1}/${
      //         date.getDate() - 1
      //       }/${date.getFullYear()}`;

      //       const dateAsStringOut = `${
      //         date.getMonth() + 1
      //       }/${date.getDate()}/${date.getFullYear()}`;

      //       cy.get('[ data-cy="startDate"]')
      //         .type(dateAsStringIn)
      //         .get('[ data-cy="endDate"]')
      //         .type(dateAsStringOut)
      //         .get('#mat-input-1')
      //         .type('00:30')
      //         .get('#time-shortcuts-submit')
      //         .click()
      //         .wait(2000)
      //         .get('#ag-table')
      //         .getAgGridData({ onlyColumns: ['Timestamp'] })
      //         .each((log: any) => {
      //           const today = new Date();
      //           const onlyDate = `${today.getFullYear()}-0${
      //             today.getMonth() + 1
      //           }-${today.getDate() - 1}`;

      //           expect(log['Timestamp']).to.contain(onlyDate);
      //         });
      //     });

      //     it('No data should be fetched with given range', () => {
      //       const date = new Date();
      //       const dateAsStringIn = `${date.getMonth()}/${
      //         date.getDate() - 1
      //       }/${date.getFullYear()}`;

      //       const dateAsStringOut = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;

      //       cy.get('[ data-cy="startDate"]')
      //         .type(dateAsStringIn)
      //         .get('[ data-cy="endDate"]')
      //         .type(dateAsStringOut)
      //         .get('#mat-input-1')
      //         .type('00:30')
      //         .get('#time-shortcuts-submit')
      //         .click()
      //         .wait(2000)
      //         .get('#ag-table')
      //         .getAgGridData()
      //         .should('be.empty')
      //         .get('snack-bar-container');
      //     });
      //   });

      //   describe('User find an invalid range', () => {
      //     it('Submit button is disabled because the range is invalid', () => {
      //       const date = new Date();
      //       const dateAsStringIn = `${date.getMonth() + 1}-${
      //         date.getDate() - 1
      //       }-${date.getFullYear()}`;

      //       const dateAsStringOut = `${
      //         date.getMonth() + 1
      //       }-${date.getDate()}-${date.getFullYear()}`;

      //       cy.get('[ data-cy="startDate"]')
      //         .type(dateAsStringOut)
      //         .get('[ data-cy="endDate"]')
      //         .type(dateAsStringIn)
      //         .get('#mat-input-1')
      //         .type('00:30')
      //         .get('#time-shortcuts-submit')
      //         .should('be.disabled');
      //     });
      //   });

      describe('User click the buttons shortcuts', () => {
        it('Today button should fetch correct data', () => {
          cy.get('#today')
            .click()
            .wait(2000)
            .get('#ag-table')
            .getAgGridData({ onlyColumns: ['Timestamp'] })
            .each((log: any) => {
              const today = new Date();
              const onlyDate = `${today.getFullYear()}-0${
                today.getMonth() + 1
              }-${today.getDate()}`;

              expect(log['Timestamp']).to.contain(onlyDate);
            });
        });

        it('30 minutes button should fetch correct data', () => {
          cy.get('#min30')
            .click()
            .wait(2000)
            .get('#ag-table')
            .getAgGridData({ onlyColumns: ['Timestamp'] })
            .each((log: any) => {
              const halfHourAgo = parseDate(log['Timestamp']);
              const today = new Date();
              const oneHourAgo = new Date();
              oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    
              expect(halfHourAgo).to.be.lte(today);
              expect(halfHourAgo).to.be.gte(oneHourAgo);
            });
        });

        it('1 hour button should fetch correct data', () => {
          cy.get('#hour1')
            .click()
            .wait(2000)
            .get('#ag-table')
            .getAgGridData({ onlyColumns: ['Timestamp'] })
            .each((log: any) => {
              const oneHourAgo = parseDate(log['Timestamp']);
              const today = new Date();
              const twoHoursAgo = new Date();
              twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

              expect(oneHourAgo).to.be.lte(today);
              expect(oneHourAgo).to.be.gte(twoHoursAgo);
            });
        });

        it('6 hours button should fetch correct data', () => {
          cy.get('#hour6')
            .click()
            .wait(2000)
            .get('#ag-table')
            .getAgGridData({ onlyColumns: ['Timestamp'] })
            .each((log: any) => {
              const sixHoursAgo = parseDate(log['Timestamp']);
              const today = new Date();
              const sevenHoursAgo = new Date();
              sevenHoursAgo.setHours(sevenHoursAgo.getHours() - 7);

              expect(sixHoursAgo).to.be.lte(today);
              expect(sixHoursAgo).to.be.gte(sevenHoursAgo);
            });
        });

        it('1 day button should fetch correct data', () => {
          cy.get('#day1')
            .click()
            .wait(2000)
            .get('#ag-table')
            .getAgGridData({ onlyColumns: ['Timestamp'] })
            .each((log: any) => {
              const today = new Date();
              const onlyDate = `${today.getFullYear()}-0${
                today.getMonth() + 1
              }-${today.getDate() - 1}`;

              expect(log['Timestamp']).to.contain(onlyDate);
            });
        });

        it('1 week button should fetch correct data', () => {
          cy.get('#week1')
            .click()
            .wait(2000)
            .get('#ag-table')
            .getAgGridData({ onlyColumns: ['Timestamp'] })
            .each((log: any) => {
              const today = new Date();
              const onlyDate = `${today.getFullYear()}-0${
                today.getMonth() + 1
              }-${today.getDate() - 6}`;

              expect(log['Timestamp']).to.contain(onlyDate);
            });
        });
      });
    });

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
              const onlyDate = `${today.getFullYear()}-0${
                today.getMonth() + 1
              }-${today.getDate()}`;

              expect(log['Timestamp']).to.contain(onlyDate);
            })
            .debug();
        });
      });
    });

    describe('Columns', () => {
      describe('User select some columns to display', () => {
        beforeEach(() => {
          cy.get('#column-updater').click();
        });

        it('Only Timestamp and Log Level should be displayed', () => {
          cy.get('#timestamp .mat-checkbox-inner-container')
            .click()
            .get('#log_level .mat-checkbox-inner-container')
            .click()
            .get('#column-updater-submit')
            .click()
            .get('#ag-table')
            .getAgGridData()
            .each((log: any) => {
              expect(Object.keys(log).length).to.be.equal(2);
            });
        });
      });

      describe('User does not select any column to display', () => {
        beforeEach(() => {
          cy.get('#column-updater').click();
        });

        it('An alert is shown to display an error', () => {
          cy.get('#column-updater-submit').click().get('snack-bar-container');
        });
      });
    });

    describe('Query', () => {
      describe('User writes a correct query to fecth data ', () => {
        beforeEach(() => {
          cy.get('#query-json').click();
        });

        it('Log level INFO should be fetched', () => {
          cy.get('#monaco-editor')
            .type('{"log_level": "INFO"}', {
              parseSpecialCharSequences: false,
            })
            .get('#query-json-submit')
            .click()
            .wait(2000)
            .get('#ag-table')
            .getAgGridData({
              onlyColumns: ['Log Level'],
            })
            .each((log) => {
              expect(log).to.deep.equal({
                'Log Level': 'INFO',
              });
            });
        });
      });

      describe('User writes a incorrect query to fecth data ', () => {
        beforeEach(() => {
          cy.get('#query-json').click();
        });

        it('Submit button should not be enable', () => {
          cy.get('#monaco-editor')
            .type('Esto no es valido', {
              parseSpecialCharSequences: false,
            })
            .get('#query-json-submit')
            .should('be.disabled');
        });
      });
    });
  });
});
