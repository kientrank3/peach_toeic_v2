import React from "react";
import { useSound } from "use-sound";
import { Link } from "react-router-dom";

// Components
import Button from "./../../components/Button";

// Sound
import clickSFX from "../../assets/sfx/bubble-pop.mp3";
import startSFX from "../../assets/sfx/tuntun.mp3";

// Custom hooks
import useSetting from "./../../hooks/useSetting";
import Pet from "../../components/Pet";

const settingData = [
	{
		name: "quantity",
		title: "Number of questions",
		setting: [
			{
				id: 0,
				name: "5",
				value: 5,
			},
			{
				id: 1,
				name: "10",
				value: 10,
			},
			{
				id: 2,
				name: "20",
				value: 20,
			},
			{
				id: 3,
				name: "30",
				value: 30,
			},
			{
				id: 4,
				name: "All",
				value: 600,
			},
		],
	},
	{
		name: "time",
		title: "Time (second)",
		setting: [
			{
				id: 0,
				name: "5",
				value: 5,
			},
			{
				id: 1,
				name: "10",
				value: 10,
			},
			{
				id: 2,
				name: "20",
				value: 20,
			},
			{
				id: 3,
				name: "30",
				value: 30,
			},
			{
				id: 4,
				name: "60",
				value: 60,
			},
			{
				id: 5,
				name: "Unlimited",
				value: 9999,
			},
		],
	},
	{
		name: "type",
		title: "Filter",
		setting: [
			{
				id: 0,
				name: "All",
				value: 0,
			},
			{
				id: 1,
				name: "Learned",
				value: 1,
			},
		],
	},
];

export default function Practice() {
	// Use local setting hooks
	const [getLocalSetting, setLocalSetting] = useSetting();
	const [setting, setSetting] = React.useState(() => {
		let settingValue = getLocalSetting();
		return settingValue;
	});

	// This side effect is used to update the local setting when setting state changes
	React.useEffect(() => {
		setLocalSetting(setting);
	}, [setting, setLocalSetting]);

	const [popSound] = useSound(clickSFX);
	const [startSound] = useSound(startSFX);

	return (
		<section className="px-4">
			{/* Setting */}
			<div className="flex flex-col pt-8">
				<h2 className="mb-4 text-center title">Setting</h2>
				{/* Select section */}
				<form className="flex flex-col gap-6 mb-6 ">
					{settingData.map((item, index) => (
						<div key={index}>
							<h4 className="inline-block mb-2 font-semibold text-primary">
								{item.title}:
							</h4>
							{/* Block contain radio button option */}
							<div className="flex flex-wrap p-2 border rounded-lg shadow-sm gap-x-6 gap-y-2 bg-s-white">
								{item.setting.map((option) => (
									<div
										className="flex items-center justify-between min-w-fit"
										key={option.id}
									>
										<div className="flex items-center gap-1">
											<input
												type="radio"
												name={item.name}
												className="w-5 h-5 mr-1 accent-black lg:cursor-pointer"
												id={`${item.name}_${option.id}`}
												value={option.value}
												checked={option.value === setting?.[item.name]}
												onChange={() => {
													setSetting((prev) => {
														return {
															...prev,
															[item.name]: option.value,
														};
													});
												}}
												onClick={popSound}
											/>
											<label htmlFor={`${item.name}_${option.id}`}>
												{option.name}
											</label>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</form>

				{/* Submit */}
				<div className="mt-auto">
					<Link to="/game" onClick={startSound}>
						<Button isPrimary fullWidth>
							Start Practice
						</Button>
					</Link>
				</div>
			</div>

			{/* Cat */}
			<Pet />
		</section>
	);
}
