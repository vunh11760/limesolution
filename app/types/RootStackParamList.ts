import {NavigationProp, RouteProp} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {SCREEN_NAME} from 'app/constants/ScreenName';

//TODO: define params for each screen
type ParamListScreen = {
  [key in SCREEN_NAME]: any;
};
type ScreensHaveParamList = {};

export type StackParamList = Omit<ParamListScreen, keyof ScreensHaveParamList> &
  ScreensHaveParamList;

export type RootStackParamList = {
  [Key in SCREEN_NAME]: StackParamList[Key];
};

export type NavigationTypes<K extends SCREEN_NAME | undefined = undefined> =
  NavigationProp<RootStackParamList, K>;
export type RouteTypes<K extends SCREEN_NAME> = RouteProp<
  RootStackParamList,
  K
>;

export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
