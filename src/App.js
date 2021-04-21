import logo from './logo.svg';
import './App.css';
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Search from "./components/Search"
import UserCard from "./components/UserCard"
import RepoCard from "./components/RepoCard"
import NoOne from "./components/NoOne"
import $ from 'jquery'
import {Route,Switch,Link} from 'react-router-dom';

let PAGE_SIZE=9;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:null,
      loading:null,
      repos:[],
      page:1
    }
  }
  componentDidMount(){
    
  }

  componentWillUnount(){
    
  }

  fetchUserRepo=async (user)=>{
    let currpage = this.state.page;
    try {
      let res=await fetch(`https://api.github.com/users/${user}/repos?page=${currpage}&per_page=${PAGE_SIZE}`);
      if(res.ok){
        res=await res.json();
        this.setState({
          repos:res,
          page:currpage+1
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
      await this.setState({
        page:1
      });
      this.setState({
        loading:true
      })
      await this.fetchUserData(username);
      await this.fetchUserRepo(username);
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
  loadMore=async ()=>{
    let user = this.state.user.login;
    let currpage = this.state.page;
    try {
      let res=await fetch(`https://api.github.com/users/${user}/repos?page=${currpage}&per_page=${PAGE_SIZE}`);
      if(res.ok){
        res=await res.json();
        this.setState((state)=>{
          state.repos.push(...res);
          return {
            repos:state.repos,
            page:state.page+1
          }

        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render(){
    let repos = this.state.repos;
    let hasNext=false;
    let {match,history}=this.props.urldata; 
    if(this.state.user){
        hasNext=(PAGE_SIZE*(this.state.page-1))<this.state.user.public_repos;
    }
    return (
          <div>
            
          <Search fetchUserData={this.fetchData} username={match.params.username} history={history}/>
          <div className="outer my-2">
            <div>{this.state.loading&&<p>
                            <div className="spinner-border text-success" role="status">
                              <span className="visually-hidden"></span>
                            </div>
                                    </p>}
            </div>
            {!(this.state.user)&&<NoOne/>}
            <div>{this.state.user&&<UserCard user={this.state.user}/>}</div>
          </div>
          <div className="repo-outer mx-2">
            {
              repos.map((repo,ind)=>{
                return (<RepoCard repo={repo} key={repo.id}/>)
              })
            }
          </div>
          
          {
            this.state.user&&hasNext&&
            (
              <div className="text-center">
                <button className="btn btn-info " onClick={this.loadMore}>Load More</button>
              </div>
            )
          }
          
        </div>
    );
  }
}

export default App;
