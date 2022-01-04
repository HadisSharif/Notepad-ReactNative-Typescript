import React, {useEffect, useState} from 'react';
import {themeGenerator} from '../../common/utils/Colors';
import {ThemeShowCase} from '../../common/ThemeShowCase';
import {ThemeProvider} from 'styled-components/native';
import {RootState, useAppDispatch} from '../../app/store';
import {useSelector} from 'react-redux';
import {themeSlice} from './themeSlice';
import styled from 'styled-components';
import {allThemes} from '../../common/utils/Colors';

const SettingPage: React.FC = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.themeType);
  const dispatch = useAppDispatch();

  const [colorList, setColorList] = useState<string[][]>([]);
  const [themeTitleList, setThemeTitleList] = useState<string[][]>([]);

  const makeShortList = () => {
    const colorsArray: string[][] = [];
    const titleArray: string[][] = [];

    for (const theme of allThemes) {
      colorsArray.push(theme.slice(0, 4));
      titleArray.push(theme.slice(0, 1));
    }
    setColorList(colorsArray);
    setThemeTitleList(titleArray);
  };

  useEffect(() => {
    makeShortList();
  }, []);

  const onThemeChanged = (theme: string) => {
    for (let item of allThemes) {
      if (item[0] == theme) {
        dispatch(themeSlice.actions.changeTheme(themeGenerator(item)));
      }
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Contanier>
        <ThemeShowCase
          themeName={themeTitleList}
          themeData={colorList}
          selectedItem={currentTheme.mode}
          onThemeSelected={itemId => onThemeChanged(itemId)}
          tintColor={currentTheme.secondary_color}
        />
      </Contanier>
    </ThemeProvider>
  );
};

const Contanier = styled.View`
  background-color: ${(props: {theme: {bg_color: string}}) =>
    props.theme.bg_color};
  flex: 1;
`;

export default SettingPage;
