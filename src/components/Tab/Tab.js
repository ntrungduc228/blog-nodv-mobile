import {
  MaterialTopTabBar,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {StyleSheet, View} from 'react-native';

const TabMUI = createMaterialTopTabNavigator();
export const Tab = ({tabItems, startButton}) => {
  return (
    <View className="h-full w-full">
      <TabMUI.Navigator
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBar={props => (
          <View style={{flexDirection: 'row'}}>
            {startButton}
            <MaterialTopTabBar {...props} />
          </View>
        )}
        overScrollMode="auto"
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: Styles.tabBarLabel,
          tabBarItemStyle: Styles.tabBarItemStyle,
          tabBarStyle: Styles.tabBarStyle,
          tabBarPressColor: '#d7cbcb',
          tabBarIndicatorStyle: Styles.tabBarIndicatorStyle,

          lazy: true,
        }}>
        {tabItems.map(tabItem => (
          <TabMUI.Screen
            key={tabItem.key}
            name={tabItem.key}
            component={tabItem.component}
            initialParams={tabItem.initialParams}
            options={{
              title: tabItem.title,
            }}
          />
        ))}
      </TabMUI.Navigator>
    </View>
  );
};

const Styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 13,
    textTransform: 'none',
  },

  tabBarItemStyle: {width: 'auto'},
  tabBarStyle: {
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    elevation: 0,
    marginRight: 10,
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 1,
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#757575',
    height: 1,
  },
});
