import React, {
  Component
} from 'react';
import { Rating, AirbnbRating } from 'react-native-ratings';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class PainRating extends Component {
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>How was the exercise?</Text>
        <AirbnbRating
            count={3}
            reviews={["Sore", "Somewhat Sore", "Good"]}
            defaultRating={3}
            size={25}
        />
        <Rating
            type='heart'
            ratingCount={3}
            imageSize={40}
            showRating

        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
