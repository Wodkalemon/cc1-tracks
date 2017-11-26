import {NouiFormatter} from 'ng2-nouislider';

export class MyFormatter implements NouiFormatter {
    private strings: string[] = [
        'Anfänger', 'Leicht', 'Fortgeschritten', 'Schwer', 'Profi'
    ];

    to(value: number): string {
        value = Math.round(value);
        if (value < 0) {
            value = 0;
        }
        if (value >= this.strings.length) {
            value = this.strings.length - 1;
        }
        return this.strings[value];
    }

    from(value: string): number {
        let result = this.strings.indexOf(value);
        return result == -1 ? 0 : result;
    }
}