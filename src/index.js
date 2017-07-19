import React from 'react';
import ReactDOM from 'react-dom';

let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвёртого числа...'
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

let News = React.createClass({
    render: function() {
        let last_news = this.props.last_news;
        let newsTemplate = last_news.map(function(item, index) {
            return (
                <div key={index}>
                    <p className="news__author">{item.author}:</p>
                    <p className="news__text">{item.text}</p>
                </div>
            )
        });
        return (
            <div className="news">
                {newsTemplate}
            </div>
        );
    }
});

let Comments = React.createClass({
    render: function() {
        return (
            <div className="comments">
                Нет новостей - комментировать нечего.
            </div>
        );
    }
});

let App = React.createClass({
    render: function() {
        return (
            <div className="app">
                Отображение новостей
                <News last_news={my_news} />
                <Comments />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);