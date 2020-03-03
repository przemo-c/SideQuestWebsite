import { Pipe, PipeTransform } from '@angular/core';

/*
 * Format a number to be human-readable in the current locale
 * Usage:
 *   value | formatNumber
 * Example:
 *   {{ 1200000 | formatNumber }}
 *   formats to: 1,200,000 in the US and 1.200.000 in Spain
 */
@Pipe({ name: 'formatNumber' })
export class FormatNumberPipe implements PipeTransform {
    transform(value: number): string {
        return isNaN(value) ? 'N/A' : Number(value).toLocaleString();
    }
}
