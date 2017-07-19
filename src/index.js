import React from 'react';
import ReactDOM from 'react-dom';

let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвёртого числа...',
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
    }
];

let Article = React.createClass({
    propTypes: {
        last_news: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired
        })
    },
    render: function() {
       let author = this.props.last_news.author,
           text = this.props.last_news.text;

       return (
           <div className="article">
               <p className="news__author">{author}:</p>
               <p className="news__text">{text}</p>
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
            });
        } else {
            newsTemplate = <p>К сожалению новостей нет.</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count' + (last_news.length > 0 ? '' : 'none')}>Всего новостей: {last_news.length}</strong>
            </div>
        );
    }
});

let App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <h3>Новости</h3>
                <News last_news={my_news} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);