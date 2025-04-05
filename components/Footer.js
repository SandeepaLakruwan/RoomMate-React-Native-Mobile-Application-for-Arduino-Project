import { StyleSheet, Text, TextInput, View } from "react-native";
import { BlackCode, GreenCode, TextBoldFont, TextFont, WhiteCode, YellowCode } from "../Context";
import { FontAwesome6 } from "@expo/vector-icons";

export function Footer() {
    return (
        <View style={stylesheet.view1}>

            <Text style={stylesheet.text1}>Follow Us</Text>

            <View style={stylesheet.view2}>
                <FontAwesome6 name={"google-plus"} size={25} color={YellowCode} />
                <FontAwesome6 name={"x-twitter"} size={25} color={YellowCode} />
                <FontAwesome6 name={"facebook"} size={25} color={YellowCode} />
                <FontAwesome6 name={"linkedin"} size={25} color={YellowCode} />
            </View>

            <Text style={stylesheet.text2}>© 2024 RoomMate. All rights reserved.</Text>

        </View>
    );
}

const stylesheet = StyleSheet.create(
    {
        text1: {
            fontSize: 17,
            fontFamily: `${TextBoldFont}`,
            color: `${WhiteCode}`,
            marginBottom: 10,
        },
        view1: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            borderRadius: 10,
            borderTopColor:"white",
            borderTopWidth:2,
            padding: 10,
        },
        view2: {
            flex: 1,
            flexDirection: "row",
            columnGap: 20,
            justifyContent: "center",
            alignItems: "center",
            marginBottom:10,
        },
        text2:{
            color:`${WhiteCode}`,
            fontFamily:`${TextFont}`,
            marginBottom:10,
        }
    }
);