import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Grid,
  Container,
  Image,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react";
import Topics from "../components/Topics";
import firebase from "../utils/firebase";
function Report() {
  const { postId } = useParams();
  const [post, setPost] = React.useState({
    author: {},
  });
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .onSnapshot((docSanapshot) => {
        /* 隨時監聽 資料改變重拿一次 */
        const data = docSanapshot.data();
        setPost(data);
      });
    /* .get()
      .then((docSanpshot) => {
        const data = docSanpshot.data();
        setPost(data);
      }); /* doc是抓集合下的某個文件 */
  }, []);

  function toggleCollected() {
    const uid = firebase.auth().currentUser.uid;
    if (isCollected) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    }
  }

  const isCollected = post.collectedBy?.includes(
    firebase.auth().currentUser.uid
  );

  return (
    <Grid.Column width={10}>
      {post.author.photoURL ? (
        <Image src={post.author.photoURL} />
      ) : (
        <Icon name="user circle" />
      )}
      {post.author.displayName || "使用者"}
      <Header>
        {post.title}
        <Header.Subheader>
          {post.topic}‧{post.createdAt?.toDate().toLocaleDateString()}
        </Header.Subheader>
      </Header>
      <Image src={post.imageUrl} />
      <Segment basic vertical>
        {post.content}
      </Segment>
      <Segment basic vertical>
        留言 0 · 讚 0 ·
        <Icon name="thumbs up outline" color="grey" /> ·
        <Icon
          name={`${isCollected ? "bookmark" : "bookmark outline"}`}
          color={isCollected ? "blue" : "grey"}
          link
          onClick={toggleCollected}
        />
      </Segment>
    </Grid.Column>
  );
}

export default Report;
