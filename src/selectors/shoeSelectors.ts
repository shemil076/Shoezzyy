import { RootState } from "../store";

export const selectShoes = (state : RootState) => state.shoes.shoes;
export const selectShoesLoading = (state : RootState) => state.shoes.loading;
export const selectShoesLastFetched = (state : RootState) => state.shoes.lastFetched;