import { Container, Header, Form, Image, Button } from "semantic-ui-react";
import React from "react";
import firebase from "../utils/firebase";
import "firebase/compat/storage";
import { useHistory } from "react-router-dom";
function AddData() {
  const history = useHistory();
  const [snNumber, setSnNumber] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [currnetTrainingType, setCurrnetTrainingType] = React.useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const trainingType = [
    { value: "ISOKINETIC", text: "ISOKINETIC" },
    { value: "ISOTONIC", text: "ISOTONIC" },
    { value: "ISOMTRIC", text: "ISOMTRIC" },
    { value: "ROM", text: "ROM" },
  ];

  // /* -----topics陣列做map型態轉換----- */
  // const options = trainingType.map((topic) => {
  //   return {
  //     text: topic.name,
  //     value: topic.name,
  //   };
  // });
  /* -----透過firebase取得topics資料----- */

  function onSubmit() {
    setIsLoading(true);
    const documentRef = firebase.firestore().collection("trainingData").doc();
    const fileRef = firebase.storage().ref("post-images/" + documentRef.id);

    fileRef.put().then(() => {
      fileRef.getDownloadURL().then(() => {
        documentRef
          .set({
            /* 指定傳入內容 */
            snNumber /* 變數與firebase一致的簡短寫法 */,
            startTime: firebase.firestore.Timestamp.now(),
            trainingType: currnetTrainingType,
            //createdAt: firebase.firestore.Timestamp.now() /* 當下時間 */,
            takesTimes: `${Math.floor(Math.random() * 10)}:${Math.floor(
              Math.random() * 60
            )}`,
            author: {
              /* {}物件對應到firebase的類型 */
              displayName:
                firebase.auth().currentUser.displayName ||
                "" /* currentUser物件底下的displayName欄位 */,
              uid: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email,
            } /* documentRef送出後會將直送到posts集合裡 */,
          })
          .then(() => {
            setIsLoading(false);
            history.push("/"); /* 成功送出後會導到首頁 */
          });
      });
    }); /* 傳送圖片和額外資訊(檔案類型) */
  }

  return (
    <Container>
      <Header>發表文章</Header>
      <Form onSubmit={onSubmit}>
        <Form.Input
          placeholder="輸入snNumber"
          value={snNumber}
          onChange={(e) => setSnNumber(e.target.value)}
        />
        {/* <Form.Input
          placeholder="輸入startTime"
          value={new Date()}
          onChange={(e, { value }) => setStartTime(value)}
        /> */}
        <Form.Dropdown
          placeholder="選擇訓練類型"
          options={trainingType}
          selection
          value={currnetTrainingType}
          onChange={(e, { value }) => setCurrnetTrainingType(value)}
        />
        <Form.Button loading={isloading}>送出</Form.Button>{" "}
        {/* 判斷Button狀態傳給isLoading變數 */}
      </Form>
    </Container>
  );
}

export default AddData;
