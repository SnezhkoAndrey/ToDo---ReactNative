import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

interface TimerPropsType {
  date: string;
  failTask: (id: number) => void;
  id: number;
}

const Timer = ({ date, failTask, id }: TimerPropsType) => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const getTime = () => {
    const time = Date.parse(date) - Date.now();

    if (time < 1000) {
      failTask(id);
    }

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.time}>
        <Text style={styles.item}>{days} d</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.item}>{hours} h</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.item}>{minutes} m</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.item}>{seconds} s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  time: {
    backgroundColor: "#777777",
    borderRadius: 10,
  },
  item: {
    color: "#b8b8b8",
    padding: 5,
    width: 50,
    textAlign: "center",
  },
});

export default Timer;
