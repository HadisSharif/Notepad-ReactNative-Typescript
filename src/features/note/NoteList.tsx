import React, {useState, useEffect} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {ScreenNames} from '../../common/utils/Strings';
import {ThemeProvider} from 'styled-components/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import styled from 'styled-components';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {getNotesCollection} from '../../app/firebase/FirestoreApi';
import {NoteMode} from '../../common/utils/Enums';
import Navigate from '../../app/navigation/Navigate';
import {BoldText, NormalText} from '../../common/utils/Styles';
import {Sizes} from '../../common/utils/Sizeing';

interface NoteItemProps {
  id: string;
  note: FirebaseFirestoreTypes.DocumentData;
}

const NoteListPage = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.themeType);
  const userGoogleData = useSelector(
    (state: RootState) => state.userGoogleData.items,
  );

  const [noteList, setNoteList] = useState<NoteItemProps[]>();

  useEffect(() => {
    const firebaseSubscriber = getNotesCollection(
      userGoogleData.email,
    ).onSnapshot(snapShot => {
      if (!snapShot.empty) {
        generateNotesList(snapShot);
      }
    });
    return () => firebaseSubscriber();
  }, []);

  const generateNotesList = (
    snapShot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    let list: NoteItemProps[] = [];
    snapShot.docs.forEach(doc => {
      let noteObj: NoteItemProps = {id: doc.id, note: doc.data()};
      list.push(noteObj);
    });
    setNoteList(list);
  };

  const onNotePress = (noteId: string) => {
    Navigate.navigate(ScreenNames.SingleNotePage, {
      noteId,
      mode: NoteMode.EDIT,
    });
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <FlatList
        data={noteList != null ? noteList : []}
        style={{backgroundColor: currentTheme.bg_color}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}: ListRenderItemInfo<NoteItemProps>) => (
          <ListItemContainer onPress={() => onNotePress(item.id)}>
            <BoldText>{item.note.title}</BoldText>
            <NormalText numberOfLines={2}>{item.note.body}</NormalText>
          </ListItemContainer>
        )}
      />
    </ThemeProvider>
  );
};

const ListItemContainer = styled.TouchableOpacity`
  background-color: ${(props: {theme: {card_color: string}}) =>
    props.theme.card_color};
  border-radius: ${Sizes.x20};
  padding: ${Sizes.x10};
  margin: ${Sizes.x5};
`;

export default NoteListPage;
