import { CallExpression } from '@babel/types';
import { transformReaxyMetaToProperties } from './transform-reaxy-meta-to-properties';
import * as t from '@babel/types';
import { Meta } from './meta';

export function createHigherOrderFunction(
  name: string,
  meta: Meta,
): CallExpression {
  const properties = transformReaxyMetaToProperties(meta);
  return t.callExpression(t.identifier(name), [t.objectExpression(properties)]);
}
