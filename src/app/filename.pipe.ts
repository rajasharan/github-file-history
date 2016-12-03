import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let arr: any[] = value.split("/");
    return arr[arr.length - 1];
  }

}
