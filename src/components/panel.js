import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated
} from 'react-native';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.icons = {
      up: require('../images/Arrowhead-01-128.png'),
      down: require('../images/Arrowhead-Down-01-128.png')
    };
    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value()
    };
    this.toggle = this.toggle.bind(this);
    this.setMaxHeight = this.setMaxHeight.bind(this);
    this.setMinHeight = this.setMinHeight.bind(this);
  }

  setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  setMinHeight(event) {
    this.state.animation.setValue(event.nativeEvent.layout.height);
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  toggle() {
    const initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    const finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
    this.setState({ expanded: !this.state.expanded });
    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      { toValue: finalValue }
    ).start();
  }

  render() {
    let icon = this.icons.down;

    if (this.state.expanded) {
      icon = this.icons.up;
    }
    return (
      <Animated.View
          style={[styles.container, { height: this.state.animation }]}
      >
        <View style={styles.titleContainer} onLayout={this.setMinHeight}>
          <Text style={styles.title} onPress={this.toggle}>{this.state.title}</Text>
          <TouchableHighlight
              style={styles.button}
              onPress={this.toggle}
              underlayColor="#f1f1f1"
          >
            <Image
              style={styles.buttonImage}
              source={icon}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.body} onLayout={this.setMaxHeight}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold',
  },
  button: {

  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});

export default Panel;
