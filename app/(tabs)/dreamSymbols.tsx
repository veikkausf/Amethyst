import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Teksti from '@/components/Textbox';
import * as Animatable from 'react-native-animatable';
import Loader from '@/components/loading';

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
    const fetchSymbols = async () => {
      try {
        const SymbolCollection = collection(db, 'Dream symbols');
        const DreamSymbolsSnapshot = await getDocs(SymbolCollection);

        const symbols: SymbolData[] = DreamSymbolsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            Name: data.Name ?? 'Unknown Symbol',
            Desc: data.Desc ?? '',
          };
        });

        setSymbolData(symbols);
      } catch (error) {
        console.error('Error fetching symbols:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSymbols();
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
        ></Image>
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
  header: {
    fontSize: 30,
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
    color: 'white',
  },
  tekstiBox: {
    width: '90%',
    padding: 5,
    marginVertical: 10, // Optional: Add spacing between boxes
    borderRadius: 8, // Optional: Add rounded corners for a polished look
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default DreamSymbols;
