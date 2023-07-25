import { Platform, StatusBar, StyleSheet, Dimensions } from "react-native";

export const colors = {
	transparent: "#00000000",
	black: "#000000",
	white: "ffffff",
	red: "#ef5350",
	green: "#00a669",
	blue: "#5555FF",
	gradient: ["#EF5350", "#D24879", "#A15090", "#69558F", "#3D5278", "#2F4858"],
	fg: {
		primary: "#ef5350",
		secondary: "#aeaeae"
	},
	bg: {
		primary: "#000000",
		raise: "#ffffff12"
	},
	text: {
		primary: "#ffffff",
		secondary: "#bbbbbb"
	}
};

export const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: colors.black
	},
	mainView: {
		flex: 1,
		paddingHorizontal: "5%",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	},
	baseText: {
		color: colors.white,
		fontSize: 18
	}
});
