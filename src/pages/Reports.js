import React from "react";
import {
  Grid,
  Item,
  Image,
  Icon,
  Container,
  Divider,
} from "semantic-ui-react"; /* 分割元件 */
import { Link } from "react-router-dom";
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
          const id = docSnapshot.id;
          return {
            ...docSnapshot.data(),
            id,
          }; /* 解構return docSnapshot.data(); 將資料跟id合併 */
        });
        setPosts(data);
      });
  }, []);
  return (
    <Item.Group>
      {posts.map((post) => {
        return (
          <Item key={post.id} as={Link} to={`/posts/${post.id}`}>
            <Item.Image
              src={
                post.imageUrl ||
                "https://react.semantic-ui.com/images/wireframe/image.png"
              }
            />
            <Item.Content>
              <Item.Meta>
                {post.author.photoURL ? (
                  <Image
                    src={post.author.photoURL}
                    style={{
                      borderRadius: 50,
                    }}
                    size="mini"
                  />
                ) : (
                  <Icon name="user circle" />
                )}
                {post.topic}．{post.author.displayName || "使用者"}
              </Item.Meta>
              <Item.Header>{post.title}</Item.Header>
              <Item.Description>{post.content}</Item.Description>
              <Item.Extra>留言 0．讚 0</Item.Extra>
              <Divider variant="inset" component="li" />
              <div>
                &nbsp;
                <br />
                <br />
              </div>
            </Item.Content>
          </Item>
        );
      })}
    </Item.Group>
  );
}
export default Reports;
