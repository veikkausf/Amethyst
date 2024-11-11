export type RootStackParamList = {
  Home: undefined;
  Menu: { givenName?: string; userBirthday?: undefined | null };
  Tarot: undefined;
  Minerals: undefined;
  Horoscope: { userBirthday?: string | null };
  Meditate: undefined;
  Login: undefined;
  DreamDiary: undefined;
  DiaryList: undefined;
  DreamSymbols: undefined;
  NewDiary: { header: string; text: string; timestamp: string };
  SymbolData: { itemId: string; itemImage: any };
  HoroscopeData: { itemId: string; itemImage: any };
  MineralData: { itemId: string };
  MeditationData: { itemId: string; itemImage: any };
  diaryPrevious: undefined;
};
