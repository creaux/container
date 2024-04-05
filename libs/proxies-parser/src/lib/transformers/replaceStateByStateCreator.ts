import * as t from '@babel/types';
import { transformReaxyMetaToProperties } from '../utils';

interface ReplaceStateByStateCreatorOptions {
  state: string;
  line: number;
}

export function replaceStateByStateCreator(
  options: ReplaceStateByStateCreatorOptions,
) {
  const properties = transformReaxyMetaToProperties({
    line: options.line,
  });

  return t.memberExpression(
    t.callExpression(t.identifier(options.state), [
      t.objectExpression(properties),
    ]),
    t.identifier('value'),
  );
}
