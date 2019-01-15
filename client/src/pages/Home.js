import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import CheckBtn from "../components/CheckBtn"
import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import ArchiveBtn from "../components/ArchiveBtn";
import RedoBtn from "../components/RedoBtn";
const newTodoList = [];
const newCompletedList = [];
const newArchivedList = [];

export default class Home extends Component {
  state = {
    todoItem: "",
    todoList: [],
    archivedTodoList: [],
    completedTodoList: []
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    newTodoList.push(this.state.todoItem)
    this.setState({
      todoList: newTodoList,
      todoItem: ""
    })
  };

  handleBook = (id, operator) => {
    switch (operator) {
      case "add":
        newCompletedList.push(newTodoList[id]);
        newTodoList.pop(newTodoList[id]);
        this.setState({
          todoList: newTodoList,
          completedTodoList: newCompletedList
        });
        break;
      case "delete":
        newTodoList.pop(newTodoList[id]);
        this.setState({
          todoList: newTodoList,
          completedTodoList: newCompletedList
        });
        break;
      case "redo":
        newTodoList.push(newCompletedList[id]);
        newCompletedList.pop(newCompletedList[id]);
        this.setState({
          todoList: newTodoList,
          completedTodoList: newCompletedList
        });
        break;
      case "archive":
        newArchivedList.push(newCompletedList[id]);
        newCompletedList.pop(newCompletedList[id]);
        this.setState({
          todoList: newTodoList,
          completedTodoList: newCompletedList
        });
        break;
      default: return null;
    }

  }

  deleteBook = id => {

  }
  render() {
    return (
      <Container>
        <h1 className="text-center">React To Do List!</h1>
        <h2 className="text-center">Enter New Todo</h2>
        <Row>
          <Col size="md-12">
            <form>
              <TextArea
                value={this.state.todoItem}
                onChange={this.handleInputChange}
                name="todoItem"
                placeholder="Enter To Do Here (Unique Entries Please)"
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                New To Do!
              </FormBtn>
            </form>
          </Col>
        </Row>

        <Row>
          <div>
          </div>
          <Col size="md-6">
            <h1>{this.state.todoList.length} Pending To Do's</h1>
            {this.state.todoList.length ? (
              <List>
                {this.state.todoList.map(item => (
                  <ListItem key={this.state.todoList.indexOf(item)}
                    id={this.state.todoList.indexOf(item)} >
                    {item}
                    <CheckBtn onClick={_ => this.handleBook(this.state.todoList.indexOf(item), "add")} />
                    <DeleteBtn onClick={_ => this.handleBook(this.state.todoList.indexOf(item), "delete")} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-6">
            <h1 className="text-right">{this.state.completedTodoList.length} Todo's Done!</h1>
            {this.state.completedTodoList.length ? (
              <List>
                {this.state.completedTodoList.map(item => (
                  <ListItem key={this.state.completedTodoList.indexOf(item)}
                    id={this.state.completedTodoList.indexOf(item)}>
                    {item}
                    <RedoBtn onClick={_ => this.handleBook(this.state.completedTodoList.indexOf(item), "redo")} />
                    <ArchiveBtn onClick={_ => this.handleBook(this.state.completedTodoList.indexOf(item), "archive")} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    )
  }
}