import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
@Pipe({
  name: "fromNow"
})
export class FromNowPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let _value = moment(value).fromNow();
    return _value === "in a few seconds" ? "a few seconds ago" : _value;
  }
}
