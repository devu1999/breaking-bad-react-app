import React, { Component, useCallback } from "react";
import Table from 'react-bootstrap/Table';
import xtypes from 'xtypejs';

class Character extends Component{
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            img_src: '',
            quotes: []
        };
      }
    
    componentDidMount () {
          const apiUrl = `https://www.breakingbadapi.com/api/characters/${this.props.location.state.id}`
            fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => this.setState({details: data, img_src: data[0].img
          }));
          const author = this.props.location.state.name.replace(/ /g, '+');
          const apiUrl2 = `https://www.breakingbadapi.com/api/quote?author=${author}`
          fetch(apiUrl2)
          .then((response) => response.json())
          .then((data) => this.setState({quotes: data,
          }));
    }

    generateData = (data) => {
        const newData = Object.keys(data).reduce((result, currentKey) => {
          if (typeof data[currentKey] === 'string' || data[currentKey] instanceof String) {
            result.push(currentKey);
          } else {
            const nested = this.generateData(data[currentKey]);
            result.push(...nested);
          }
          return result;
        }, []);
        return newData;
    };

    renderImage = () => {
        const newItems = this.state.details
        var data = newItems[0]
        var img_scr 
        for (var key in data) 
        { if (!data.hasOwnProperty(key))
            { continue; } 
            if(key == "img")
                img_scr = data[key]
        }
        console.log(img_scr)
        return (
            <div class="text-center">
            <img src={`${img_scr}`} class="img-fluid" alt="..."/>
            </div>
            );
    }

    renderSeasons = () => {
        const newItems = this.state.details
        var data = newItems[0]
        var seasons
        for (var key in data) 
        { if (!data.hasOwnProperty(key))
            { continue; } 
            if(key == "appearance")
                seasons = data[key]
        }
        console.log(xtypes(seasons))
        return (
            <div>
            {newItems.map((item) => (
                    <div class="list-group list-group-horizontal-xl align-items-center">
                    {item.appearance.map((x) => <li class="list-group-item list-group-item-dark text-center flex-fill ">{x}</li>)}
                    </div>
                ))}
            </div>
            
        );
    }

    renderItems = () => {
        const newItems = this.state.details
        var len
        for (var key in newItems) 
        { if (!newItems.hasOwnProperty(key))
            { continue; } 
            if(key == "appearance")
                len = newItems[key].length
        }
        console.log(len)
        return (
            <Table responsive striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>OCCUPATION</th>
                <th>DATE OF BIRTH</th>
                <th>STATUS</th>
                <th>NICKNAME</th>
                <th>ACTOR NAME</th>
                </tr>
            </thead>
            <tbody>
                {newItems.map((item) => (
                    <tr>
                    <td>{item.occupation}</td>
                    <td>{item.birthday}</td>
                    <td>{item.status}</td>
                    <td>{item.nickname}</td>
                    <td>{item.portrayed}</td>
                    </tr>
                ))}
            </tbody>
            </Table>
        );
        };
    
    renderQuotes = () => {
        const newItems = this.state.quotes
        return (
            <Table responsive striped bordered hover variant="dark">
            <tbody>
                {newItems.map((item) => (
                    <tr>
                    <td class="text-center">{item.quote}</td>
                    </tr>
                ))}
            </tbody>
            </Table>
        );
    };

    render() {
        return (
            <main className="content">
            <h1 className="text-white text-uppercase text-center my-4">{this.props.location.state.name}</h1>
            <div className="row ">
              <div className="col-md-6 col-sm-10 mx-auto p-0 align-items-center">
              <div className="align-items-center">
                    {this.renderImage()}
                </div>
                <div className="card p-3">
                    <ul className="list-group list-group-flush">
                    {this.renderItems()}
                    </ul>
                    <h2 className="text-black text-uppercase text-center my-4">Seasons</h2>
                    {this.renderSeasons()}
                    <h2 className="text-black text-uppercase text-center my-4">Quotes</h2>
                    {this.renderQuotes()}
                </div>
              </div>
            </div>
          </main>
        );
    }
}

export default Character;