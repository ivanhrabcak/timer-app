import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const secondsToTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}

const AdditionButton = ({ timer, setTimer, amount }) => {
  const buttonText = (amount > 0) ? `+${amount}` : `${amount}`;

  const addToTimer = () => {
    if (timer + amount > 0) {
      setTimer(timer + amount);
    }  
  }

  return (
    <View>
    <Button 
      style={styles.button}
      title={buttonText}
      onPress={addToTimer}
    />
    </View>
  );
}

const App = () => {
  const [timer, setTimer] = useState(60);
  const [shouldDecrease, setShouldDecrease] = useState(false);
  const [isStopped, setIsStopped] = useState(true)

  const decreaseTimer = () => {
    if (timer > 0) {
      setTimer(timer - 1)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShouldDecrease(true);
    }, 1000);
  }, []);

  if (shouldDecrease && !isStopped) {
    decreaseTimer();

    setShouldDecrease(false);

    setTimeout(() => {
      setShouldDecrease(true);
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{secondsToTime(timer)}</Text>
      
      <View style={styles.additionButtonContainer}>
        <AdditionButton timer={timer} setTimer={setTimer} amount={10} />
        <AdditionButton timer={timer} setTimer={setTimer} amount={-10} />
      </View>


      <View style={styles.controlButtonContainer}>
        <Button 
          title={isStopped ? 'Start' : 'Stop'}
          color={isStopped ? '#2196F3' : '#ee4b2b'}
          onPress={() => {setIsStopped(!isStopped)}}
          style={styles.button}
        />

        <Button 
          title="Reset"
          onPress={() => {
            setTimer(60);
            setIsStopped(true);
          }}
          style={styles.button}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 40,
    fontWeight: '600'
  },
  additionButtonContainer: {
    flex: 1,
    width: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 'none'
  },
  controlButtonContainer: {
    flex: 1,
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 'none',
    marginTop: '10px'
  },
  
});

export default App;