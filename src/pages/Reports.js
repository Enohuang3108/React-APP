import React from "react";
import { Grid } from "semantic-ui-react"; /* 分割元件 */
import Topics from "../components/Topics";
import firebase from "../utils/firebase";
function Reports() {
  /* 取出firestore資料 */
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          return docSnapshot.data();
        });
        setPosts(data);
      });
  }, []);
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <Topics />
        </Grid.Column>
        <Grid.Column width={10}>
          {posts.map((post) => {
            return <p>{post.title}</p>;
          })}
        </Grid.Column>
        <Grid.Column width={3}>訓練目標</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
export default Reports;
