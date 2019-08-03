import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "showTime"
})
export class ShowTimePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return null;
  }
}
