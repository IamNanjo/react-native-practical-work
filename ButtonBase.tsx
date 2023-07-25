import React from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";
import type { GestureResponderEvent } from "react-native";

import { styles, colors } from "./styles";

interface Props {
	text: string;
	onPress: (event: GestureResponderEvent) => any;
}

export default (props: Props) => (
	<TouchableHighlight style={buttonStyles.button} onPress={props.onPress}>
		<Text style={{ ...styles.baseText, ...buttonStyles.text }}>
			{props.text}
		</Text>
	</TouchableHighlight>
);

const buttonStyles = StyleSheet.create({
	button: {
		backgroundColor: colors.fg.primary,
		padding: 8,
		borderRadius: 8
	},
	text: {
		alignSelf: "center"
	}
});
