import Main from './components/Main';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
	return (
		<div className='flex'>
			<Sidebar />
			<Main />
		</div>
	);
};

export default App;