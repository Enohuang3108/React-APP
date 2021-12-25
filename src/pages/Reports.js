import React from "react";
import { Item, Image, Icon, Divider } from "semantic-ui-react"; /* 分割元件 */
import { Waypoint } from "react-waypoint";
import { Link } from "react-router-dom";
// import Topics from "../components/Topics";
import firebase from "../utils/firebase";
import { useLocation } from "react-router-dom";

function Reports() {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const currentTopic = urlSearchParams.get("topic");
  const lastPostSnapshotRef = React.useRef(); /* 取得目前最下面的快照 */
  /* 取出firestore資料 */
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    if (currentTopic) {
      firebase
        .firestore()
        .collection("posts")
        .where("topic", "==", currentTopic) /* 篩選類別 */
        .orderBy("createdAt", "desc") /* 依時間降冪排列(最新在前) */
        .limit(2)
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return {
              ...docSnapshot.data(),
              id,
            }; /* 解構return docSnapshot.data(); 將資料跟id合併 */
          });
          /* 抓最新文章的第二篇 */
          lastPostSnapshotRef.current =
            collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
          setPosts(data); /* 抓最新文章的第二篇 */
        });
    } else {
      firebase
        .firestore()
        .collection("posts")
        .orderBy("createdAt", "desc") /* 依時間降冪排列(最新在前) */
        .limit(2) /* 限制顯示兩篇 */
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return {
              ...docSnapshot.data(),
              id,
            }; /* 解構return docSnapshot.data(); 將資料跟id合併 */
          });
          lastPostSnapshotRef.current =
            collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
          setPosts(data);
        });
    }
  }, [currentTopic]);
  return (
    <>
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
                    <Image src={post.author.photoURL} avatar />
                  ) : (
                    <Icon name="user circle" />
                  )}{" "}
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
      <Waypoint
        //  偵測網頁滑到底
        onEnter={() => {
          if (lastPostSnapshotRef.current) {
            if (currentTopic) {
              firebase
                .firestore()
                .collection("posts")
                .where("topic", "==", currentTopic) /* 篩選類別 */
                .orderBy("createdAt", "desc") /* 依時間降冪排列(最新在前) */
                .startAfter(lastPostSnapshotRef.current)
                .limit(2)
                .get()
                .then((collectionSnapshot) => {
                  const data = collectionSnapshot.docs.map((docSnapshot) => {
                    const id = docSnapshot.id;
                    return {
                      ...docSnapshot.data(),
                      id,
                    }; /* 解構return docSnapshot.data(); 將資料跟id合併 */
                  });
                  lastPostSnapshotRef.current =
                    collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                  setPosts([...posts, ...data]);
                });
            } else {
              firebase
                .firestore()
                .collection("posts")
                .orderBy("createdAt", "desc") /* 依時間降冪排列(最新在前) */
                .startAfter(lastPostSnapshotRef.current)
                .limit(2) /* 限制顯示兩篇 */
                .get()
                .then((collectionSnapshot) => {
                  const data = collectionSnapshot.docs.map((docSnapshot) => {
                    const id = docSnapshot.id;
                    return {
                      ...docSnapshot.data(),
                      id,
                    }; /* 解構return docSnapshot.data(); 將資料跟id合併 */
                  });
                  lastPostSnapshotRef.current =
                    collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                  setPosts([...posts, ...data]); /* 解構原posts加上解構新增的 */
                });
            }
          }
        }}
      />
    </>
  );
}
export default Reports;
