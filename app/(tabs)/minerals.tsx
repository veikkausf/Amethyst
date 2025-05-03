import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import MineralButton from '@/components/MineralButton';
import Teksti from '@/components/Textbox';
import ResponsiveText from '@/components/ResponsiveText';

type BoxItem = {
  chakra: string;
  desc: string;
  horoscope: string;
  name: string;
  image: any;
};

const data: BoxItem[] = [
  {
    chakra: 'Crown, Third Eye, Sacral',
    desc: 'Known for relaxation, stress relief, and spiritual growth. This soothing stone helps calm the mind, ease tension, and promote restful sleep. Amethyst also supports emotional balance and enhances spiritual awareness, making it a powerful aid in meditation and personal transformation.',
    horoscope: 'Aquarius, Pisces, Virgo, Capricorn',
    name: 'Amethyst',
    image: require('../../assets/images/Minerals/amethyst.png'),
  },
  {
    chakra: 'Heart',
    desc: 'Promotes luck, prosperity, and emotional balance. This crystal is believed to attract positive opportunities and enhance abundance in various aspects of life. It also supports emotional healing and stability, helping to maintain a balanced and optimistic outlook.',
    horoscope: 'Cancer, Taurus, Virgo',
    name: 'Aventurine',
    image: require('../../assets/images/Minerals/aventurine.png'),
  },
  {
    chakra: 'Root and Sacral Chakra',
    desc: 'A stone of vitality, creativity, and motivation. Carnelian boosts energy, courage, and creative expression, inspiring motivation and determination to achieve goals. It also balances the mind and body, providing warmth and self-confidence for daily challenges.',
    horoscope: 'Aries, Cancer, Scorpio',
    name: 'Carnelian',
    image: require('../../assets/images/Minerals/carnelian.png'),
  },
  {
    chakra: 'Sacral, Solar Plexus',
    desc: 'Known for promoting positivity, self-confidence, and abundance. This bright stone radiates joy and optimism, helping to dispel negative energy and boost self-esteem. Citrine is also associated with manifesting wealth and prosperity, making it a powerful tool for attracting success and personal growth.',
    horoscope: 'Leo, Aries, Libra, Sagittarius, Gemini',
    name: 'Citrine',
    image: require('../../assets/images/Minerals/citrine.png'),
  },
  {
    chakra: 'Heart, Third Eye, Throat',
    desc: 'Known for enhancing concentration, intellectual clarity, and spiritual protection. This crystal aids in focusing the mind, improving mental clarity, and organizing thoughts. Fluorite also provides a protective shield against negative energies and environmental stress, supporting both mental and spiritual well-being.',
    horoscope: 'Pisces, Capricorn',
    name: 'Fluorite',
    image: require('../../assets/images/Minerals/fluorite.png'),
  },
  {
    chakra: 'Root',
    desc: 'Known for grounding, boosting physical energy, and providing protection. Hematite helps anchor and stabilize your energy, enhancing your connection to the present moment. It also increases vitality and physical strength while offering a protective shield against negative influences and stress.',
    horoscope: 'Aries, Aquarius',
    name: 'Hematite',
    image: require('../../assets/images/Minerals/hematite.png'),
  },
  {
    chakra: 'Heart',
    desc: 'Green jade is a prized stone known for its calming and balancing properties. It brings its wearer peace and harmony, relieves stress and anxiety, and promotes emotional balance. Jade also attracts wealth and luck, while offering protection from negative energies. It promotes spiritual growth and supports meditative practices, helping to connect with higher levels of consciousness.',
    horoscope: 'Libra, Gemini',
    name: 'Jade',
    image: require('../../assets/images/Minerals/jade.png'),
  },
  {
    chakra: 'Third Eye',
    desc: 'Renowned for protection and enhancing intuition. This mystical stone shields against negative energies and strengthens the aura. Labradorite also heightens intuitive abilities and spiritual insight, helping to unlock inner wisdom and connect with higher consciousness.',
    horoscope: 'Leo, Scorpio, Sagittarius',
    name: 'Labradorite',
    image: require('../../assets/images/Minerals/labradorite.png'),
  },
  {
    chakra: 'Heart Chakra, Third Eye',
    desc: 'Renowned for alleviating anxiety and promoting emotional tranquility. This crystal contains lithium, which is known for its calming effects, helping to soothe stress and balance emotions. Lepidolite supports emotional healing and encourages inner peace, making it a valuable tool for managing anxiety and fostering a sense of calm.',
    horoscope: 'Pisces, Libra',
    name: 'Lepidolite',
    image: require('../../assets/images/Minerals/lepidolite.png'),
  },
  {
    chakra: 'Heart Chakra, Solar Plexus',
    desc: 'Aids in emotional healing and supports the process of transformation. Malachite is a powerful crystal that facilitates emotional recovery and assists in profound life changes. It promotes the release of toxic emotions and encourages facing deeply rooted fears, making it beneficial during periods of transformation and transition.',
    horoscope: 'Scorpio, Capricorn',
    name: 'Malachite',
    image: require('../../assets/images/Minerals/malachite.png'),
  },
  {
    chakra: 'Crown, Third Eye',
    desc: 'A symbol of feminine energy, intuition, and emotional balance. Moonstone enhances inner wisdom and supports emotional calmness, promoting spiritual growth. It deepens sensitivity and understanding of one’s emotions and life cycles.',
    horoscope: 'Cancer',
    name: 'Moonstone',
    image: require('../../assets/images/Minerals/moonstone.png'),
  },
  {
    chakra: 'Root Chakra',
    desc: 'Known for protection, truth-facing, and energy purification. It repels negative energy and shields against harmful influences. Obsidian helps confront hidden truths and emotions, promoting deep emotional cleansing and spiritual growth.',
    horoscope: 'Sagittarius, Scorpion',
    name: 'Obsidian',
    image: require('../../assets/images/Minerals/obsidian.png'),
  },
  {
    chakra: 'Root Chakra',
    desc: 'A stone of power, protection, and self-confidence. Onyx enhances inner strength, offering protection from negative energies and helping maintain mental balance during stress. It fosters determination, self-discipline, and the perseverance needed to overcome obstacles.',
    horoscope: 'Leo, Scorpion, Virgo, Capricorn, Libra',
    name: 'Onyx',
    image: require('../../assets/images/Minerals/onyx.png'),
  },
  {
    chakra: 'Root, Sacral',
    desc: 'Known for boosting self-confidence, motivation, and physical energy. This vibrant stone enhances personal strength and encourages a positive mindset, helping to overcome challenges and stay motivated. Yellow Jasper also revitalizes physical energy and supports overall vitality, making it a great ally for maintaining enthusiasm and drive.',
    horoscope: 'Aries, Virgo, Scorpio, Leo',
    name: 'Red Jasper',
    image: require('../../assets/images/Minerals/red_jasper.png'),
  },
  {
    chakra: 'Heart',
    desc: 'Known for love, self-compassion, and emotional healing. This gentle stone promotes unconditional love, fostering deep emotional healing and nurturing self-love. Rose Quartz encourages forgiveness, self-acceptance, and harmonious relationships, making it a powerful ally in healing the heart and enhancing emotional well-being',
    horoscope: 'Taurus',
    name: 'Rose Quartz',
    image: require('../../assets/images/Minerals/rose_quartz.png'),
  },
  {
    chakra: 'Crown',
    desc: 'Known for promoting peace, purification, and strengthening spiritual connection. This calming crystal cleanses negative energy and creates a peaceful environment. Selenite enhances spiritual awareness and helps clear mental and energetic blockages, making it a powerful tool for meditation and connecting with higher realms.',
    horoscope: 'Taurus, Cancer',
    name: 'Selenite',
    image: require('../../assets/images/Minerals/selenite.png'),
  },
  {
    chakra: 'Root, Solar Plexus',
    desc: 'Known for grounding and removing negative energies. This stone helps anchor you to the earth, providing stability and calm. Smoky Quartz is also effective in absorbing and transmuting negative energies, creating a protective shield that promotes emotional balance and clarity.',
    horoscope: 'Sagittarius, Capricorn, Scorpio',
    name: 'Smoky Quartz',
    image: require('../../assets/images/Minerals/smoky_quartz.png'),
  },
  {
    chakra: 'Crown',
    desc: 'Snow quartz, also known as milky quartz, is a translucent white stone that resembles snow in appearance. It is known for its calming and clarifying properties, often used to support meditation and promote spiritual balance.',
    horoscope: 'Capricorn',
    name: 'Snow Quartz',
    image: require('../../assets/images/Minerals/snow_quartz.png'),
  },
];
function Minerals({ navigation }: { navigation: any }) {
  // Directly using static data for rendering buttons
  return (
    <View style={styles.background}>
      <ResponsiveText fontSize={27} style={styles.header}>
        Find
        <ResponsiveText fontSize={27} style={styles.normalFont}>
          {' '}
          a suitable crystal for your mood
        </ResponsiveText>
      </ResponsiveText>
      <Teksti style={styles.stonebox}>
        <ScrollView
          contentContainerStyle={styles.grid}
          removeClippedSubviews={true}
          nestedScrollEnabled={true}
        >
          {data.map((item, index) => (
            <MineralButton
              key={index}
              title={item.name}
              img={item.image} // Passing the local image directly
              onPress={() =>
                navigation.navigate('MineralData', {
                  itemId: item.name,
                  itemImage: item.image,
                  itemDesc: item.desc,
                  itemChakra: item.chakra,
                  itemHoroscope: item.horoscope,
                })
              }
            />
          ))}
        </ScrollView>
      </Teksti>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3F3154',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  stonebox: {
    backgroundColor: 'rgba(145, 137, 152, 0.5)',
    borderColor: '#ACA3AF',
    borderWidth: 4,
    height: '75%',
    width: '90%',
    margin: 15,
  },
  header: {
    fontFamily: 'Kadwa_700Bold',
    color: 'white',
    marginHorizontal: 40,
    marginBottom: 14,
  },
  normalFont: {
    fontFamily: 'Kadwa_400Regular',
  },
});

export default Minerals;
