/* eslint-disable no-useless-constructor */
import React from 'react';

import './more-books.scss';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const QUERY_BOOKS = gql`
	{
        books {
            id
            name
            chapters
            price
        }
	}
`;

export default class MoreBooks extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Query query={QUERY_BOOKS}>
				{({ loading, error, data }) => {
					if (loading) return <div>Fetching</div>;
					if (error) return <div>{error}</div>;

                    const books = data.books;
                    console.log('Books', books);
                
				return (<div className="more-books">
					<div className="container">
						<div className="row">
							<div className="col">
								<h2 className="text-center more-books-title">More Books</h2>
								<div className="more-books-list">
									<div className="row">
										{books.map((book, index) => {
											return (
												<div className="col-4" key={index}>
													<div className="card" key={index}>
														<div className="card-body">
															<h3 className="book-title">{book.name}</h3>
															<h6 className="sub-line">{book.chapters} Chapters</h6>
															<div className="more-books-footer">
																<div className="float-left">
																	<span className="price">{book.price}</span>
																</div>
																<div className="float-right">
																	<span>
																		<a href="#">View Details</a>
																	</span>
																</div>
															</div>
														</div>														
													</div>
												</div>
											);
										})}
									</div>
								</div>
								<div className="text-center">
									<button className="btn btn-lg btn-custom">View All Books</button>
								</div>
							</div>
						</div>
					</div>
				</div>)
                                    }}
                </Query>
		);
	}
}
