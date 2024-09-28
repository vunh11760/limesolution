import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import ImageUtil from 'app/utils/ImageUtil';
import color from 'app/assets/styles/color';
import Home from 'app/screens/Home';
import Profile from 'app/screens/Profile';
import Messages from 'app/screens/Messages';
import Category from 'app/screens/Category';
import MyMatches from 'app/screens/MyMatches';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {backgroundColor: color.black},
        tabBarStyle: {
          height: 50,
          paddingBottom: 10,
          backgroundColor: color.black,
          borderTopColor: color.black,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route}) => {
          return {
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_home_active}
                />
              ) : (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_home_inactive}
                />
              ),
          };
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={({route}) => {
          return {
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_category_active}
                />
              ) : (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_category_inactive}
                />
              ),
          };
        }}
      />
      <Tab.Screen
        name="MyMatches"
        component={MyMatches}
        options={({route}) => {
          return {
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_match_active}
                />
              ) : (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_match_inactive}
                />
              ),
          };
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={({route}) => {
          return {
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_messages_active}
                />
              ) : (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_messages_inactive}
                />
              ),
          };
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({route}) => {
          return {
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_profile_active}
                />
              ) : (
                <Image
                  style={styles.tabIcon}
                  source={ImageUtil.images.ic_profile_inactive}
                />
              ),
          };
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
const styles = StyleSheet.create({
  tabIcon: {
    width: 25,
    height: 25,
  },
});
