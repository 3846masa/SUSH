export default class Util {
  public static parseSheetEntry(entry: any): { [key: string]: string } {
    const obj: { [key: string]: string } = {};

    for (const key in entry) {
      if (!key.match(/^gsx\$/)) {
        continue;
      }
      const newKey = key.replace(/^gsx\$/, '');
      obj[newKey] = entry[key].$t;
    }

    return obj;
  }

  public static convertGidToWid(gid: string): string {
    const gidNum = parseInt(gid, 10);
    const xorval = gidNum > 31578 ? 474 : 31578;
    const prefix = gidNum > 31578 ? 'o' : '';
    // tslint:disable-next-line no-bitwise
    const wid = (gidNum ^ xorval).toString(36);
    return `${prefix}${wid}`;
  }
}
