import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { ColDef } from "ag-grid-community";
import { environment } from "src/environments/environment";



@Injectable({
    providedIn: 'root'
})

export class UtilService {

    columnsName: string[] = [
        'timestamp',
        'message',
        'agent',
        'clientip',
        'event',
        'host',
        'request',
        'response',
        'url',
        'agent',
        'bytes',
        'clientip',
        'event',
        'extension',
        'geo',
        'host',
        'index',
        'ip',
        'ip_range',
        'machine',
        'memory',
        'message',
        'phpmemory',
        'referer',
        'request',
        'response',
        'tags',
        'timestamp_range',
        'url',
        'utc_time'
      ]

    constructor(private httpClient: HttpClient) {

    }


    /**
    * Build the form controls for the form group
    * @returns An object with the form controls
    */
    buildFormControls(columnsName: string[],defaultValue: any): { [key: string]: AbstractControl; } {
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

            if (value){
                formNames.push(key);
                formValues.push(value)
            }
            
        }

        toReturn.push(formNames,formValues);

        return toReturn;
    }

 
    /**
   * Build the columns of the table by the given names
   * @param columnsToBuild An array with the name of the columns
   * @returns An array with the columns created
   */
    buildColumns(columnsToBuild: string[]): ColDef[] {
        return columnsToBuild.map((column): any => {
            return { "headerName": column, "field": column, sortable: true, filter: true }
        })

    }

   
}