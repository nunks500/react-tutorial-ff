import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

var data = [{author:'Robert Lewandowski',imageUrl: 'robert.jpg'},
            {author:'Cristiano Ronaldo', imageUrl:'cristiano.jpg'},
            {author:'Milik', imageUrl:'milik.jpg'},
            {author:'Liedson', imageUrl:'liedson.jpg'},
            {author:'Ronaldinho', imageUrl:'ronaldinho.jpg'},
            {author:'Rui Patricio', imageUrl:'rui.jpg'}
        ];


class Quiz extends React.Component {

    constructor(props, context) {      
        super(props, context);
        
       this.state= data.selectGame();
       this.updateb = this.updateb.bind(this);
      };

      updateb=(param)=>{
        this.setState({showContinue: true}, function () {
        this.forceUpdate();
        });
        

      }

        render() {
            return (
        <div>
            <NotificationContainer>
            </NotificationContainer>
            <div className = "row">
                <div className = "col-md-4">
                    <img src={this.state.answer.imageUrl} className="authorimage"/>
                </div>
                <div className="col-md-7">
                    {this.state.books.map(b =>{
                    return (<Book GrandFunRef={this.updateb}  title={b} />);
                    })}
             </div>
             <div className="col-md-1"></div>
        </div>
        <div>
        {this.state.showContinue ? (<div id="but" onClick={() => { window.location.reload();} }>Continue</div>):null}
        </div>
    </div>
      );
    }
}

  class Book extends React.Component{

    constructor(props,context){
        super(props,context);
        
        
    }
    handleclick(){
         data.check(this.props.title);
         
         this.forceUpdate();
         this.props.GrandFunRef();
         //this.props.updateb();
         //this.setState();
         
    }
      render(){

          return (<div onClick={this.handleclick.bind(this)} className="answer"><h4>{this.props.title}</h4></div>
                );
      }
  }
  

  data.selectGame = function(){
    var RandomNumber2 = -99, RandomNumber3 = -99, RandomNumber4 = -99, RandomNumber5 = -99;
    var RandomNumber = Math.floor(Math.random() * data.length) + 1 ;
    
    while(((RandomNumber2 == RandomNumber3 || RandomNumber2 == RandomNumber4 || RandomNumber2 == RandomNumber5 || RandomNumber3 == RandomNumber4 || RandomNumber3 == RandomNumber5 || RandomNumber4 == RandomNumber5) || !(RandomNumber === RandomNumber2 || RandomNumber === RandomNumber3 || RandomNumber === RandomNumber4 || RandomNumber === RandomNumber5)))
    { RandomNumber2 = Math.floor(Math.random() * data.length) + 1 ;
     RandomNumber3 = Math.floor(Math.random() * data.length) + 1 ;
     RandomNumber4 = Math.floor(Math.random() * data.length) + 1 ;
     RandomNumber5 = Math.floor(Math.random() * data.length) + 1 ;
    }
    
    this.state = {
        answer: data[RandomNumber - 1].author,
      };
    return {
            books: [data[RandomNumber2 - 1].author,data[RandomNumber3 - 1].author,data[RandomNumber4 - 1].author,data[RandomNumber5 - 1].author],
            answer: data[RandomNumber - 1]
            }
  };

  data.check = function(title){
      if(title == this.state.answer)
      {      
       NotificationManager.success('Go to next', 'Very Well!');
      }
      else
      NotificationManager.error('You suck dude', 'get rekt');

    }
        

  Quiz.propTypes = {
      books: PropTypes.array.isRequired
  };

  Book.propTypes = {
      title: PropTypes.string.isRequired
  }


  ReactDOM.render(
    <Quiz books={["Robert Lewandowski","Milic","Cristiano Ronaldo","Ronaldinho","Deco","Liedson","Capucho"]} />,
    document.getElementById('app')
  );
