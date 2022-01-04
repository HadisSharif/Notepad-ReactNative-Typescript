import React from 'react';
import {Colors} from './utils/Colors';
import {
  BoldText,
  NormalText,
  RowContainer,
  TextContainer,
} from './utils/Styles';
import styled from 'styled-components';
import {Button} from 'react-native-paper';
import {Sizes} from '../common/utils/Sizeing';

interface AlertProps {
  show: boolean;
  title: string;
  message: string;
  showConfirmButton: boolean;
  showCancelButton?: boolean;
  confirmText: string;
  cancelText?: string;
  onConfirmPressed: () => void;
  onCanclePressed?: () => void;
}

export const CustomAlert: React.FC<AlertProps> = props => {
  const onCancelClicked = () => {
    if (props.onCanclePressed) props.onCanclePressed();
  };

  return (
    <>
      {props.show && (
        <Contanier>
          <InnerContanier>
            <MyTextContainer>
              <BoldText>{props.title}</BoldText>
            </MyTextContainer>
            <TextContainer>
              <NormalText>{props.message}</NormalText>
            </TextContainer>
            <BottonContainer>
              {props.showConfirmButton && (
                <Button
                  mode="contained"
                  color={Colors.dark_green}
                  onPress={() => props.onConfirmPressed()}>
                  {props.confirmText}
                </Button>
              )}
              {props.showCancelButton && (
                <Button
                  mode="contained"
                  color={Colors.dark_green}
                  onPress={() => onCancelClicked()}>
                  {props.cancelText}
                </Button>
              )}
            </BottonContainer>
          </InnerContanier>
        </Contanier>
      )}
    </>
  );
};

const Contanier = styled(RowContainer)`
  width: ${Sizes.p100};
  height: ${Sizes.p100};
  justify-content: center;
  background-color: ${Colors.transparent_black};
  position: absolute;
`;
const InnerContanier = styled.View`
  width:${Sizes.p80};
  align-self: center;
  background-color:${Colors.cream}
  position:absolute;
  border-radius: ${Sizes.x20};
`;
const MyTextContainer = styled(TextContainer)`
  border-bottom-width: ${Sizes.x1}; ;
`;
const BottonContainer = styled(RowContainer)`
  justify-content: space-evenly;
  align-items: center;
  padding: ${Sizes.x10};
`;
