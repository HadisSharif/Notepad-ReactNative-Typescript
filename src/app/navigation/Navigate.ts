import { CommonActions } from '@react-navigation/native';
import { useNavigationContainerRef } from '@react-navigation/native';


export const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`

const navigate = (name: string, params: object = {}) => {
    let navigation = navigationRef;
    navigation.dispatch(
        CommonActions.navigate({
            name: name,
            params: params
        })
    );
}

const goBack = () => {
    navigationRef.dispatch(CommonActions.goBack());
}


export default {
    navigationRef,
    goBack,
    navigate
};