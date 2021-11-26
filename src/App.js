import './App.css';
import React from 'react'
import AllData from './AllData';
// import toast, { Toaster } from 'react-hot-toast';

function App() {

	return (
		<>
			<AllData />

			{/* <!--[ footer ] --> */}
			<div id="footer">
				<div class="container">
					<p class="footer-block">Project by <a href="https://github.com/ThusharaX" target="_blank" rel="noopener noreferrer">Thushara Thiwanka</a></p>
				</div>
			</div>
		</>
	)
}

export default App;
