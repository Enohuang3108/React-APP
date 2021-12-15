import React from "react";
import { Grid } from "semantic-ui-react"; /* 分割元件 */
import Topics from "../components/Topics";
function Reports() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <Topics />
        </Grid.Column>
        <Grid.Column width={10}>報告</Grid.Column>
        <Grid.Column width={3}>評分與建議</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
export default Reports;
