import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { deleteTodo, selectFailTodos } from "../redux/todosSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FailTodos = () => {
  const failTodos = useAppSelector(selectFailTodos);

  const dispatch = useAppDispatch();
  const deleteTasks = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={failTodos}
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <View style={styles.todoContainer}>
                <Text style={styles.todo}>{item.todo}</Text>
              </View>
              <View style={styles.layout}>
                <View style={styles.dataContainer}>
                  <Text style={styles.data}>
                    {item.date.split(" ").slice(0, 5).join(" ")}
                  </Text>
                </View>
                <Pressable onPress={() => deleteTasks(item.id)}>
                  <MaterialCommunityIcons
                    name="delete-forever-outline"
                    size={30}
                    color="#c76f38"
                  />
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#414141",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  item: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#3d3d3d",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#83352a",
    padding: 20,
    gap: 20,
    marginBottom: 10,
    ":last-child": {
      marginBotton: 0,
    },
  },
  todoContainer: {
    backgroundColor: "#505050",
    borderRadius: 10,
  },
  todo: {
    color: "#b8b8b8",
    fontSize: 20,
    padding: 10,
  },
  layout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  dataContainer: {
    backgroundColor: "#777777",
    borderRadius: 10,
  },
  data: {
    color: "#b8b8b8",
    padding: 7,
    textAlign: "center",
  },
});

export default FailTodos;
