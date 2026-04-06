import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
       initialRouteName= "Home"
       screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
           backgroundColor: '#c0f3f3',
           height: 60,
           paddingBottom: 5,
        },
        headerShown: false,

       }}
    >
      <Tab.Screen
      options={{
        tabBarIcon: ({color, size}) => 
            <AntDesign name="home" size={24} color="black" />
      }}    
      name="Home" component={HomeScreen} />
      <Tab.Screen
      options={{
        tabBarIcon: ({color, size}) => 
            <AntDesign name="profile" size={24} color="black" />
      }}    
      name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabs;