import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/login/loginSlice';
import photoSlice from './features/photo/photoSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      datalogin: loginSlice,    
      photo: photoSlice,
    }
  })
}

  
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']