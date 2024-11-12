import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

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

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.grid}>
        <Text style={styles.header}>Symbols</Text>
        {symbolData.map((item, index) => (
          <Collapsible
            key={item.id}
            title={item.Name}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          >
            <Text style={styles.normalFont}>{item.Desc}</Text>
          </Collapsible>
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
    width: '100%',
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
});

export default DreamSymbols;
