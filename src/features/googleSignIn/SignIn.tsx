import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Colors} from '../../common/utils/Colors';
import {ScreenNames, Strings} from '../../common/utils/Strings';
import {useAppDispatch} from '../../app/store';
import {userGoogleDataSlice} from './userGoogleDataSlice';
import Navigate from '../../app/navigation/Navigate';
import styled from 'styled-components';
import {
  checkUserExsists,
  RegisterNewUser,
} from '../../app/firebase/FirestoreApi';
import {CustomAlert} from '../../common/CustomAlert';
import {Sizes} from '../../common/utils/Sizeing';
import {googleSignInConfig} from '../../app/google/googleConfig';

interface User {
  id: string | null;
  givenName: string | null;
  familyName: string | null;
  name?: string | null;
  email?: string | null;
  photo?: string | null;
}

interface GoogleUserInfo {
  user: User;
}

const SigninPage = () => {
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState({show: false, msg: ''});
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  const showError = (msg: string) => {
    setAlert({show: true, msg: msg});
  };

  const onSignInBtnPress = async () => {
    try {
      GoogleSignin.configure(googleSignInConfig);
      setIsInProgress(true);
      await GoogleSignin.hasPlayServices();
      let userInfo: GoogleUserInfo = await GoogleSignin.signIn();
      onUserRegistering(userInfo.user);
    } catch (error) {
      setIsInProgress(false);
      const typedError = error as NativeModuleError;
      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          showError(Strings.logincancelled);
          console.error('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          console.error('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showError(Strings.playServicesError);
          console.error('play services not available or outdated');
          break;
        default:
          console.error('Something went wrong', typedError.toString());
      }
    }
  };

  const onUserRegistering = async (user: User) => {
    const isUserExsists: boolean | void = await checkUserExsists(user.email!);

    if (!isUserExsists) {
      let userData: User = user;
      RegisterNewUser(user.email!, userData);
    }

    dispatch(userGoogleDataSlice.actions.login(user));
    setIsInProgress(false);
    Navigate.navigate(ScreenNames.MainBottomTabs);
  };

  return (
    <Contanier>
      <InnerContainer flex={2}>
        <AppName>{Strings.appName}</AppName>
      </InnerContainer>
      <InnerContainer flex={1}>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => onSignInBtnPress()}
          disabled={isInProgress}
        />
      </InnerContainer>
      <CustomAlert
        show={alert.show}
        title={Strings.warning}
        message={alert.msg}
        showConfirmButton={true}
        showCancelButton={false}
        onConfirmPressed={() => setAlert({show: false, msg: ''})}
        confirmText={Strings.ok}
      />
    </Contanier>
  );
};

const Contanier = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${Colors.main_purple};
`;

const AppName = styled.Text`
  font-size: ${Sizes.x50};
  text-align: center;
  color: ${Colors.green_light};
`;

const InnerContainer = styled.View`
  flex: ${(props: {flex: number}) => props.flex};
  justify-content: center;
`;

export default SigninPage;
