import { Track } from '../models';
import { ComponentSlice, componentSlice, track } from './component.slice';

describe('Component Slice', () => {
  it('results in default state on uknown actions', () => {
    const result = componentSlice.reducer(undefined, { type: 'unknown' });
    expect(result).toEqual({ code: '', value: [] });
  });

  it('results in modified states on track action', () => {
    const result: ComponentSlice = componentSlice.reducer(
      undefined,
      track(new Track('INIT', { line: 1, id: 'a' })),
    );
    expect(result.code).toEqual('');
    expect(result.value[0].id).toBeDefined();
    expect(result.value[0].timestamp).toBeDefined();
    expect(result.value[0].step).toEqual('INIT');
    expect(result.value[0].cast).toEqual(0);
    expect(result.value[0].meta.id).toEqual('a');
    expect(result.value[0].meta.line).toEqual(1);
  });

  it('results in updated value', () => {
    const initialState = {
      value: [new Track('REGISTER', { line: 1, id: 'a' })],
      code: '',
    };
    const result: ComponentSlice = componentSlice.reducer(
      initialState,
      track(new Track('INIT', { line: 2, id: 'b' })),
    );
    expect(result.value).toHaveLength(2);
    expect(result.value[0].step).toEqual('REGISTER');
    expect(result.value[1].step).toEqual('INIT');
  });
});
