function Container({ props }) {
  return (
    <div>
      <h1>Head</h1>
      <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div>foot</div>
    </div>
  );
}

function App() {
  return (
    <Container onClick={(e) => console.log(e)}>
      <div>outside</div>
      <div>
        <span>outside-1</span>
      </div>
    </Container>
  );
}
