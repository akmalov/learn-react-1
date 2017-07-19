import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'wolfy87-eventemitter';
let ee = new EventEmitter();

let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвёртого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилма чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, нужно прочитать очень длинное лицензионное соглашение'
    }
];

let Article = React.createClass({
    propTypes: {
        last_news: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function(){
        return {
            visible: false
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    render: function() {
       let author = this.props.last_news.author,
           text = this.props.last_news.text,
           bigText = this.props.last_news.bigText,
           visible = this.state.visible;

       return (
           <div className='article'>
               <p className='news__author'>{author}:</p>
               <p className='news__text'>{text}</p>
               <a href="#"
                  onClick={this.readmoreClick}
                  className={'news__readmore ' + (visible ? 'hidden': '')}>
                  Подробнее
               </a>
               <p className={'news__big-text ' + (visible ? '': 'hidden')}>{bigText}</p>
           </div>
       )
   }
});

let News = React.createClass({
    propTypes: {
      last_news: React.PropTypes.array.isRequired
    },

    render: function() {
        let last_news = this.props.last_news;
        let newsTemplate;

        if (last_news.length > 0) {
            newsTemplate = last_news.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article last_news={item} />
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет.</p>
        }

        return (
            <div className='news'>
                {newsTemplate}
                <strong
                    className={'news__count' + (last_news.length > 0 ? '' : 'hidden')}>
                    Всего новостей: {last_news.length}
                    </strong>
            </div>
        );
    }
});

let Add = React.createClass({
    getInitialState: function() {
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function(e) {
        e.preventDefault();
        let textEl = ReactDOM.findDOMNode(this.refs.text);

        let author = ReactDOM.findDOMNode(this.refs.author).value;
        let text = textEl.value;

        let item = [{
            author: author,
            text: text,
            bigText: '...'
        }];

        ee.emit('News.add', item);

        textEl.value = '';
        this.setState({textIsEmpty: true})
    },
    onCheckRuleClick: function(e) {
      this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },
    onFieldChange: function(fieldName, e) {
      if (e.target.value.trim().length > 0) {
          this.setState({['' + fieldName]:false})
      }  else {
          this.setState({['' + fieldName]:true})
      }
    },
    render: function() {
        let agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
        return (
           <form className='add cf'>
               <input
                   type='text'
                   className='add__author'
                   onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                   placeholder='Ваше имя'
                   ref='author'
               />
               <textarea
                   className='add__text'
                   onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                   placeholder='Текст новости'
                   ref='text'
               />
               <label className='add__checkrule'>
                   <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
               </label>
               <button
                   className='add__btn'
                   onClick={this.onBtnClickHandler}
                   ref='alert_button'
                   disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>
                   Добавить новость
               </button>
           </form>
       )
   }
});

let App = React.createClass({
    getInitialState: function() {
      return {
          news: my_news
      };
    },
    componentDidMount: function() {
        let self = this;
        ee.addListener('News.add', function(item) {
            let nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });
    },
    componentWillUnmount: function() {
        ee.removeListener('News.add');
    },
    render: function() {
        return (
            <div className='app'>
                <Add/>
                <h3>Новости</h3>
                <News last_news={this.state.news} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);