import { Container, Header, Form, Image, Button } from "semantic-ui-react";
import React from "react";
import firebase from "../utils/firebase";
import "firebase/compat/storage";
import { useHistory } from "react-router-dom";
function NewReport() {
  const history = useHistory();
  const [title, setTitle] = React.useState("");
  const [content, setcontent] = React.useState("");
  const [topics, setTopics] = React.useState([]);
  const [topicName, setTopicsName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [isloading, setIsLoading] = React.useState(false);
  /* -----透過firebase取得topics資料----- */
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("topics")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setTopics(data);
      });
  }, []);
  /* -----透過firebase取得topics資料----- */

  /* -----topics陣列做map型態轉換----- */
  const options = topics.map((topic) => {
    return {
      text: topic.name,
      value: topic.name,
    };
  });
  /* -----透過firebase取得topics資料----- */

  const previewUrl = file
    ? URL.createObjectURL(file)
    : "https://react.semantic-ui.com/images/wireframe/image.png";

  function onSubmit() {
    setIsLoading(true);
    const documentRef = firebase
      .firestore()
      .collection("posts")
      .doc(); /* 自動新增"post"集合 */ /* doc會呼叫documentRef參考物件 */
    const fileRef = firebase.storage().ref("post-images/" + documentRef.id);
    const metadata = {
      contentType: file.type,
    };
    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        documentRef
          .set({
            /* 指定傳入內容 */
            title /* 變數與firebase一致的簡短寫法 */,
            content,
            topic: topicName /* 將輸入的topicName傳給firebase的topic */,
            createdAt: firebase.firestore.Timestamp.now() /* 當下時間 */,
            author: {
              /* {}物件對應到firebase的類型 */
              displayName:
                firebase.auth().currentUser.displayName ||
                "" /* currentUser物件底下的displayName欄位 */,
              photoURL: firebase.auth().currentUser.photoURL || "",
              uid: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email,
            } /* documentRef送出後會將直送到posts集合裡 */,
            imageUrl,
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
        <Image src={previewUrl} size="small" floated="left" />
        <Button basic as="label" htmlFor="post-image">
          上傳圖片
        </Button>
        <Form.Input
          type="file"
          id="post-image"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Form.Input
          placeholder="輸入報告標題"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.TextArea
          placeholder="輸入報告內容"
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        />
        <Form.Dropdown
          placeholder="選擇報告主題"
          options={options}
          selection
          value={topicName}
          onChange={(e, { value }) => setTopicsName(value)}
        />
        <Form.Button loading={isloading}>送出</Form.Button>{" "}
        {/* 判斷Button狀態傳給isLoading變數 */}
      </Form>
    </Container>
  );
}

export default NewReport;
