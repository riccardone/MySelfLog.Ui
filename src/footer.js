import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="navbar-fixed-bottom footer">
					<div className="container">
						<div className="row">
							<p>@2018 <a href="http://www.dinuzzo.co.uk/" title="Riccardo Di Nuzzo personal website">Riccardo Di Nuzzo</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href="https://github.com/riccardone/MySelfLog.Ui" title="Source Code on GitHub">GitHub</a></p>
						</div>
					</div>
				</footer>
    );
  }
}

export default Footer;
