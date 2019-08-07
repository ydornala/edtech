import React from 'react';

import './book-details.scss';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { printReceived } from 'jest-matcher-utils';

const QUERY_BOOK = gql`
    query getBookById($arg: BookWhereUniqueInput!) {
        book(where: $arg) {
            id
            name
            chapters
            price
            description
            publisher
            paperback
            languages
            isbn_10
            isbn_13
            specifications {
                id
                title
                description
                image
            }
        }
    }
`;

export default class BookDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
            quantity: 0,
            activeImage: 'https://elgarblog.files.wordpress.com/2014/01/education-books.jpg'
        };

        this.toggleCard = this.toggleCard.bind(this);
    }

    toggleCard(e) {
        this.setState({activeImage: e.image});
    }

    updateQuantity(operation) {
        console.log('update ==> ', this.state);
        if(operation === 'incr') {
            this.setState({quantity: this.state.quantity + 1});
        } else {
            if((this.state.quantity - 1) < 0) {
                this.setState({quantity: 0});
            } else {
                this.setState({quantity: this.state.quantity - 1});
            }
        }
    }

    render() {
        const arg = {"id": "cjyr14xmplay20b53xir4j29a"};
        return(
            <Query query={QUERY_BOOK} variables={{arg}}> 
            {({loading, error, data}) => {
                if (loading) return <div>Fetching</div>;
                if (error) return <div>{error}</div>;
                console.log('Book details', data);
                const book = data.book;
                return (
                    <div className="book-details-wrapper">
                        <div className="book-details">
                            <div className="container">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="book-title">{book.name}</div>
                                        <div className="book-description">
                                            {book.description}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="book-cart-box">
                                            <ul className="list-group list-group-flush prop-list">
                                                <li className="list-group-item prop-list-item">
                                                    <i className="fas fa-check prop-icon"></i>
                                                    <span >
                                                        <strong>Publisher: </strong>
                                                        {book.publisher}
                                                    </span>
                                                </li>
                                                <li className="list-group-item prop-list-item">
                                                    <i className="fas fa-check prop-icon"></i>
                                                    <span >
                                                        <strong>Paperback: </strong>
                                                        {book.paperback}
                                                    </span>
                                                </li>
                                                <li className="list-group-item prop-list-item">
                                                    <i className="fas fa-check prop-icon"></i>
                                                    <span >
                                                        <strong>Language: </strong>
                                                        {book.language}
                                                    </span>
                                                </li>     
                                                <li className="list-group-item prop-list-item">
                                                    <i className="fas fa-check prop-icon"></i>
                                                    <span >
                                                        <strong>ISBN-10: </strong>
                                                        {book.isbn_10}
                                                    </span>
                                                </li>                 
                                                <li className="list-group-item prop-list-item">
                                                    <i className="fas fa-check prop-icon"></i>
                                                    <span >
                                                        <strong>ISBN-13: </strong>
                                                        {book.isbn_13}
                                                    </span>
                                                </li>                          
                                            </ul>
                                            <div className="price-wrapper">
                                                <div className="float-left price">{book.price}</div>
                                                <div className="float-right">
                                                    <div className="increment-wrapper">
                                                        <button className="btn minus-incr" onClick={this.updateQuantity.bind(this, 'decr')}>-</button>
                                                        <span className="cart-count">{this.state.quantity}</span>
                                                        <button className="btn plus-incr" onClick={this.updateQuantity.bind(this, 'incr')}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="add-basket-wrapper">
                                                <button className="btn btn-block btn-lg">
                                                <i className="icon-basket"></i> Add to Basket</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="book-properties">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="accordian" id="book-props">
                                            {
                                                book.specifications.map((value, index) => {
                                                    return (
                                                        <div onClick={this.toggleCard.bind(this, value)} key={index} className="card collapsed" data-toggle="collapse" data-target={'#collapse' + index} aria-expanded="true" aria-controls={'collapse' + index}>
                                                            <div className="card-header" id="headingOne" >
                                                                <h2 className="mb-0">
                                                                    <button className="btn btn-link" type="button" >
                                                                        {value.title}
                                                                    </button>
                                                                    <div className="float-right toggle-icon"></div>
                                                                </h2>
                                                            </div>

                                                            <div id={'collapse' + index} className="collapse" aria-labelledby="headingOne" data-parent="#book-props">
                                                                <div className="card-body">
                                                                    {value.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }

                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="book-image-wrapper">
                                            <img src={ this.state.activeImage } alt="specification image"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
            </Query>
        )
    }
}