import { SUSHInfo } from 'sush';

export interface TrimIdParams {
  head?: number;
  tail?: number;
}

/**
 * `SUSHPluginTrimId` trims head or tail from ID.
 */
function SUSHPluginTrimId (
  { head = 0, tail = 0 }: TrimIdParams = {}
) {
  return ({ id, stock }: SUSHInfo) => {
    const newId = (!tail) ? id.slice(head) : id.slice(head, -1 * tail);
    return { id: newId, stock } as SUSHInfo;
  };
};

export default SUSHPluginTrimId;
