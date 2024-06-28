import {
	Home,
	Library,
	Practice,
	Progress,
	Game,
	GameTopic,
	Learn,
	GameSaved,
} from "../pages";

const routes = [
	{
		path: "*",
		component: Home,
	},
	{
		path: "/",
		component: Home,
	},
	{
		path: "/library",
		component: Library,
	},
	{
		path: "/practice",
		component: Practice,
	},
	{
		path: "/progress",
		component: Progress,
	},
	{ path: "/game-topic", component: GameTopic, layout: null },
	{ path: "/game-saved", component: GameSaved, layout: null },
	{
		path: "/game",
		component: Game,
		layout: null,
	},
	{
		path: "/learn/:topicPath",
		component: Learn,
		layout: null,
	},
	{
		path: "/learn",
		component: Learn,
		layout: null,
	},
];

export default routes;
