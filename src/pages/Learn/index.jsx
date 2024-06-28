import React, { useEffect, useContext, useCallback, useRef } from "react";
import useSound from "use-sound";
import { Link, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

// Custom hooks
import useLearned from "./../../hooks/useLearned";
import useLibrary from "./../../hooks/useLibrary";

// Utilities functions
import { capitalize } from "./../../assets/utilities/transform_text";

// Coponents
import ContentCard from "../../components/ContentCard";
import CircleButton from "../../components/CircleButton";

// Context
import { VocabularyContext } from "./../../context/VocabularyContext";

// Sound effects
import bubblePopSFX from "../../assets/sfx/bubble-pop.mp3";
import tuntunSFX from "../../assets/sfx/tuntun.mp3";
import wipeSFX from "../../assets/sfx/wipe.mp3";
import paperSFX from "../../assets/sfx/page-flip.mp3";

// React icons
import {
	HiReply,
	HiMenu,
	HiX,
	HiOutlineChevronLeft,
	HiOutlineChevronRight,
} from "react-icons/hi";
import { HiBookmark } from "react-icons/hi2";
import {
	BsFillBookmarkPlusFill,
	BsCheck,
	BsFillBookmarkDashFill,
} from "react-icons/bs";
import { NotificationContext } from "../../App";
import { findTopicByName } from "./../../context/TopicContext";

export default function Learn() {
	const { topicPath } = useParams();
	const topic = findTopicByName(topicPath);
	// Get vocabulary context
	const allVoca = useContext(VocabularyContext);

	// Local Learned data
	const [getLocalLearned, setLocalLearned] = useLearned();

	const [learned, setLearned] = React.useState(() => {
		const learnedList = getLocalLearned();

		// If first time learning, check the first element
		if (!learnedList.includes(topic.id * 12)) learnedList.push(topic.id * 12);

		return learnedList;
	});

	// Add an element id in to learned state
	const addLearned = useCallback(
		(id) => {
			if (!learned.includes(id)) setLearned((prev) => [...prev, id]);
		},
		[learned]
	);

	// This side effect is update local storage when learned state changes
	useEffect(() => {
		setLocalLearned(learned);
	}, [learned, setLocalLearned]);

	// Local library data
	const [getLocalLibrary, setLocalLibrary] = useLibrary();
	const [library, setLibrary] = React.useState(getLocalLibrary());

	// Add new element id into local library
	const addToLibraryList = (id) => {
		tuntunSound();
		if (!library.includes(id)) setLibrary((prev) => [...prev, id]);
	};

	// Remove old element id from local library
	const removeFromLibraryList = (id) => {
		if (library.includes(id))
			setLibrary((prev) => {
				return prev.filter((item) => item !== id);
			});
	};

	// This side effect is update local storage when library state changes
	useEffect(() => {
		setLocalLibrary(library);
	}, [library, setLocalLibrary]);

	// Get list by index. Because every topic has 12 vocabulary
	const topicVoca = allVoca.slice(topic.id * 12, topic.id * 12 + 12);

	// State variables
	const [current, setCurrent] = React.useState(0);
	const [sidebar, setSidebar] = React.useState(false);

	// Sound
	const [tuntunSound] = useSound(tuntunSFX, { volume: 0.5 });
	const [wipeSound] = useSound(wipeSFX, { volume: 0.4 });
	const [paperSound] = useSound(paperSFX, { volume: 0.4 });
	const [clickSound] = useSound(bubblePopSFX, { volume: 0.8 });

	// Go to any card
	const changeCurrent = useCallback(
		(index) => {
			setCurrent(index);

			// Add to learned list
			const vocaID = topic.id * 12 + index;
			addLearned(vocaID);
		},
		[addLearned, topic.id]
	);

	// Previous card
	const prev = useCallback(() => {
		if (current !== 0) changeCurrent(current - 1);
	}, [changeCurrent, current]);

	// Next card
	const next = useCallback(() => {
		if (current !== 11) changeCurrent(current + 1);
	}, [changeCurrent, current]);

	// Show sumary menu sidebar
	const sidebarElement = useRef();
	const showSidebar = useRef(() => {
		wipeSound();
		setSidebar(true);
		sidebarElement.current.style.opacity = 1;
	});

	// Hide sumary menu sidebar
	const hideSidebar = useRef(() => {
		setSidebar(false);
		sidebarElement.current.style.opacity = 0;
	});

	// Short hand. ex: currentItem.id instead of topicVoca[current].id
	const currentItem = topicVoca[current];

	// This side effect catches arrow buttons and navigation
	const prevButton = useRef();
	const nextButton = useRef();
	useEffect(() => {
		// L: 37; U: 38; R: 39; D: 40
		const navigation = (e) => {
			switch (e.keyCode) {
				case 37:
					e.preventDefault();
					prevButton.current.click();
					prevButton.current.focus();
					break;
				case 39:
					e.preventDefault();
					nextButton.current.click();
					nextButton.current.focus();
					break;
				case 8:
					e.preventDefault();
					window.history.back();
					break;
				default:
			}
		};

		window.addEventListener("keydown", navigation);

		return () => {
			window.removeEventListener("keydown", navigation);
		};
	}, []);

	// Hanlde finger swipe
	const card = useRef();
	useEffect(() => {
		let touchStart;
		let touchEnd;

		const getTouchStart = (e) => {
			touchStart = e.changedTouches[0].screenX;
		};

		const getTouchEnd = (e) => {
			touchEnd = e.changedTouches[0].screenX;
			check();
		};

		const animateSlide = (x, rotate) => {
			paperSound();
			card.current.style.transform = `translateX(${x}rem)`;
			card.current.style.opacity = 0.8;
			setTimeout(() => {
				card.current.style.transform = "translateX(0)";
				card.current.style.opacity = 1;
			}, 200);
		};

		const check = () => {
			// Right swipe to left
			if (touchStart - touchEnd > 80) {
				animateSlide(-0.5);
				next();
			}
			// Left swipe to right
			else if (touchStart - touchEnd < -80) {
				animateSlide(0.5);
				prev();
			}
		};

		// Add listeners for touchstart and touchend for window
		window.addEventListener("touchstart", getTouchStart);
		window.addEventListener("touchend", getTouchEnd);

		// Clear listeners for touchstart and touchend
		return () => {
			window.removeEventListener("touchstart", getTouchStart);
			window.removeEventListener("touchend", getTouchEnd);
		};
	}, [next, paperSound, prev]);

	// Notification
	const addNotification = useContext(NotificationContext);

	return (
		<div className="flex justify-center items-center h-[100vh] lg:max-w-sm lg:relative">
			{/* Top side */}
			<header className="absolute z-10 flex items-center justify-between py-2 top-2 left-4 right-4">
				<Link to="/" onClick={wipeSound}>
					<CircleButton>
						<HiReply />
					</CircleButton>
				</Link>

				<div className="font-bold text-center translate-x-4">
					{`${current + 1}/12`}
				</div>

				<div
					className="py-2 pl-6 pr-2 text-white translate-x-4 rounded-l-full shadow text-32 bg-primary active:bg-blue-300 lg:cursor-pointer"
					onClick={() => {
						clickSound();
						showSidebar.current();
					}}
				>
					<HiMenu />
				</div>
				{/* Play button */}
				<button
					className="absolute left-[50%] -translate-x-[50%] top-[3.3rem] px-4 py-2 rounded-full bg-primary text-white font-semibold text-12 shadow"
					onClick={tuntunSound}
				>
					<Link to="/game-topic">Practice this topic</Link>
				</button>
			</header>
			{/* Main */}
			<main
				ref={card}
				className="transition-all duration-200 will-change-transform"
			>
				<ContentCard item={currentItem} />
			</main>

			{/* Navigation */}
			<nav className="fixed lg:absolute z-10 inset-4 top-[unset] flex items-center justify-between">
				<button
					onClick={() => {
						clickSound();
						prev();
					}}
					className="navigation-button"
					disabled={current === 0}
					ref={prevButton}
				>
					<HiOutlineChevronLeft />
				</button>

				{!library.includes(currentItem.id) ? (
					/* ADD TO LIB BUTTON */
					<button
						className="contact-library-button"
						onClick={() => {
							addToLibraryList(currentItem.id);
							addNotification(
								"success",
								`Added "${currentItem.name}" to the Library`
							);
						}}
					>
						<span className="text-xl text-green-400">
							<BsFillBookmarkPlusFill />
						</span>
						<span className="text-center text-12">Add to Library</span>
					</button>
				) : (
					/* REMOVE TO LIB BUTTON */
					<button
						className="contact-library-button"
						onClick={() => {
							tuntunSound();
							removeFromLibraryList(currentItem.id);
							addNotification(
								"info",
								`Removed "${currentItem.name}" from the Library`
							);
						}}
					>
						<span className="text-xl text-red-400">
							<BsFillBookmarkDashFill />
						</span>
						<span className="text-center text-12">Remove from Library</span>
					</button>
				)}
				<button
					onClick={() => {
						clickSound();
						next();
					}}
					className="navigation-button"
					disabled={current === 11}
					ref={nextButton}
				>
					<HiOutlineChevronRight />
				</button>
			</nav>

			{/* Side bar */}
			<aside
				ref={sidebarElement}
				className={
					"fixed lg:absolute inset-0 left-auto z-30 w-[70%] h-[100vh] bg-white overflow-auto shadow transition-all duration-300 opacity-0" +
					(sidebar ? "" : " translate-x-full")
				}
			>
				<div className="absolute inset-0 bottom-auto flex items-center justify-between px-2 py-4 overflow-auto text-white bg-primary rounded-br-3xl">
					<h3 className="flex-1 overflow-hidden text-20 one-line">
						{capitalize(topic.name)}
					</h3>
					<button
						onClick={() => {
							wipeSound();
							hideSidebar.current();
						}}
						className="p-1 mb-1 mr-2 text-black rounded-lg bg-light-gray active:bg-blue-300"
					>
						<HiX />
					</button>
				</div>
				{/* List vocabulary */}
				<ul className="pt-[68px] overflow-auto h-[100vh]">
					{topicVoca.map((item) => {
						let menuItemClass =
							"flex justify-between p-4 even:bg-blue-100 odd:bg-white active:bg-blue-300 active:text-white transition-all";
						if (item.id % 12 === current)
							menuItemClass = twMerge(
								menuItemClass,
								"text-white even:bg-primary odd:bg-primary font-semibold border-l-8 border-black"
							);
						return (
							<li
								key={item.id}
								className={menuItemClass}
								onClick={() => {
									wipeSound();
									hideSidebar.current();
									changeCurrent(item.id % 12);
								}}
							>
								{`${item.id + 1}. ${item.name}`}
								<span className="flex items-center">
									{(library.includes(item.id) && (
										<span className="text-yellow-400 ">
											<HiBookmark />
										</span>
									)) ||
										(learned.includes(item.id) && (
											<span className="text-green-400 text-20">
												<BsCheck />
											</span>
										))}
								</span>
							</li>
						);
					})}
				</ul>
			</aside>
			{sidebar && (
				<div
					className="fixed inset-0 z-20 transition-all lg:absolute bg-slate-900 opacity-70"
					onClick={() => {
						wipeSound();
						hideSidebar.current();
					}}
				></div>
			)}
		</div>
	);
}
