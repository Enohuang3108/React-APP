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
      .get()
      .then((docSanpshot) => {
        const data = docSanpshot.data();
        setPost(data);
      }); /* doc是抓集合下的某個文件 */
  }, []);
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={10}>
            <Image src={post.author.photoURL} />
            {post.author.displayName}
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
              <Icon name="bookmark outline" color="grey" />
            </Segment>
          </Grid.Column>
          <Grid.Column width={3}>訓練目標</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Report;
