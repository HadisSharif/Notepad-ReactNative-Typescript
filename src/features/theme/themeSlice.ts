import { createSlice } from '@reduxjs/toolkit'
import { themeGenerator, allThemes } from '../../common/utils/Colors';
import { ThemeProps } from '../../common/utils/Colors'

interface Theme {
  themeType: ThemeProps
}

const initialState: Theme = {
  themeType: themeGenerator(allThemes[0])
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.themeType = {
        mode: action.payload.mode,
        primary_color: action.payload.primary_color,
        secondary_color: action.payload.secondary_color,
        bg_color: action.payload.bg_color,
        card_color: action.payload.card_color,
        text_color: action.payload.text_color,
        tint_color: action.payload.tint_color,
      }
    },
  },
})

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;

