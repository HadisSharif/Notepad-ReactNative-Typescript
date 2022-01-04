import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {RootState} from '../../app/store';
import styled from 'styled-components';
import {RouteProp, useRoute} from '@react-navigation/core';
import {NoteMode} from '../../common/utils/Enums';
import {
  getSelectedNote,
  getNotesCollection,
} from '../../app/firebase/FirestoreApi';
import Navigate from '../../app/navigation/Navigate';
import {RoundIcons} from '../../common/RoundIcons';
import TrashBin from '../../common/assets/images/trashbinicon.png';
import Tick from '../../common/assets/images/tickicon.png';
import {MyTextInput, RowContainer} from '../../common/utils/Styles';
import {Sizes} from '../../common/utils/Sizeing';

type NoteProps = {
  params: {
    mode: string;
    noteId: string;
  };
};

export const SingleNotePage = () => {
  const userGoogleData = useSelector(
    (state: RootState) => state.userGoogleData.items,
  );

  const route = useRoute<RouteProp<NoteProps>>();
  const noteProps = route.params;

  const currentTheme = useSelector((state: RootState) => state.theme.themeType);

  const mode: string = noteProps.mode != null ? noteProps.mode : NoteMode.NEW;
  const noteId: string = noteProps != null ? noteProps.noteId : '';

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [timeDate, setTimeDate] = useState<string>('');
  const isDeleteVisible: boolean = mode == NoteMode.EDIT ? true : false;

  useEffect(() => {
    getTimeDate();
    if (mode == NoteMode.EDIT) getNoteById();
  }, []);

  const getNoteById = async () => {
    getSelectedNote(userGoogleData.email, noteId)
      .get()
      .then(doc => {
        let noteData = doc.data();
        setTitle(noteData?.title);
        setBody(noteData?.body);
        setTimeDate(noteData?.timeDate);
      })
      .catch(error => console.error(error));
  };

  const getCurrentTimeDate = () => {
    return new Date().toLocaleString();
  };

  const getTimeDate = () => {
    mode != NoteMode.EDIT
      ? setTimeDate(getCurrentTimeDate())
      : setTimeDate(timeDate);
  };

  const noteData = () => {
    return {
      title: title,
      body: body,
      timeDate: getCurrentTimeDate(),
    };
  };

  const addNote = async () => {
    getNotesCollection(userGoogleData.email)
      .add(noteData())
      .then(() => {
        console.log('Note added!');
      })
      .catch(error => console.error(error));

    Navigate.goBack();
  };

  const deleteSelectedNote = async () => {
    getSelectedNote(userGoogleData.email, noteId)
      .delete()
      .then(() => {
        console.log('Note deleted!');
      })
      .catch(error => console.error(error));

    Navigate.goBack();
  };

  const updateNote = () => {
    getSelectedNote(userGoogleData.email, noteId)
      .update(noteData())
      .then(() => {
        console.log('Note updated!');
      })
      .catch(error => console.error(error));

    Navigate.goBack();
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}>
        <Contanier>
          <TitleTextInput
            color={currentTheme.text_color}
            onChangeText={(text: React.SetStateAction<string>) => {
              setTitle(text);
            }}
            value={title}
          />
          <TimeDate>{timeDate}</TimeDate>
          <BodyTextInput
            color={currentTheme.text_color}
            multiline={true}
            onChangeText={(text: React.SetStateAction<string>) => {
              setBody(text);
            }}
            textAlignVertical="top"
            underlineColorAndroid="transparent"
            value={body}
          />
          <ButtonContainer>
            {isDeleteVisible && (
              <RoundIcons
                icon={TrashBin}
                onIconPressed={() => deleteSelectedNote()}
              />
            )}
            <RoundIcons
              icon={Tick}
              onIconPressed={() =>
                mode == NoteMode.NEW ? addNote() : updateNote()
              }
            />
          </ButtonContainer>
        </Contanier>
      </ScrollView>
    </ThemeProvider>
  );
};

const Contanier = styled.View`
  flex: 1;
  background-color: ${(props: {theme: {bg_color: string}}) =>
    props.theme.bg_color};
`;

const TitleTextInput = styled(MyTextInput)`
  height: ${Sizes.x40};
  margin-top: ${Sizes.x10};
  font-weight: bold;
`;

const TimeDate = styled.Text`
  text-align: right;
  margin: ${Sizes.x20};
`;

const BodyTextInput = styled(MyTextInput)`
  min-height: ${Sizes.x250};
`;

const ButtonContainer = styled(RowContainer)`
  justify-content: center;
  margin: ${Sizes.x10};
`;

export default SingleNotePage;
