import styled from 'styled-components';
import { Sizes } from './Sizeing';

export const NormalText = styled.Text`
font-size:${Sizes.x20};
`
export const BoldText = styled.Text`
font-size:${Sizes.x21};
font-weight:bold;
`
export const TextContainer = styled.View`
align-items: center;
padding:${Sizes.x10};
`
export const TouchableContainer = styled.TouchableOpacity`
align-items: center;
`
export const RowContainer = styled.View`
flex-direction: row;
`
export const Icon = styled.Image.attrs((props: { tintColor: string }) => props)`
align-self: center;
tint-color: ${(props: { tintColor: string }) => props.tintColor};
height: ${Sizes.x30};
width: ${Sizes.x30};
`;

export const MyTextInput = styled.TextInput`
width:${Sizes.p90};
padding: ${Sizes.x10};
border-radius: ${Sizes.x20};
align-self: center;
background-color: ${(props: { theme: { secondary_color: string; }; }) => props.theme.secondary_color};
`;






