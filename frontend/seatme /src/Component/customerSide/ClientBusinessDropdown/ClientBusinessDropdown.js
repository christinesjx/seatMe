import React, { Component } from 'react';
import './ClientBusinessDropdown.css'

class ClientBusinessDropdown extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false}, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    render() {
        return (
            <div className="dropdown">
                <button className="dropdown-button" onClick={this.showMenu}>
                    Menu
                </button>

                {this.state.showMenu ? 
                    (
                    <div
                        ref={(element) => {
                            this.dropdownMenu = element;
                        }}            
                    >
                        <div className="dropdown-item">
                            <button>Client</button>
                            <br/>
                            <button>Business</button> 
                        </div>  
                    </div>
                    )
                    :(
                        null
                    )
                }
            </div>
        );
    }
}

export default ClientBusinessDropdown;