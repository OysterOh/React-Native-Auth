import { Alert, StyleSheet, View } from "react-native";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import FlatButton from "../ui/FlatButton";
import { useNavigation } from "@react-navigation/native";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, name, password, confirmPassword } = credentials;
    console.log("submitHandler email: ", email);

    email = email.trim();
    password = password.trim();
    const nameRegex = /^[가-힣]{2,4}$/;

    const emailIsValid = email.includes("@");
    const nameIsValid = nameRegex.test(name);
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!nameIsValid || !passwordsAreEqual))
    ) {
      Alert.alert(
        "유효하지 않은 입력값이 있습니다. 확인 후 다시 입력해 주세요."
      );
      setCredentialsInvalid({
        email: !emailIsValid,
        name: !nameIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    onAuthenticate({ email, password, name });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid} //사용자 입력값 유효성 검사
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "회원 가입" : "로그인 화면으로 이동"}
        </FlatButton>
      </View>
    </View>
  );
};

export default AuthContent;
const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    martinTop: 8,
  },
});
