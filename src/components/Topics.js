import React from "react";
import firebase from "../utils/firebase";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Topics() {
  const [topics, setTopics] = React.useState([]);

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

  return (
    <List animated selection>
      {topics.map((topic) => {
        return (
          <List.Item as={Link} to={topic.path} key={topics.name}>
            {topic.name}
          </List.Item>
        );
      })}
    </List>
  );
}

export default Topics;
