import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "../Search.css"


class Search extends React.Component{
    constructor(){
        super();
        this.state={
            username:null,
        }
        this.myRef=React.createRef();
    }
    takeEvent=(e)=>{
        //e.preventDefault();
        let val = this.myRef.current.value;
        this.setState({
            username:val
        });
        this.props.fetchUserData(val);
    }
    render(){
        return (
          <div>
                  <nav className="navbar navbar-light bg-light navMod">
                    <div className="container-fluid d-flex justify-content-between">
                      <div className="col-6"><big>GitHub</big> Explorer</div>
                      <form className="d-flex col-3">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" ref={this.myRef}></input>
                        <button type="button" className="btn btn-success" onClick={this.takeEvent}>Search</button>
                      </form>
                    </div>
                 </nav>
          </div>
        );
      }
}

export default Search;