import { ValueTransformer } from 'typeorm';

export const UTCDateTransformer: ValueTransformer = {
  to(value: any): any {
    return (
      typeof value !== 'string' ? (<Date>value).toISOString() : value
    ).replace('Z', '');
  },
  from(value: any): any {
    return typeof value === 'string'
      ? new Date(value.indexOf('Z') !== -1 ? value : value + 'Z')
      : value;
  },
};
