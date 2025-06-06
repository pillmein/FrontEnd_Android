import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};
export default App;
