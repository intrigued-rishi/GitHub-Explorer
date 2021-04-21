import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "../Search.css"
import {withRouter} from 'react-router-dom';


class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:props.username,
        }
        this.myRef=React.createRef();
    }
    componentDidMount(){
      if(this.state.username!=null){
        this.props.fetchUserData(this.state.username)
      }
    }
    takeEvent=(e)=>{
        //e.preventDefault();
        let val = this.myRef.current.value;
        this.setState({
            username:val
        });
        //this.props.fetchUserData(val);
        this.props.history.push('/'+val);
    }
    render(){
        return (
          <div>
                  <nav className="navbar navbar-light bg-light navMod">
                    <div className="container-fluid d-flex justify-content-between">
                      <div className="col-6"><big>GitHub</big> Explorer</div>
                      <form className="d-flex col-3">
                        <input className="form-control" type="search" placeholder={this.state.username||("Search")} aria-label="Search" ref={this.myRef}></input>
                        <button type="button" className="btn btn-success" onClick={this.takeEvent}>Search</button>
                      </form>
                    </div>
                 </nav>
          </div>
        );
      }
}

export default withRouter(Search);