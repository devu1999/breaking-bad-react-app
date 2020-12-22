import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from "react-router-dom";

    const todoItems = [
      {
      }
    ];

    class Home extends Component {
      constructor(props) {
        super(props);
        this.state = {
          todoList: todoItems,
          _pageSize: 10,
          _pageNum:1,
        };
      }

      renderItems = () => {
        const newItems = this.state.todoList
        return (
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>NAME</th>
                <th>OCCUPATION</th>
                <th>DATE OF BIRTH</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {newItems.map((item) => (
                //  <tr onClick={(e) => this.addFavorite(item)}>
                  <tr>
                  <td><Link to={{
                      pathname: '/Character',
                      state: {
                          name: item.name,
                          id: item.char_id
                      }
                      }}>{item.name}</Link></td>
                  <td>{item.occupation}</td>
                  <td>{item.birthday}</td>
                  <td>{item.status}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
        );
      };

      

      componentDidMount () {
        const index = (this.state._pageNum - 1 )*10
        const apiUrl = `https://www.breakingbadapi.com/api/characters?q=&offset=${index}&limit=${this.state._pageSize}`
          fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => this.setState({todoList: data,
        }));
      }

      handleChange = (e) => {
        const apiUrl = `https://www.breakingbadapi.com/api/characters?name=${e.target.value}&offset=0&limit=${this.state._pageSize}`
        fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({todoList: data}));
      }

      changePage = (number) => {
        this.setState({_pageNum: number}, () => {
          const index = (this.state._pageNum - 1 )*10
          const apiUrl = `https://www.breakingbadapi.com/api/characters?q=&offset=${index}&limit=${this.state._pageSize}`
            fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => this.setState({todoList: data,
          }));
        })
      }

      renderPagination = () => {
        let items = [];
        for (let number = 1; number <= 7; number++) {
          items.push(
            <Pagination.Item key={number} active={number === this.state._pageNum} onClick={(e) => this.changePage(number)}>
              {number} 
            </Pagination.Item>,
          );
        }

        const paginationBasic = (
          <div>
            <Pagination size="lg">{items}</Pagination>
            <br />
          </div>
        );

        return(paginationBasic);
      };
      
      
      render() {
        return (
          <main className="content">
            <h1 className="text-white text-uppercase text-center my-4">Breaking Bad Characters</h1>
            <div className="row ">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <input placeholder="Search by Character Name" onChange={(e) => {this.handleChange(e)}} />
                  <ul className="list-group list-group-flush">
                    {this.renderItems()}
                  </ul>
                </div>
                <div class="d-flex justify-content-center">{this.renderPagination()}</div>
              </div>
            </div>
          </main>
          
        );
      }
    }
    export default Home;