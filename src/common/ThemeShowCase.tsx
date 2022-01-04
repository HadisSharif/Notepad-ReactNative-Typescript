import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {RowContainer, TouchableContainer} from './utils/Styles';
import styled from 'styled-components';
import {RadioButton} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {Sizes} from '../common/utils/Sizeing';

interface ThemeProps {
  themeName: string[][];
  themeData: string[][];
  selectedItem: string;
  onThemeSelected: (itemId: string) => void;
  tintColor: string;
}

export const ThemeShowCase: React.FC<ThemeProps> = props => {
  const RenderColorBar: Function = (colorList: string[]): JSX.Element[] => {
    return colorList.map((item, index) => <Bar key={index} bgColor={item} />);
  };

  const onItemPress = (theme: string) => {
    props.onThemeSelected(theme);
  };

  return (
    <FlatList
      data={props.themeData}
      keyExtractor={item => item.toString()}
      renderItem={({item, index}: ListRenderItemInfo<string[]>) => (
        <Contanier onPress={() => onItemPress(item[0])}>
          <RadioButtonContanier>
            <RadioButton
              onPress={() => onItemPress(item[0])}
              value={item[0]}
              color={props.tintColor}
              status={props.selectedItem == item[0] ? 'checked' : 'unchecked'}
            />
          </RadioButtonContanier>
          <ColorContanier key={index}>
            {RenderColorBar(item.slice(1, 4))}
          </ColorContanier>
        </Contanier>
      )}
    />
  );
};

const Contanier = styled(TouchableContainer)`
  flex-direction: row;
`;

const RadioButtonContanier = styled(TouchableContainer)`
  flex: 1;
`;

const ColorContanier = styled(RowContainer)`
  margin: ${Sizes.x5};
  border-width: ${Sizes.x1};
  border-color: gray;
  flex: 3;
`;

const Bar = styled.View`
  flex: 0.35;
  height: ${Sizes.x60};
  background-color: ${(props: {bgColor: string}) => props.bgColor};
`;
