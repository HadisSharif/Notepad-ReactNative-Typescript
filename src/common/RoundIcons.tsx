import React from 'react';
import styled from 'styled-components';
import {ImageSourcePropType} from 'react-native';
import {Icon} from './utils/Styles';
import {useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {Sizes} from '../common/utils/Sizeing';

interface IconProps {
  icon: ImageSourcePropType;
  onIconPressed: () => void;
}
export const RoundIcons: React.FC<IconProps> = props => {
  const currentTheme = useSelector((state: RootState) => state.theme.themeType);

  return (
    <Touchable
      onPress={() => props.onIconPressed()}
      bgColor={currentTheme.secondary_color}>
      <Icon source={props.icon} tintColor={currentTheme.tint_color} />
    </Touchable>
  );
};

const Touchable = styled.TouchableOpacity`
  height: ${Sizes.x50};
  width: ${Sizes.x60};
  justify-content: center;
  background-color: ${props => props.bgColor};
  border-radius: ${Sizes.x50};
  margin: ${Sizes.x5};
`;
