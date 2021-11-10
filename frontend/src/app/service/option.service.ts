import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";



@Injectable({
    providedIn: 'root'
})

export class OptionsService {

    constructor(private httpClient: HttpClient) {

    }

    /**
    * Build the form controls for the form group
    * @returns An object with the form controls
    */
    buildFormControls(columnsName:string[]): { [key: string]: AbstractControl; } {
        let formControls = {}
        columnsName.map((name): any => {
            Object.assign(formControls, { [name]: new FormControl(false) })
        })

        return formControls;
    }

    /**
    * Build an array of String with the columns name to build dynamically columns later
    * @returns An array with the columns name
    */
    buildColumnsFromForm(profileForm: FormGroup): string[] {
        const formDataKeys: string[] = Object.keys(profileForm.value);
        const formDataValues: boolean[] = Object.values(profileForm.value);

        let newColumnsName: string[] = []

        for (let i = 0; i < formDataKeys.length; i++) {
            const key = formDataKeys[i];
            const value = formDataValues[i];

            if (value)
                newColumnsName.push(key);
        }

        return newColumnsName;
    }

}