export type RootStackParamList = {
  Home: undefined;
  Menu: { givenName?: string; userBirthday?: undefined | null };
  Tarot: undefined;
  Minerals: undefined;
  Horoscope: { userBirthday?: string | null };
  Login: undefined;
  DreamDiary: undefined;
  DreamSymbols: undefined;
  NewDiary: { header: string; text: string; timestamp: string };
  HoroscopeData: { itemId: string; itemImage: any };
  MineralData: { itemId: string; itemImage: string };
  diaryPrevious: undefined;
};
