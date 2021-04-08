import logo from './logo.svg';
import './App.css';
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Search from "./components/Search"
import UserCard from "./components/UserCard"
import RepoCard from "./components/RepoCard"

class App extends React.Component{
  constructor(){
    super();
    this.state={
      user:null,
      loading:null,
      repos:[]
    }
  }
  fetchUserRepo=async (user)=>{
    try {
      let res=await fetch(`https://api.github.com/users/${user}/repos?page=1`);
      if(res.ok){
        res=await res.json();
        this.setState({
          repos:res,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  fetchUserData=async (user)=>{
    try {
      let res=await fetch(`https://api.github.com/users/${user}`);
      if(res.ok){
        res=await res.json();
        this.setState({
          user:res,
        });
      }else{
        alert("Invalid Username!");
      }
    } catch (error) {
      console.log(error);
    }

  }
  fetchData=async (username)=>{
    try {
      this.setState({
        loading:true
      })
      await this.fetchUserRepo(username);
      await this.fetchUserData(username);
      this.setState({
        loading:false
      })
    } catch (err) {
      console.log(err);
      this.setState({
        loading:false
      })
    }
  }
  render(){
    let repos = this.state.repos;
    return (
      <div>
        <Search fetchUserData={this.fetchData}/>
        <div className="outer my-2">
          <div>{this.state.loading&&<p>
                          <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden"></span>
                          </div>
                                   </p>}
          </div>
          <div>{this.state.user&&<UserCard user={this.state.user}/>}</div>
        </div>
        <div className="repo-outer mx-2">
          {
            repos.map((repo,ind)=>{
              return (<RepoCard repo={repo} key={ind}/>)
            })
          }
        </div>

      </div>
    );
  }
}

export default App;
