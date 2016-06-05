import {Pipe, PipeTransform} from "angular2/core";

@Pipe({
    name: 'StringToDate'
})

export class StringToDate implements PipeTransform {
    transform(value:string, args:string[]) : any {
        return new Date(value);
    }
}
