import { Pipe, PipeTransform } from "@angular/core";

/*
 * Format a number to be human-readable in an abbreviated way, using standard suffixes like k, M, and G
 * Takes a fixed point argument that defaults to 1 digit after the fixed point.
 * Usage:
 *   value | abbreviateNumber:digitsAfterPoint
 * Example:
 *   {{ 1200000 | abbreviateNumber:1 }}
 *   formats to: 1.2M
 */
@Pipe({ name: "abbreviateNumber" })
export class AbbreviateNumberPipe implements PipeTransform {
  transform(value: number, digitsAfterPoint: number = 1): string {
    return isNaN(value)
      ? "N/A"
      : this.abbreviatedNumber(value, digitsAfterPoint);
  }

  // from: https://stackoverflow.com/a/40724354
  public abbreviatedNumber(n: number, digitsAfterPoint: number) {
    var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

    // what tier? (determines SI symbol)
    var tier = (Math.log10(n) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return String(n);

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = n / scale;

    // format number and add suffix
    return this.correctFixedPointNumber(scaled, digitsAfterPoint) + suffix;
  }

  private preferredDecimalSeparator() {
    const hasComma =
      Number(1.1)
        .toLocaleString()
        .indexOf(",") > -1;
    return hasComma ? "," : ".";
  }

  private correctFixedPointNumber(n: number, fractionDigits: number) {
    return n
      .toFixed(fractionDigits)
      .split(".")
      .filter(this.filterZerosAfterDecimal.bind(this))
      .join(this.preferredDecimalSeparator());
  }

  private filterZerosAfterDecimal(value: string, index: number) {
    const isZeroAfterDecimal = index === 1 && value === "0";
    return !isZeroAfterDecimal;
  }
}
