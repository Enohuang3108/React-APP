import {
  Header,
  Button,
  Segment,
  Modal,
  Input,
  Image,
  Form,
} from "semantic-ui-react";
import firebase from "../utils/firebase";
import React from "react";

function MyName({ user }) {
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

function MyPhoto({ user }) {
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
          <Image
            src={previewImageUrl}
            avatar
            style={{ resizeMode: "contain" }}
            size="small"
          />
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

function MyPassword({ user }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMassage, seterrorMessage] = React.useState("");

  function onSubmit() {
    setIsLoading(true);
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user.updatePassword(newPassword).then(() => {
          setIsModalOpen(false);
          setIsLoading(false);
          setOldPassword("");
          setNewPassword("");
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "Failed to load resource":
            seterrorMessage("信箱已存在");
            break;
          case "auth/invalid-email":
            seterrorMessage("信箱格式不正確");
            break;
          case "auth/weak-password":
            seterrorMessage("密碼強度不足");
            break;
          default:
        }
        setIsLoading(false);
      });
  }
  return (
    <>
      <Header size="small">
        使用者密碼
        <Button floated="right" onClick={() => setIsModalOpen(true)}>
          修改
        </Button>
      </Header>
      <Segment vertical>*****</Segment>
      <Modal open={isModalOpen} size="mini">
        <Modal.Header>修改使用者密碼</Modal.Header>
        <Modal.Content>
          <Header size="small">目前密碼</Header>
          <Input
            fluid
            placeholder="輸入舊密碼"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Header size="small">新密碼</Header>
          <Input
            fluid
            placeholder="輸入新密碼"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Form>
            {errorMassage && <Message negative>{errorMassage}</Message>}{" "}
          </Form>
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

function MyInfo({ user }) {
  return (
    <>
      <Header>個人資料</Header>
      <MyName user={user} />
      <MyPhoto user={user} />
      <MyPassword user={user} />
    </>
  );
}
export default MyInfo;
