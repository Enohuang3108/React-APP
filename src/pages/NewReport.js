import { Container, Header, Form } from "semantic-ui-react";
function NewReport() {
  return (
    <Container>
      <Header>發表文章</Header>
      <Form>
        <Form.Input placeholder="輸入報告標題" />
      </Form>
    </Container>
  );
}

export default NewReport;
