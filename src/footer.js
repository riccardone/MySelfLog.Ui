import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="navbar-fixed-bottom footer">
					<div className="container">
						<div className="row">
							<p>@2018 <a href="http://www.dinuzzo.co.uk/" title="open my personal website">Riccardo Di Nuzzo</a></p>
              <p><a href="https://github.com/riccardone/MySelfLog.Ui" title="source code on GitHub"><img src="GitHub-Mark-32px.png" alt="source code on GitHub" /></a></p>
						</div>
					</div>
				</footer>
    );
  }
}

export default Footer;
