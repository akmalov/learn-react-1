import React from 'react';
import ReactDOM from 'react-dom';

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
    render: function() {
       let author = this.props.last_news.author,
           text = this.props.last_news.text,
           bigText = this.props.last_news.bigText;

       return (
           <div className='article'>
               <p className='news__author'>{author}:</p>
               <p className='news__text'>{text}</p>
               <a href="#" className='news__readmore'>Подробнее</a>
               <p className='news__big-text'>{bigText}</p>
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
            <div className='app'>
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