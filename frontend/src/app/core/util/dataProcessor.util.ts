import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { COLUMN_DEFS } from '../../table/config/table.config';

@Injectable({
  providedIn: 'root',
})
export class DataProcessor {
  constructor(private httpClient: HttpClient) {}

  /**
   * Build an array of String with the columns name to build dynamically columns later
   *
   * @returns An array with the columns name
   */
  getDataFromForm(profileForm: FormGroup): any[][] {
    const formDataKeys: string[] = Object.keys(profileForm.value);
    const formDataValues: any[] = Object.values(profileForm.value);

    let toReturn: any[][] = [];

    let formNames: any[] = [];
    let formValues: any[] = [];

    for (let i = 0; i < formDataKeys.length; i++) {
      const key = formDataKeys[i];
      const value = formDataValues[i];

      if (value) {
        formNames.push(key);
        formValues.push(value);
      }
    }

    toReturn.push(formNames, formValues);

    return toReturn;
  }

  /**
   * Map the columns configuration array to get all the columns names
   *
   * @returns An array of string with all the fields name
   */
  getAllFieldsName(): string[] {
    return COLUMN_DEFS.map((column) => column.field);
  }

  /**
   * Search for a string and highligh it in the dataset
   *
   * @param data The data set to look for the string
   * @param stringToHighlight The string to highlight
   * @returns The modified data set with the highlighted string
   */
  highlightText(data: object[], stringToHighlight: string): object[] {
    return data.map((row) => {
      return this.mapRow(row, stringToHighlight);
    });
  }

  /**
   * Assign to an empty object, usually a row the replaced text, creating
   * a new object with the spread operator
   *
   * @param row The object where to look for the key
   * @param stringToHighlight The string to highlight
   * @returns A new object modified with the text highlighted
   */
  private mapRow(row: object, stringToHighlight: string): object[] {
    return Object.assign(
      {},
      ...Object.entries(row).map(([key, textToReplace]) => {
        return {
          [key]: this.replaceText(textToReplace, stringToHighlight),
        };
      })
    );
  }

  /**
   *
   * Replace all ocurrences of a string that should be highlighted with HTML elements
   * to achieve that
   *
   * @param text Text where to look for replacement
   * @param stringToHighlight The string to highlight
   * @returns The new text highlighted
   */
  private replaceText(text: string, stringToHighlight: string): string {
    try {
      if (text.includes(stringToHighlight)) {
        var re = new RegExp(stringToHighlight, 'g');

        const highlightedtext = text.replace(
          re,
          `<mark>${stringToHighlight}</mark>`
        );

        return highlightedtext;
      }
    } catch {
      console.log('Cannot replace');
    }

    return text;
  }

  /**
   * Build form controls based on the columns name and an initial param
   * @param initParam The param to set at the FormControl
   * @returns An object with the FormControls
   */
  public buildFormControl(columns: any[], initParam: any): any {
    return columns.reduce(
      (acc, column) =>
        Object.assign(acc, { [column.field]: new FormControl(initParam) }),
      {}
    );
  }
}
