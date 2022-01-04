import React, {useState} from 'react';
import {Platform, ScrollView} from 'react-native';
import {Strings} from '../../common/utils/Strings';
import {useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {RootState, useAppDispatch} from '../../app/store';
import styled from 'styled-components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {userGoogleDataSlice} from './userGoogleDataSlice';
import {CustomAlert} from '../../common/CustomAlert';
import {NormalText} from '../../common/utils/Styles';
import {RoundIcons} from '../../common/RoundIcons';
import Logout from '../../common/assets/images/logouticon.png';
import {Sizes} from '../../common/utils/Sizeing';

export const ProfilePage = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.themeType);
  const userGoogleData = useSelector(
    (state: RootState) => state.userGoogleData.items,
  );
  const dispatch = useAppDispatch();

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onSignOutBtnPress = async () => {
    try {
      if (Platform.OS == 'android') GoogleSignin.configure({});

      await GoogleSignin.signOut();
      dispatch(userGoogleDataSlice.actions.signOut());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Contanier>
          <InnerContanier>
            <Img source={{uri: userGoogleData.photo}} />
            <RoundIcons
              icon={Logout}
              onIconPressed={() => setShowAlert(true)}
            />
          </InnerContanier>
          <InnerContanier>
            <TextView>
              {userGoogleData.givenName + ' ' + userGoogleData.familyName}
            </TextView>
            <TextView>{userGoogleData.email}</TextView>
          </InnerContanier>
        </Contanier>
        <CustomAlert
          show={showAlert}
          title={Strings.warning}
          message={Strings.sureExit}
          showConfirmButton={true}
          showCancelButton={true}
          onConfirmPressed={() => onSignOutBtnPress()}
          onCanclePressed={() => setShowAlert(false)}
          confirmText={Strings.yes}
          cancelText={Strings.no}
        />
      </ScrollView>
    </ThemeProvider>
  );
};

const Contanier = styled.View`
  flex: 3;
  background-color: ${(props: {theme: {bg_color: string}}) =>
    props.theme.bg_color};
`;

const InnerContanier = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  justify-content: space-evenly;
`;

const TextView = styled(NormalText)`
  border-radius: ${Sizes.x25};
  border-width: ${Sizes.x1};
  text-align: center;
  padding: ${Sizes.x10};
  border-color: ${(props: {theme: {primary_color: string}}) =>
    props.theme.primary_color};
`;

const Img = styled.Image`
  width: ${Sizes.x130};
  height: ${Sizes.x130};
  border-radius: ${Sizes.x65}; ;
`;
export default ProfilePage;
