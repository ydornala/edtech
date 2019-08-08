import React from 'react';
import './header.scss';
import { ApolloConsumer, Query } from 'react-apollo';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.navs = [{
            link: '',
            name: 'Books'
        },{
            link: '',
            name: 'Blog'
        },{
            link: '',
            name: 'Contact'
        },{
            link: '',
            name: 'Login'
        }];
    }

    render() {
        return (
            <ApolloConsumer>
                {(client) => {
                    console.log('consumer ==> ', client);
                    return (
                        <header>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="float-left">
                                            <div className="logo-wrapper">
                                                <img src="/assets/images/Acme_Logo.png" alt="Acme Logo"/>
                                            </div>
                                        </div>
                                        <div className="float-right">
                                            <ul className="nav">
                                            {
                                                this.navs.map((value, index) => {
                                                    return (<li className="nav-item" key={index}>
                                                        <a className="nav-link" href={value.link} key={index}>{value.name}</a>
                                                    </li>)
                                                })
                                            }
                                                <li className="nav-item basket">
                                                    <a className="nav-link" href="#">
                                                        <i className="icon-basket"></i> Basket
                                                    </a>
                                                    <span className="cartCount nav-link">0</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    );
                    }
                }
            </ApolloConsumer>
        )
    }
}
