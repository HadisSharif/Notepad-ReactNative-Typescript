import React from 'react';
import {HeaderBackButton} from '@react-navigation/elements';
import Navigate from '../app/navigation/Navigate';
import {ImageSourcePropType} from 'react-native';
import {Icon} from './utils/Styles';
import {ThemeProps} from './utils/Colors';

interface BackBtnProps {
  tintColor: string;
}
interface NavIconProps {
  icon: ImageSourcePropType;
  focused?: boolean;
  tintColor: BackBtnProps['tintColor'];
}

export const NavigationIcon: React.FC<NavIconProps> = props => {
  return (
    <Icon
      focused={props.focused}
      tintColor={props.tintColor}
      source={props.icon}
    />
  );
};

export const HeaderBackBtn: React.FC<BackBtnProps> = props => {
  return (
    <HeaderBackButton
      onPress={() => Navigate.goBack()}
      tintColor={props.tintColor}
    />
  );
};

export const ScreenOptions = (pageName: string, currentTheme: ThemeProps) => ({
  title: pageName,
  headerTintColor: currentTheme.tint_color,
  headerStyle: {backgroundColor: currentTheme.primary_color},
});
