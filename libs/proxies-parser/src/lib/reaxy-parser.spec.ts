import { reaxyParser } from './reaxy-parser';
import { GeneratorResult } from '@babel/generator';

describe('reaxyParser', () => {
  let reaxy: any;
  let transform: (code: string, id: string) => GeneratorResult;
  beforeAll(() => {
    reaxy = reaxyParser({
      blob: /file.tsx$/,
      idRegExp: /\s*\[!id\s+(.*?)]\s*/,
      fromImport: './use-effect.creator',
    });
    transform = reaxy.transform;
  });

  it('should replace useEffect for useEffectCreator call expression', () => {
    const input = `useEffect/* [!id test] */(() => {}, [])`;
    const expected = `useEffectProxy({
  line: 1
})([{
  line: 1
}, () => {}], []);`;
    expect((transform(input, 'file.tsx') as GeneratorResult).code).toEqual(
      expected,
    );
  });

  it('should replace useEffect from react for useEffectCreator import from custom package', () => {
    const input = `import { useEffect } from 'react';`;
    const expected = `import { useEffectProxy } from "@creaux/container-proxies";`;
    expect((transform(input, 'file.tsx') as GeneratorResult).code).toEqual(
      expected,
    );
  });

  it('should not replace useEffect as whatever from react when local and imported name are different', () => {
    const input = `import { useEffect as whatever } from 'react';`;
    const expected = `import { useEffect as whatever } from 'react';`;
    expect((transform(input, 'file.tsx') as GeneratorResult).code).toEqual(
      expected,
    );
  });
});
