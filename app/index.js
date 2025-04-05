import { Alert, AppState, Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { BlackCode, BlackGreenCode, GreenCode, IpAddress, RoseCode, SemiBlackCode, SemiGreenCode, TextBoldFont, TextFont, TitleFont, WhiteCode, YellowCode } from '../Context';
import { Footer } from '../components/Footer';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import CircularProgress from 'react-native-circular-progress-indicator';

SplashScreen.preventAutoHideAsync();

export default function home() {

    const [getTemperatureValue, setTemperatureValue] = useState(0);
    const [getTemperatureStatus, setTemperatureStatus] = useState(0);
    const [getTemperatureMessage, setTemperatureMessage] = useState(null);
    const [getHumidityValue, setHumidityValue] = useState(0);
    const [getHumidityStatus, setHumidityStatus] = useState(0);
    const [getHumidityMessage, setHumidityMessage] = useState(null);
    const [getAirQualityValue, setAirQualityValue] = useState(0);
    const [getAirQualityStatus, setAirQualityStatus] = useState(0);
    const [getAirQualityMessage, setAirQualityMessage] = useState(null);
    const [getNoiseValue, setNoiceValue] = useState(0);
    const [getNoiseStatus, setNoiceStatus] = useState(0);
    const [getNoiseMessage, setNoiceMessage] = useState(null);

    const logoPath = require("../assets/images/logo.png");

    const [loaded, error] = useFonts(
        {
            "Fredoka-SemiBold": require("../assets/fonts/Fredoka-SemiBold.ttf"),
            "OpenSans_SemiCondensed-Regular": require("../assets/fonts/OpenSans_SemiCondensed-Regular.ttf"),
            "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
        }
    );

    useEffect(
        () => {
            let intervalId;

            async function fetchData() {

                let response = await fetch(`${IpAddress}/ParseData`);

                if (response.ok) {
                    let json = await response.json();

                    if (json.status) {
                        setTemperatureValue(json.temperature_value);
                        setTemperatureStatus(json.temperature_status);
                        setTemperatureMessage(json.temp_warning);
                        setHumidityValue(json.humidity_value);
                        setHumidityStatus(json.humidity_status);
                        setHumidityMessage(json.hum_warning);
                        setAirQualityValue(json.air_quality_value);
                        setAirQualityStatus(json.air_quality_status);
                        setAirQualityMessage(json.air_quality_warning);
                        setNoiceValue(json.noise_value);
                        setNoiceStatus(json.noise_status);
                        setNoiceMessage(json.noise_warning);
                    } else {
                        setTemperatureValue(0);
                        setTemperatureStatus(0);
                        setTemperatureMessage(null);
                        setHumidityValue(0);
                        setHumidityStatus(0);
                        setHumidityMessage(null);
                        setAirQualityValue(0);
                        setAirQualityStatus(0);
                        setAirQualityMessage(null);
                        setNoiceValue(0);
                        setNoiceStatus(0);
                        setNoiceMessage(null);
                    }
                } else {
                    setTemperatureValue(0);
                    setTemperatureStatus(0);
                    setTemperatureMessage(null);
                    setHumidityValue(0);
                    setHumidityStatus(0);
                    setHumidityMessage(null);
                    setAirQualityValue(0);
                    setAirQualityStatus(0);
                    setAirQualityMessage(null);
                    setNoiceValue(0);
                    setNoiceStatus(0);
                    setNoiceMessage(null);
                }
            }
            fetchData();

            intervalId = setInterval(() => {
                fetchData();
            }, 10000);

            return async () => {
                if (intervalId) {
                    clearInterval(intervalId);  // Clear interval when unmounted or when the effect re-runs
                }
            }
        }, []
    );

    useEffect(
        () => {
            if (loaded || error) {
                SplashScreen.hideAsync();
            }
        }, [loaded, error]
    );

    if (!loaded && !error) {
        return null;
    }

    return (
        <LinearGradient colors={["#125B9A", "#0B8494"]} style={stylesheet.view1}>
            <StatusBar hidden={false} />

            <View style={stylesheet.view4}>
                <Image source={logoPath} style={stylesheet.logo} contentFit={'contain'} />
            </View>

            <ScrollView>
                <View style={stylesheet.view2}>

                    <View style={stylesheet.view3}>
                        <FontAwesome6 name={"circle-dot"} size={20} color={getTemperatureStatus != 0 && getHumidityStatus != 0 && getAirQualityStatus != 0 && getNoiseStatus != 0 ? GreenCode : RoseCode} />
                        <Text style={getTemperatureStatus != 0 && getHumidityStatus != 0 && getAirQualityStatus != 0 && getNoiseStatus != 0 ? stylesheet.text1 : stylesheet.text5}>
                            {getTemperatureStatus != 0 && getHumidityStatus != 0 && getAirQualityStatus != 0 && getNoiseStatus != 0 ? "Active Now" : "Offline"}</Text>
                    </View>


                    {getTemperatureStatus == 1 && getAirQualityStatus == 1 && getNoiseStatus == 1 ?
                        <View style={stylesheet.view6}>
                            <View style={stylesheet.view13}>
                                <FontAwesome6 name={"vial-circle-check"} size={25} color={SemiBlackCode} />
                                <Text style={stylesheet.text3}>You're Protected.</Text>
                            </View>
                        </View>
                        :
                        <View style={stylesheet.view15}>
                            <View style={stylesheet.view13}>
                                <FontAwesome6 name={"triangle-exclamation"} size={25} color={SemiBlackCode} />
                                <Text style={stylesheet.text3}>You're Not Protected.</Text>
                            </View>
                        </View>
                    }

                    <View style={stylesheet.view3}>
                        <View style={getTemperatureStatus == 1 ? stylesheet.view5 : stylesheet.view14}>
                            <View style={stylesheet.view12}>
                                <FontAwesome6 name={"temperature-low"} size={20} color={SemiBlackCode} />
                                <Text style={stylesheet.text2}>Temperature</Text>
                            </View>
                            <CircularProgress
                                radius={60}
                                value={getTemperatureValue}
                                textColor={BlackCode}
                                fontSize={15}
                                valueSuffix='°C'
                                progressValueColor={BlackCode}
                                activeStrokeColor={BlackCode}
                                inActiveStrokeColor={BlackCode}
                                inActiveStrokeOpacity={0.2}
                                inActiveStrokeWidth={6}
                                duration={1000}
                            // onAnimationComplete={() => { setValue(50) }}
                            />
                            <View style={stylesheet.view12}>
                                <FontAwesome6 name={getTemperatureStatus != 1 ? "circle-exclamation" : "circle-check"} size={15} color={SemiBlackCode} />
                                <Text style={stylesheet.text2}>{getTemperatureMessage}</Text>
                            </View>
                        </View>
                        <View style={getAirQualityStatus == 1 ? stylesheet.view5 : stylesheet.view14}>
                            <View style={stylesheet.view12}>
                                <FontAwesome6 name={"wind"} size={20} color={SemiBlackCode} />
                                <Text style={stylesheet.text2}>Air Level(ppm)</Text>
                            </View>
                            <CircularProgress
                                maxValue={500}
                                radius={60}
                                value={getAirQualityValue}
                                textColor={BlackCode}
                                fontSize={15}
                                progressValueColor={BlackCode}
                                activeStrokeColor={BlackCode}
                                inActiveStrokeColor={BlackCode}
                                inActiveStrokeOpacity={0.2}
                                inActiveStrokeWidth={6}
                                duration={1000}
                            // onAnimationComplete={() => { setValue(50) }}
                            />
                            <View style={stylesheet.view12}>
                                <FontAwesome6 name={getAirQualityStatus != 1 ? "circle-exclamation" : "circle-check"} size={15} color={SemiBlackCode} />
                                <Text style={stylesheet.text2}>{getAirQualityMessage}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={stylesheet.view3}>
                        <View style={getHumidityStatus == 1 ? stylesheet.view5 : stylesheet.view14}>
                            <View style={stylesheet.view12}>
                                <FontAwesome6 name={"droplet"} size={20} color={SemiBlackCode} />
                                <Text style={stylesheet.text2}>Humidity</Text>
                            </View>
                            <CircularProgress
                                radius={60}
                                value={getHumidityValue}
                                textColor={BlackCode}
                                fontSize={15}
                                valueSuffix='%'
                                progressValueColor={BlackCode}
                                activeStrokeColor={BlackCode}
                                inActiveStrokeColor={BlackCode}
                                inActiveStrokeOpacity={0.2}
                                inActiveStrokeWidth={6}
                                duration={1000}
                            // onAnimationComplete={() => { setValue(50) }}
                            />
                            <View style={stylesheet.view12}>
                                <FontAwesome6 name={getHumidityStatus != 1 ? "circle-exclamation" : "circle-check"} size={15} color={SemiBlackCode} />
                                <Text style={stylesheet.text2}>{getHumidityMessage}</Text>
                            </View>
                        </View>
                        <View style={getNoiseStatus == 1 ? stylesheet.view5 : stylesheet.view14}>
                            <View style={stylesheet.view12}>
                                <FontAwesome6 name={"microphone"} size={20} color={SemiBlackCode} />
                                <Text style={stylesheet.text2}>Noice</Text>
                            </View>
                            <CircularProgress
                                radius={60}
                                value={getNoiseValue}
                                textColor={BlackCode}
                                fontSize={15}
                                valueSuffix='dB'
                                progressValueColor={BlackCode}
                                activeStrokeColor={BlackCode}
                                inActiveStrokeColor={BlackCode}
                                inActiveStrokeOpacity={0.2}
                                inActiveStrokeWidth={6}
                                duration={1000}
                            // onAnimationComplete={() => { setValue(50) }}
                            />
                            <View style={stylesheet.view12}>
                                <FontAwesome6 name={getNoiseStatus != 1 ? "circle-exclamation" : "circle-check"} size={15} color={SemiBlackCode} />
                                <Text style={stylesheet.text2}>{getNoiseMessage}</Text>
                            </View>
                        </View>
                    </View>

                    <Footer />

                </View>

            </ScrollView>



        </LinearGradient >
    );
}

const stylesheet = StyleSheet.create({
    view1: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        rowGap: 10,
    },
    input1: {
        height: 40,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 1,
        fontFamily: "",
        fontSize: 18,
        flex: 1,
        paddingStart: 5,
        borderColor: `${WhiteCode}`,
        color: `${WhiteCode}`,
    },
    view2: {
        flex: 1,
        rowGap: 10,
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    scrollView: {
        flex: 1,
        marginVertical: 20,
    },
    logo: {
        width: 150,
        height: 80,
        flex: 2,
        marginTop: 10,
    },
    view3: {
        flexDirection: 'row',
        columnGap: 5,
        padding: 4,
    },
    view6: {
        flex: 1,
        flexDirection: 'column',
        columnGap: 10,
        padding: 5,
        paddingLeft: 10,
        backgroundColor: `${GreenCode}`,
        borderRadius: 10,
    },
    view15: {
        flex: 1,
        flexDirection: 'column',
        columnGap: 10,
        padding: 5,
        paddingLeft: 10,
        backgroundColor: `${RoseCode}`,
        borderRadius: 10,
    },
    view8: {
        flexDirection: 'column',
        rowGap: 10,
        padding: 1,
        borderTopColor: `${BlackCode}`,
        borderTopWidth: 2,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
    },
    view9: {
        flex: 1,
        flexDirection: 'row',
        columnGap: 10,
        padding: 5,
        paddingLeft: 10,
        backgroundColor: `${YellowCode}`,
        borderRadius: 10,
        marginTop: 10
    },
    view4: {
        flexDirection: "row",
        columnGap: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        margin: 5,
        marginTop: 15,
    },
    view5: {
        rowGap: 10,
        flex: 1,
        padding: 10,
        borderRadius: 10,
        margin: 3,
        backgroundColor: `${SemiGreenCode}`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view14: {
        rowGap: 10,
        flex: 1,
        padding: 10,
        borderRadius: 10,
        margin: 3,
        backgroundColor: `${YellowCode}`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view7: {
        rowGap: 10,
        flex: 1,
        padding: 10,
        borderColor: `${BlackCode}`,
        borderWidth: 1,
        borderRadius: 10,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view10: {
        flexDirection: 'row',
        columnGap: 10,
        borderColor: `${YellowCode}`,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 15,
        alignItems: 'center'
    },
    view11: {
        flex: 1,
        flexDirection: 'row',
        columnGap: 10,
        padding: 5,
        paddingLeft: 10,
        backgroundColor: `${RoseCode}`,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view12: {
        flex: 1,
        flexDirection: 'row',
        columnGap: 10,
        borderRadius: 10,
    },
    view13: {
        flex: 1,
        flexDirection: 'row',
        columnGap: 10,
        borderRadius: 10,
    },
    text1: {
        fontFamily: `${TitleFont}`,
        fontSize: 15,
        color: `${GreenCode}`
    },
    text2: {
        fontFamily: `${TextBoldFont}`,
        fontSize: 14,
        color: `${SemiBlackCode}`
    },
    text3: {
        fontFamily: `${TextFont}`,
        fontSize: 20,
        color: `${SemiBlackCode}`,
    },
    text4: {
        fontFamily: `${TextFont}`,
        fontSize: 18,
        color: `${RoseCode}`,
    },
    text5: {
        fontFamily: `${TitleFont}`,
        fontSize: 15,
        color: `${RoseCode}`
    },
    image1: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "white",
        justifyContent: "center",
        alignSelf: "center",
    },
});
