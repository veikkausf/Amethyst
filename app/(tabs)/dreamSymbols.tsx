import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import Teksti from '@/components/Textbox';
import * as Animatable from 'react-native-animatable';
import Loader from '@/components/loading';
import Symbols from '../../dreamsymbols.json';

type SymbolData = {
  id: string;
  Name: string;
  Desc: string;
};

interface DreamSymbolProps {
  navigation: any;
}

const DreamSymbols: React.FC<DreamSymbolProps> = ({ navigation }) => {
  const [symbolData, setSymbolData] = useState<SymbolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // Directly set symbolData from the imported JSON file
    setSymbolData(Symbols.DreamSymbols);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.grid}>
        <Image
          source={require('../../assets/images/moon2.png')}
          style={styles.image}
        />
        {symbolData.map((item, index) => (
          <Teksti style={styles.tekstiBox} key={item.id}>
            <Collapsible
              key={item.id}
              title={item.Name}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            >
              <Animatable.Text
                animation={{
                  from: {
                    translateY: -25,
                    opacity: 0,
                  },
                  to: {
                    translateY: 0,
                    opacity: 1,
                  },
                }}
                duration={1000}
                style={styles.normalFont}
              >
                {item.Desc}
              </Animatable.Text>
            </Collapsible>
          </Teksti>
        ))}

        {loading && <Text style={styles.normalFont}>Loading symbols...</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'column',
    width: '95%',
    padding: 10,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
  },
  tekstiBox: {
    width: '90%',
    padding: 5,
    marginVertical: 10,
    borderRadius: 8,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default DreamSymbols;
