import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "notOverNine"
})
export class NotOverNinePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value > 9 ? "9+" : value;
  }
}
