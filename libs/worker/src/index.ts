import Worker from './lib?worker';

// eslint-disable-next-line @nx/enforce-module-boundaries
export type { WorkerRootState } from '@creaux/container-store';
// eslint-disable-next-line @nx/enforce-module-boundaries
export { Track } from '@creaux/container-store';

export default new Worker();
