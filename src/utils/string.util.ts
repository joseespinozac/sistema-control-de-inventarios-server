export class StringUtil {
  static parseStringToNumber(value: string | number): number {
    if (typeof value === 'number') {
      return value;
    }
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new Error('Invalid number format');
    }
    return parsedValue;
  }
}