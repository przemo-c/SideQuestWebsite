import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "showDuration"
})
export class ShowDurationPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const hours = Math.floor(value / 60 / 60);
    const mins = Math.floor(value / 60) - hours * 60;
    return (
      hours.toString().padStart(2, "0") + ":" + mins.toString().padStart(2, "0")
    );
  }
}
