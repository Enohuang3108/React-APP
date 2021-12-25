import React from "react";
import firebase from "../utils/firebase";
import { List } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
function Topics() {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const currentTopic = urlSearchParams.get("topic");
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
          <List.Item
            key={topic.name}
            as={Link}
            to={`/posts?topic=${topic.name}`}
            active={currentTopic === topic.name}
          >
            {topic.name}
          </List.Item>
        );
      })}
    </List>
  );
}

export default Topics;
