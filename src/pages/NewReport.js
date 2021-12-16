import { Container, Header, Form, Image, Button } from "semantic-ui-react";
import React from "react";
import firebase from "../utils/firebase";

function NewReport() {
  const [title, setTitle] = React.useState("");
  const [content, setcontent] = React.useState("");
  const [topics, setTopics] = React.useState([]);
  const [topicsName, setTopicsName] = React.useState("");
  const [file, setFile] = React.useState(null);
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

  return (
    <Container>
      <Header>發表文章</Header>
      <Form>
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
          value={topicsName}
          onChange={(e, { value }) => setTopicsName(value)}
        />
      </Form>
    </Container>
  );
}

export default NewReport;
