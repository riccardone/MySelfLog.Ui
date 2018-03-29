import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="navbar-fixed-bottom footer">
					<div className="container">
						<div className="row">
							<p>@2018 <a href="http://www.dinuzzo.co.uk/" title="open my personal website">Riccardo Di Nuzzo</a></p>
						</div>
					</div>
				</footer>
    );
  }
}

export default Footer;
