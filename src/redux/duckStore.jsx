import { configureStore } from '@reduxjs/toolkit'
import todoApp from './ducks/todoApp'

export const duckStore = configureStore({ reducer: todoApp, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
}) })