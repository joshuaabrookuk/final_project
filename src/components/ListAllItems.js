import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ListProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: true,
      search: '',
      list: []
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/items/')
      .then(response => {
        this.setState({ list: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  mySearchHandler = (e) => {
    e.preventDefault();
    this.setState({ search: e.target.value }
    )
  }

  sortByPrice = (e) => {
    e.preventDefault();
    this.toggle()
    var sortedList = []
    if (this.state.toggle) {
      sortedList = this.state.list.sort((product1, product2) => product1.price - product2.price)
    }
    else {
      sortedList = this.state.list.sort((product1, product2) => product2.price - product1.price)
    }
    this.setState({ list: sortedList })
  }

  toggle = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render() {
    return (
      <div>
        <form>
          <div className="row" style={{ marginTop: "20px", padding: "15px" }}>
            <div className="col s6">
              <div className="input-field">
                <input id="search" type="search" required value={this.state.search} onChange={this.mySearchHandler} />
                <label htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </div>
            <div className="col s4" style={{ paddingTop: "25px" }}>
              <button className="btn" type="button" onClick={this.sortByPrice}> sort by price </button>

            </div>
          </div>

        </form>
        <div className="row">
          {this.state.list.filter(item => item.title.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase())).map((item, index) => (
            <div key={index} className="card col s12 m3 hoverable center-align" style={{ height: "230px", marginRight: "10px", cursor: "pointer" }}>
              <div className="card-content">
                <span className="card-title"> {item.title}</span>
                <span>{item.description}</span>
                <p><span><Link to={"/sellers-profile/" + item.businessID} className="teal-text">Sold by <span className="chip white-text teal" style={{ fontWeight: "600" }}>{item.businessName}</span></Link></span></p>
              </div>
              <div className="card-action">
                <span style={{ fontWeight: "600" }}> £{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ListProducts
