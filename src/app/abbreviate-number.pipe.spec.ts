import { async } from '@angular/core/testing';
import { AbbreviateNumberPipe } from './abbreviate-number.pipe';

describe('AbbreviateNumberPipe', () => {
    let pipe: AbbreviateNumberPipe;

    beforeEach(async(() => {
        pipe = new AbbreviateNumberPipe();
    }));

    it('returns a fallback when providing no value', () => {
        expect(pipe.transform(undefined)).toEqual('N/A');
    });

    it('returns the exact number when under 1000', () => {
        expect(pipe.transform(123)).toEqual('123');
    });

    it("returns the exact number and doesn't round up when under 1000", () => {
        expect(pipe.transform(999)).toEqual('999');
    });

    it('returns 1k for 1000', () => {
        expect(pipe.transform(1000)).toEqual('1k');
    });

    it('filters out zeros after the decimal point', () => {
        expect(pipe.transform(1023)).toEqual('1k');
    });

    it('abbreviates to "k" correctly, rounding down', () => {
        expect(pipe.transform(1234)).toEqual('1.2k');
    });

    it('abbreviates to "k" correctly, rounding up', () => {
        expect(pipe.transform(1474)).toEqual('1.5k');
    });

    it('abbreviates to "M" correctly, rounding down', () => {
        expect(pipe.transform(12345678)).toEqual('12.3M');
    });

    it('abbreviates to "M" correctly, rounding up', () => {
        expect(pipe.transform(12355678)).toEqual('12.4M');
    });
});
