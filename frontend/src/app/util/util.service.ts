import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { ColDef } from "ag-grid-community";
import { environment } from "src/environments/environment";



@Injectable({
    providedIn: 'root'
})

export class UtilService {

    constructor(private httpClient: HttpClient) {

    }


    /**
    * Build the form controls for the form group
    * @returns An object with the form controls
    */
    buildFormControls(columnsName: string[], defaultValue: any): { [key: string]: AbstractControl; } {
        let formControls = {}
        columnsName.map((name): any => {
            Object.assign(formControls, { [name]: new FormControl(defaultValue) })
        })

        return formControls;
    }

    /**
    * Build an array of String with the columns name to build dynamically columns later
    * @returns An array with the columns name
    */
    getDataFromForm(profileForm: FormGroup): any[][] {
        const formDataKeys: string[] = Object.keys(profileForm.value);
        const formDataValues: any[] = Object.values(profileForm.value);

        let toReturn: any[][] = []

        let formNames: any[] = []
        let formValues: any[] = []

        for (let i = 0; i < formDataKeys.length; i++) {
            const key = formDataKeys[i];
            const value = formDataValues[i];

            if (value) {
                formNames.push(key);
                formValues.push(value)
            }

        }

        toReturn.push(formNames, formValues);

        return toReturn;
    }


    /**
   * Build the columns of the table by the given names
   * @param columnsToBuild An array with the name of the columns
   * @returns An array with the columns created
   */
    buildColumns(columnsToBuild: any): ColDef[] {

        const colNames: string[] = Object.keys(columnsToBuild);
        const colWidths: number[] = Object.values(columnsToBuild);

        let colDef: ColDef[] = []


        for (let i = 0; i < colNames.length; i++) {
            const name = colNames[i];
            const width = colWidths[i];

            const col = {
                "colId": name,
                "headerName": name,
                "field": name,
                "width": width,
                "sortable": true,
                "filter": true
            }

            colDef.push(col);
        }

        colDef[0] = {
            "colId": colDef[0].colId,
            "headerName": colDef[0].headerName,
            "field": colDef[0].field,
            "width": colDef[0].width,
            "cellRenderer": 'loadingRenderer',
        }

        return colDef;
    }

    buildDataSource(data: any[]): Object {
        const dataSource = {
            rowCount: null,
            getRows: (params: any) => {
                setTimeout(() => {
                    var rowsThisPage = data.slice(params.startRow, params.endRow);
                    var lastRow = -1;
                    if (data.length <= params.endRow)
                        lastRow = data.length;

                    params.successCallback(rowsThisPage, lastRow);
                }, 500);
            }
        };
        return dataSource;
    }


}