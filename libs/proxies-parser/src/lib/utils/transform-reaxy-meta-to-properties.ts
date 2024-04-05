import * as t from '@babel/types';
import { Meta } from './meta';

export function transformReaxyMetaToProperties(meta: Meta) {
  return Object.keys(meta).map((key) =>
    t.objectProperty(
      t.identifier(key),
      typeof meta[key as keyof Meta] === 'string'
        ? t.stringLiteral(meta[key as keyof Meta] as unknown as string)
        : t.numericLiteral(Number(meta[key as keyof Meta])), // Be cautious with direct casting
    ),
  );
}
