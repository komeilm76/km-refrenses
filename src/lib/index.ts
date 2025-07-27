import _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';

const dataToRef = <DATA>() => {
  let refrenses: { data: DATA; refId: string }[] = [];
  const set = (data: DATA, uniqName?: string | undefined) => {
    const id = uniqName ? uniqName : uuidV4();
    refrenses.push({ data, refId: `ref:${id}` });
    return id;
  };
  const load = (refId: string) => {
    let data = refrenses.find((item) => {
      return item.refId == refId;
    });
    return data?.data;
  };
  return {
    refrenses,
    set,
    load,
  };
};

const load$ref = (host: object, $ref: string) => {
  let makeTruePath = $ref?.split('/').join('.').split('#.').join('');
  let output = _.get(host, makeTruePath ?? '');
  return output;
};

export default {
  dataToRef,
  jsonSchema: {
    load$ref,
  },
};
