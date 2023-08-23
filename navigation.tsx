import Todos from "./pages/Todos";
import FailTodos from "./pages/FailTodos";
import CompleteTodos from "./pages/CompleteTodos";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const Stack = createStackNavigator();

const Navigate = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Todos"
            component={Todos}
            options={{
              title: "Main",
              headerStyle: {
                backgroundColor: "#333333",
                shadowColor: "#2b2b2b",
                shadowRadius: 5,
              },
              headerTitleStyle: { color: "#fff" },
            }}
          />
          <Stack.Screen
            name="Complete"
            component={CompleteTodos}
            options={{
              title: "Completed tasks",
              headerStyle: {
                backgroundColor: "#333333",
                shadowColor: "#2b2b2b",
                shadowRadius: 5,
              },
              headerTitleStyle: { color: "#fff" },
            }}
          />
          <Stack.Screen
            name="Fail"
            component={FailTodos}
            options={{
              title: "Failed tasks",
              headerStyle: {
                backgroundColor: "#333333",
                shadowColor: "#2b2b2b",
                shadowRadius: 5,
              },
              headerTitleStyle: { color: "#fff" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigate;
