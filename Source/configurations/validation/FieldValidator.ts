// /*---------------------------------------------------------------------------------------------
// *  Copyright (c) Dolittle. All rights reserved.
// *  Licensed under the MIT License. See LICENSE in the project root for license information.
// *--------------------------------------------------------------------------------------------*/
// import { InvalidField, IFieldValidator } from "../internal";

// export class FieldValidator<T> implements IFieldValidator {

//     constructor(fieldName: string, validateCallback: (obj: T) => boolean, errorMessage: string) {
//         this.fieldName = fieldName;
//         this.validateCallback = validateCallback;
//         this.errorMessage = errorMessage;
//     }
//     readonly fieldName: string;
//     readonly validateCallback: (obj: T) => boolean;
//     readonly errorMessage: string;

//     canValidate(obj: any) {

//     }
//     validate(obj: any) {
//         if (this.)
//         if (!this.validateCallback(obj[this.fieldName])) {
//             throw new InvalidField(this.fieldName, this.errorMessage);
//         }
//     }
// }
