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

}