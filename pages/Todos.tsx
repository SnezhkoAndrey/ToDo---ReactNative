import { useState } from "react";
import {
  FlatList,
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import TodosForm from "./components/TodosForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  completeTodo,
  removeTodo,
  selectTodos,
  setTodos,
} from "../redux/todosSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Timer from "./components/Timer";

interface TodoType {
  id: number;
  todo: string;
  date: any;
}

const Todos = ({ navigation }: any) => {
  const [visible, setVisible] = useState(false);

  const GoToCoplete = () => {
    navigation.navigate("Complete");
  };
  const GoToFail = () => {
    navigation.navigate("Fail");
  };

  const todos = useAppSelector(selectTodos);

  const dispatch = useAppDispatch();
  const setTasks = (todos: TodoType[]) => {
    dispatch(setTodos(todos));
  };
  const completeTasks = (id: number) => {
    dispatch(completeTodo(id));
  };
  const removeTasks = (id: number) => {
    dispatch(removeTodo(id));
  };

  const addTodo = (todo: string, date: string) => {
    if (todo) {
      const newTodo = {
        id: Math.random(),
        todo,
        date,
      };
      setTasks([...todos, newTodo]);
    }
  };

  const changeVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <View style={styles.main}>
      <Pressable style={styles.addButton} onPress={changeVisible}>
        <MaterialIcons name="post-add" size={30} color="#ff7c2a" />
      </Pressable>
      <Modal visible={visible}>
        <TodosForm addTodo={addTodo} changeVisible={changeVisible} />
      </Modal>
      <FlatList
        data={todos}
        style={{ margin: 20, width: "100%" }}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.todoText}>{item.todo}</Text>
              </View>
              <Timer date={item.date} failTask={removeTasks} id={item.id} />
              <View style={styles.buttonsContainer}>
                <Pressable
                  style={styles.taskButton}
                  onPress={() => completeTasks(item.id)}
                >
                  <Ionicons
                    name="checkmark-done-sharp"
                    size={30}
                    color="#28912f"
                  />
                </Pressable>
                <Pressable
                  style={styles.taskButton}
                  onPress={() => removeTasks(item.id)}
                >
                  <MaterialIcons name="remove-done" size={30} color="#913928" />
                </Pressable>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.navButtonContainer}>
        <Pressable style={styles.navButton} onPress={GoToCoplete}>
          <MaterialCommunityIcons
            name="text-box-check-outline"
            size={30}
            color="#28912f"
          />
          <Text style={styles.navButtonTitle}>Completed tasks</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={GoToFail}>
          <MaterialCommunityIcons
            name="text-box-remove-outline"
            size={30}
            color="#913928"
          />
          <Text style={styles.navButtonTitle}>Failed tasks</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#414141",
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  addButton: {
    paddingVertical: 7,
    paddingHorizontal: 30,
    backgroundColor: "#3d3d3d",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2b2b2b",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#3d3d3d",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2b2b2b",
    padding: 15,
    gap: 15,
    marginBottom: 10,
    ":last-child": {
      marginBotton: 0,
    },
  },
  textContainer: {
    backgroundColor: "#505050",
    borderRadius: 10,
  },
  todoText: {
    color: "#b8b8b8",
    fontSize: 20,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  taskButton: {
    flex: 1,
    alignItems: "center",
  },
  navButtonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#2b2b2b",
    backgroundColor: "#3d3d3d",
  },
  navButtonTitle: {
    fontSize: 18,
    color: "#b8b8b8",
  },
});

export default Todos;
