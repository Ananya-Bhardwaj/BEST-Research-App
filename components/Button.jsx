import React from 'react'
import { View, StyleSheet } from 'react-native'

const Button = ({title, handleClick}) => {
  return (
    <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        />
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        margin: 2,
    },
});