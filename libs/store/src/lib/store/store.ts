import { combineReducers, configureStore } from '@reduxjs/toolkit';
import componentReducer from '../slices/component.slice';
import renderReducer from '../slices/render.slice';
import createSagaMiddleware from 'redux-saga';
import { saga } from './saga';

const rootReducer = combineReducers({
  component: componentReducer,
  render: renderReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type WorkerRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
