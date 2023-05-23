import AppRouter from '@/router/AppRouter';
import { store } from './store';
import { Provider } from 'react-redux';

const App = () => {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};

export default App;
