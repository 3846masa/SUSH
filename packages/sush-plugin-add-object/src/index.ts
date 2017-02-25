import { SUSHInfo } from 'sush';

type Entry = [string, string];
type Entries = Entry[];

/**
 * `SUSHPluginAddObject` trims head or tail from ID.
 */
function SUSHPluginAddObject (
  obj: { [key: string]: string } | Map<string, string> = {}
) {
  return ({ id, stock }: SUSHInfo) => {
    let entries: Entries | Iterable<Entry>;

    if (obj instanceof Map) {
      entries = obj;
    } else {
      entries = Object.keys(obj)
        .reduce((arr: Entries, key: string) => {
          arr.push([key, obj[key]]);
          return arr;
        }, [] as Entries);
    }

    for (const [key, value] of entries) {
      stock.set(key, value);
    }

    return { id, stock } as SUSHInfo;
  };
};

export default SUSHPluginAddObject;
