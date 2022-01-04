import React from 'react';
import NoteListPage from '../../features/note/NoteList';
import SettingPage from '../../features/theme/ThemeSetting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import styled from 'styled-components';
import listicon from '../../common/assets/images/listicon.png';
import settingicon from '../../common/assets/images/settingicon.png';
import accounticon from '../../common/assets/images/accounticon.png';
import plusicon from '../../common/assets/images/plusicon.png';
import {
  HeaderBackBtn,
  NavigationIcon,
  ScreenOptions,
} from '../../common/NavigationUI';
import {ScreenNames, Strings} from '../../common/utils/Strings';
import {RoundIcons} from '../../common/RoundIcons';
import Navigate from './Navigate';
import {Dimensions , Platform} from 'react-native';
import { RowContainer } from '../../common/utils/Styles';
import { Sizes } from '../../common/utils/Sizeing';
const screen = Dimensions.get('window');

const MainTabs = createBottomTabNavigator();

export const MainBtmTabs = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.themeType);

  return (
    <MainTabs.Navigator
      backBehavior="initialRoute"
      screenOptions={{
        tabBarStyle: {backgroundColor: currentTheme.primary_color},
        tabBarShowLabel: false,
        tabBarActiveTintColor: currentTheme.primary_color,
        tabBarInactiveTintColor: currentTheme.bg_color,
        tabBarActiveBackgroundColor: currentTheme.secondary_color,
      }}>
      <MainTabs.Screen
        name={ScreenNames.NoteListPage}
        component={NoteListPage}
        options={{
          ...ScreenOptions(Strings.appName, currentTheme),
          tabBarIcon: ({focused}) => {
            return (
              <NavigationIcon
                focused={focused}
                icon={listicon}
                tintColor={currentTheme.tint_color}
              />
            );
          },
          headerRight: () => (
            <Contanier>
              <RoundIcons
                icon={accounticon}
                onIconPressed={() => Navigate.navigate(ScreenNames.ProfilePage)}
              />
              <RoundIcons
                icon={plusicon}
                onIconPressed={() =>
                  Navigate.navigate(ScreenNames.SingleNotePage)
                }
              />
            </Contanier>
          ),
        }}
      />
      <MainTabs.Screen
        name={ScreenNames.Setting}
        component={SettingPage}
        options={{
          ...ScreenOptions(Strings.setting, currentTheme),
          tabBarIcon: ({focused}) => {
            return (
              <NavigationIcon
                focused={focused}
                icon={settingicon}
                tintColor={currentTheme.tint_color}
              />
            );
          },
          headerLeft: () => (
            <HeaderBackBtn tintColor={currentTheme.tint_color} />
          ),
        }}
      />
    </MainTabs.Navigator>
  );
};

const Contanier = styled(RowContainer)`
width: ${screen.width / 3}px;
margin-bottom:${Platform.OS == 'android' ? Sizes.x1 : Sizes.x10};
align-items: center;
justify-content: space-around;
`;
