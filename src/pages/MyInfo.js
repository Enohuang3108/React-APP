import {
  Header,
  Button,
  Segment,
  Modal,
  Input,
  Image,
} from "semantic-ui-react";
import firebase from "../utils/firebase";
import React from "react";

function MyName(user) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [displayName, setDisplayName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  function onSubmit() {
    setIsLoading(true);
    user
      .updateProfile({
        displayName,
      })
      .then((userRecord) => {
        setIsLoading(false);
        setDisplayName("");
        setIsModalOpen(false);
        console.log("Success update user", userRecord.toJSON());
      })
      .catch((error) => {
        console.log("Error updating user:", error);
      });
  }

  return (
    <>
      <Header size="small">
        使用者名稱
        <Button floated="right" onClick={() => setIsModalOpen(true)}>
          修改
        </Button>
      </Header>
      <Segment vertical>{user.displayName}</Segment>
      <Modal open={isModalOpen} size="mini">
        <Modal.Header>修改使用者名稱</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            placeholder="輸入新的使用者名稱"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsModalOpen(false)}>取消</Button>
          <Button onClick={onSubmit} loading={isLoading}>
            修改
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

function MyPhoto(user) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const previewImageUrl = file ? URL.createObjectURL(file) : user.photoURL;
  const [isLoading, setIsLoading] = React.useState(false);

  function onSubmit() {
    setIsLoading(true);
    const fileRef = firebase.storage().ref("user-photos/" + user.uid);
    const metadata = {
      contentType: file.type,
    };
    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        user
          .updateProfile({
            photoURL: imageUrl,
          })
          .then(() => {
            setFile(null);
            setIsModalOpen(false);
            setIsLoading(false);
          });
      });
    });
  }

  return (
    <>
      <Header size="small">
        會員照片
        <Button floated="right" onClick={() => setIsModalOpen(true)}>
          修改
        </Button>
      </Header>
      <Segment vertical>
        <Image
          src={user.photoURL}
          style={{ borderRadius: 2000 }}
          size="medium"
        />
      </Segment>
      <Modal open={isModalOpen} size="mini">
        <Modal.Header>修改使用者照片</Modal.Header>
        <Modal.Content image>
          <Image src={previewImageUrl} avatar wrapped />
          <Modal.Description>
            <Button as="label" htmlFor="post-image">
              上傳
            </Button>
            <Input
              type="file"
              id="post-image"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsModalOpen(false)}>取消</Button>
          <Button onClick={onSubmit} loading={isLoading}>
            修改
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

function MyInfo() {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return (
    <>
      <Header>個人資料</Header>
      <MyName user={user} />
      <MyPhoto user={user} />
      <Header size="small">
        使用者密碼
        <Button floated="right">修改</Button>
      </Header>
      <Segment vertical>*****</Segment>
    </>
  );
}
export default MyInfo;
