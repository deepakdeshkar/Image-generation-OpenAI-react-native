import React, { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { Configuration, OpenAIApi } from "openai";
import { API_TOKEN } from "@env";


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>('');
  const [prompt, setPrompt] = useState("");

  const configuration = new Configuration({
    apiKey: API_TOKEN,
  });

  // THIS IS FOR Educational Purposes only
  // BY DEEPAK DESHKAR

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      setLoading(true);
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      });
      setResult(res.data.data[0].url);
      console.log(res.data.data[0].url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>OPEN AI - IMAGE GENERATOR</Text>
          <View style={styles.contentSection}>
            <TextInput style={styles.inputSection} onChangeText={text => setPrompt(text)} />
          </View>
          <View style={styles.searchButton}>
            <Button title='Generate an Image' onPress={() => generateImage()} />
          </View>
          {result?.length > 1 ? <>
            <View style={styles.dataImage}>
              <Image source={{uri: result}} />
            </View>
          </> : <View style={styles.imagePlaceholder}>
            <Image source={require('./assets/ghost.gif')} />
          </View>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  sectionContainer: {
    marginTop: 12,
    paddingHorizontal: 24,
  },
  dataImage: {
    width: 125,
    height: 125
  },
  imagePlaceholder: {
    marginTop: '10%',
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 24,
    fontWeight: '600',
  },
  contentSection: {
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  searchButton: {
    marginTop: '7%',
    maxWidth: '80%',
    minWidth: '80%',

  },
  inputSection: {
    backgroundColor: '#ffffff',
    color: '#000000',
    maxWidth: '80%',
    minWidth: '80%',
    borderRadius: 12,
    fontSize: 24,
    textAlign: 'center'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
