import { Map } from 'immutable';

export const mergeDeep = <T>(objectOne?: T, objectTwo?: T): T => {
  return Map(objectOne || {})
    .mergeDeep(objectTwo || {})
    .toJS() as T;
};

export default mergeDeep;
