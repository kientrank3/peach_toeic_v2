/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, HashRouter } from "react-router-dom";
import {
	createContext,
	Fragment,
	useCallback,
	useEffect,
	useState,
} from "react";

// Routes and context
import routes from "./routes";
// Components
import DefaultLayout from "./components/layout/DefaultLayout";
import Loading from "./components/Loading";
import UserForm from "./components/UserForm/index";
// Utilities functions
// Custom hooks
import useLocalData from "./hooks/useLocalData";
import {
	formatDate,
	substractDay as subtractDay,
} from "./assets/utilities/transform_date";
import NotificationBar from "./components/NotificationBar";

export const NotificationContext = createContext();

function App() {
	// Get topic list context
	const [getLocalData, setLocalData] = useLocalData();
	const localData = getLocalData();

	// Notification
	const [queue, setQueue] = useState([]);

	const popFromQueue = useCallback(() => {
		setQueue((prev) => prev.slice(1));
	});

	const addToQueue = useCallback((type, message) => {
		setQueue((prev) => {
			return prev.length >= 3
				? [...prev.slice(1), { type: type, message: message }]
				: [...prev, { type: type, message: message }];
		});
	}, []);

	// Handle login
	useEffect(() => {
		if (localData) {
			//Day learned
			const today = formatDate(Date.now());
			if (!localData.dayLearned.includes(today))
				localData.dayLearned.push(today);

			//Day Streak
			const gap = subtractDay(Date.now(), localData.lastTimeLogin);
			if (gap === 1) {
				localData.dayStreak++;
				addToQueue("info", `${localData.dayStreak} day streak 🔥`);
			} else if (gap === 0);
			else localData.dayStreak = 1;

			//Save last time login
			localData.lastTimeLogin = Date.now();

			//Save to local storage
			setLocalData(localData);
		}
	}, []);

	return (
		<HashRouter>
			<NotificationContext.Provider value={addToQueue}>
				<Loading time={2500} />
				{localData.name === null && (
					<UserForm
						message="When we first met, what's your name?"
						title="Welcome new user"
					/>
				)}
				<div className="App tap-highlight-none bg-white lg:relative min-h-[100vh] lg:max-w-sm lg:mx-auto lg:border lg:overflow-y-scroll lg:shadow-lg">
					<NotificationBar queue={queue} popFromQueue={popFromQueue} />
					<Routes>
						{/* Main route */}
						{routes.map((route, index) => {
							let Layout = DefaultLayout;
							if (route.layout) {
								Layout = route.layout;
							} else if (route.layout === null) {
								Layout = Fragment;
							}

							const Page = route.component;

							return (
								<Route
									key={index}
									path={route.path}
									element={
										<Layout>
											<Page />
										</Layout>
									}
								></Route>
							);
						})}
					</Routes>
				</div>
			</NotificationContext.Provider>
		</HashRouter>
	);
}

export default App;
