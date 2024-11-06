import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./components/Header";

export default function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route path="/tv">
					<Tv />
				</Route>
				<Route path="/search">
					<Search />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	)
}
