import React from "react";
import SingleNotePage from "../../features/note/SingleNote";
import ProfilePage from "../../features/googleSignIn/Profile";
import SignInPage from "../../features/googleSignIn/SignIn";
import SplashPage from "../../features/Splash";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { MainBtmTabs } from "./MainBottomTabs";
import { HeaderBackBtn, ScreenOptions } from "../../common/NavigationUI";
import { Strings } from "../../common/utils/Strings";

type RootStackParamList = {
  SignInPage: undefined;
  MainBottomTabs: undefined;
  SingleNotePage: undefined;
  ProfilePage: undefined;
  SplashPage: undefined;
};
const RootStack = createStackNavigator<RootStackParamList>();

export const Index = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.themeType);

  const userGoogleData = useSelector(
    (state: RootState) => state.userGoogleData.items
  );
  let isUserEmpty = Object.values(userGoogleData).every(
    (x) => x === null || x === ""
  );

  return (
    <RootStack.Navigator>
      {isUserEmpty ? (
        <>
          <RootStack.Screen
            options={{ headerShown: false }}
            name="SplashPage"
            component={SplashPage}
          />
  <RootStack.Screen
            options={{ headerShown: false }}
            name="SignInPage"
            component={SignInPage}
          />
        </>
      ) : (
        <>
          <RootStack.Screen
            name="MainBottomTabs"
            component={MainBtmTabs}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="SingleNotePage"
            component={SingleNotePage}
            options={{
              ...ScreenOptions(Strings.note, currentTheme),
              headerLeft: () => (
                <HeaderBackBtn tintColor={currentTheme.tint_color} />
              ),
            }}
          />
          <RootStack.Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{
              ...ScreenOptions(Strings.profile, currentTheme),
              headerLeft: () => (
                <HeaderBackBtn tintColor={currentTheme.tint_color} />
              ),
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};
