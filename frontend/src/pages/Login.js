import {React , useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col } from "react-bootstrap";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const HandleLogin = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:8081/signin",
          { email, password }
        );
  
        localStorage.setItem("token", data.token);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
        <Container>
    <Row>
        <Col id="cols">
            <Form autoComplete="on">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}} placeholder="Password" />
      </Form.Group>
      <Button  style={{backgroundColor:"blue"}} type="submit"onClick={HandleLogin}>Login</Button>
      <p style={{paddingTop: "20px"}}>Don't have Account?<Link style={{textDecoration: "none", backgroundColor:"black", color: "white", padding: "10px", borderRadius: "6px"}}id="butt" to="/">Register</Link> </p>
      
    
    </Form>
    </Col>
    </Row>
    </Container>
    </div>
  )
}

export default Login;