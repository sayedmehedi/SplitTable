import React from "react";
import styles from "../styles";
import Button from "@components/Button";
import {Controller, useForm} from "react-hook-form";
import Entypo from "react-native-vector-icons/Entypo";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";

export default function AccountSettingsModal({
  open,
  title,
  subtitle,
  onClose,
  onSuccess,
  inputs = [],
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  onSuccess?: () => void;
  inputs: Array<TextInputProps & {name: string; error?: string}>;
}) {
  const {setValue, control, handleSubmit} = useForm();

  React.useEffect(() => {
    inputs.forEach(input => {
      if (input.value) {
        setValue(input.name, input.value);
      }
    });
  }, [inputs]);

  const handleUpdate = handleSubmit(() => {});

  return (
    <Modal
      visible={open}
      transparent={true}
      animationType={"slide"}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{alignSelf: "flex-end", marginRight: 20, marginBottom: 20}}
            onPress={onClose}>
            <Entypo name="cross" size={30} color={"#023047"} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 16,
              //color: theme.colors.text,
              fontFamily: "Satoshi-Regular",
            }}>
            {title}
          </Text>

          {!!subtitle && (
            <Text
              style={{
                fontSize: 13,
                marginTop: 15,
                maxWidth: "70%",
                textAlign: "center",
                // color: theme.colors.text,
                // fontFamily: 'Inter-Regular',
              }}>
              {subtitle}
            </Text>
          )}

          {inputs.map((input, i) => (
            <Controller
              key={i}
              control={control}
              name={input.name}
              render={({field}) => {
                return (
                  <TextInput
                    value={field.value}
                    style={styles.modalInput}
                    onChangeText={field.onChange}
                    placeholder={input.placeholder ?? ""}
                  />
                );
              }}
            />
          ))}

          <Button
            width={290}
            color={"primary"}
            variant={"solid"}
            title={"Update"}
          />
        </View>
      </View>
    </Modal>
  );
}
