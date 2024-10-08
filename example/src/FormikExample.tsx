import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import { data, groupData } from './data';
import {
  Button,
  MD2Colors as Colors,
  Dialog,
  FAB,
  Paragraph,
  Portal,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { DropdownValidation } from './validation';

type tState = {
  msChipFlat: Array<string | number>;
  msChipOutlined: Array<string | number>;
  sddWoAvatar: string | number;
  sddWAvatar: string | number;
  gddWoAvatar: string | number;
  gddWAvatar: string | number;
};

const FormikExample = () => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<tState>({
    msChipFlat: [],
    msChipOutlined: [],
    sddWoAvatar: '',
    sddWAvatar: '',
    gddWoAvatar: '',
    gddWAvatar: '',
  });
  const hideDialog = () => setVisible(false);
  const { colors } = useTheme();
  return (
    <Formik
      initialValues={{
        msChipFlat: [1],
        msChipOutlined: [12, 2],
        sddWoAvatar: '',
        sddWAvatar: '',
        gddWoAvatar: '1',
        gddWAvatar: '1',
        text: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setVisible(true);
        setState(values);
        setSubmitting(false);
      }}
      validationSchema={DropdownValidation}
      enableReinitialize
    >
      {({ errors, handleSubmit, setFieldValue, values, isSubmitting }) => (
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Dropdown values</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{`msChipFlat: ${state.msChipFlat}`}</Paragraph>
                <Paragraph>{`msChipOutlined: ${state.msChipOutlined}`}</Paragraph>
                <Paragraph>{`sddWoAvatar: ${state.sddWoAvatar}`}</Paragraph>
                <Paragraph>{`sddWAvatar: ${state.sddWAvatar}`}</Paragraph>
                <Paragraph>{`gddWoAvatar: ${state.gddWoAvatar}`}</Paragraph>
                <Paragraph>{`gddWAvatar: ${state.gddWAvatar}`}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
            <FAB
              style={styles.fab}
              icon="send"
              onPress={() => handleSubmit}
              disabled={isSubmitting}
              label="Submit"
            />
          </Portal>
          <View
            style={{
              flexDirection: 'column',
              height: '100%',
              backgroundColor: colors.background,
            }}
          >
            <ScrollView>
              <View style={styles.container}>
                <MultiselectDropdown
                  label="Multi select without avatar chip flat"
                  data={data}
                  primaryColor={Colors.cyan500}
                  enableSearch
                  value={values.msChipFlat}
                  onChange={value => setFieldValue('msChipFlat', value)}
                  chipType="flat"
                  required
                  error={errors.msChipFlat ? true : false}
                  emptySelectionText="No item selected"
                  itemSelectIcon={
                    <Icon
                      name="chess-knight"
                      size={18}
                      color={Colors.amber700}
                    />
                  }
                  mode="outlined"
                />
              </View>
              <View style={styles.container}>
                <MultiselectDropdown
                  label="Multi select with avatar chip outlined"
                  data={data}
                  primaryColor={Colors.tealA700}
                  enableSearch
                  enableAvatar
                  chipType="outlined"
                  value={values.msChipOutlined}
                  onChange={value => setFieldValue('msChipOutlined', value)}
                  required
                  error={errors.msChipOutlined ? true : false}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                  selectedItemsText="Select"
                />
              </View>
              <View style={styles.container}>
                <Dropdown
                  label="Simple dropdown"
                  data={data}
                  primaryColor={Colors.indigoA700}
                  enableSearch
                  value={values.sddWoAvatar}
                  onChange={value => setFieldValue('sddWoAvatar', value)}
                  required
                  mode="outlined"
                  error={errors.sddWoAvatar ? true : false}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                  itemSelectIcon={
                    <Icon
                      name="check-double"
                      size={18}
                      color={Colors.indigoA700}
                    />
                  }
                />
              </View>
              <View style={styles.container}>
                <Dropdown
                  label="Simple dropdown with avatar"
                  data={data}
                  primaryColor={Colors.blueA700}
                  enableSearch
                  enableAvatar
                  value={values.sddWAvatar}
                  onChange={value => setFieldValue('sddWAvatar', value)}
                  required
                  error={errors.sddWAvatar ? true : false}
                  selectedItemViewStyle={{ backgroundColor: colors.backdrop }}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                  disableSelectionTick
                  removeLabel
                  textInputPlaceholder="Simple dropdown with avatar"
                  underlineColor="transparent"
                />
              </View>
              <View style={styles.container}>
                <GroupDropdown
                  label="Group dropdown"
                  data={groupData}
                  headerTextStyle={{
                    color: Colors.tealA700,
                  }}
                  primaryColor={Colors.tealA700}
                  enableSearch
                  value={values.gddWoAvatar}
                  onChange={value => setFieldValue('gddWoAvatar', value)}
                  required
                  error={errors.gddWoAvatar ? true : false}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                />
              </View>
              <View style={styles.container}>
                <GroupDropdown
                  label="Group dropdown with avatar"
                  data={groupData}
                  headerTextStyle={{
                    color: Colors.amberA700,
                  }}
                  primaryColor={Colors.amberA700}
                  enableSearch
                  enableAvatar
                  value={values.gddWAvatar}
                  onChange={value => setFieldValue('gddWAvatar', value)}
                  required
                  error={errors.gddWAvatar ? true : false}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  appBar: { height: 80, backgroundColor: Colors.indigoA700 },
  appBarContent: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbarTitle: { paddingTop: 25 },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.pinkA700,
  },
});

export default FormikExample;
