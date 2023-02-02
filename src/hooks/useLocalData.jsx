export default function useLocalData() {
	const key = "PEACH_TOEIC";

	const get = () => {
		let localData = JSON.parse(window.localStorage.getItem(key)) || null;
		if (localData === null) {
			localData = {};
			localData.data = {
				name: null,
				dayStart: null,
				dayLearned: [],
				dayStreak: null,
				lastTimeLogin: null,
				learned: [],
				library: [],
				previous: 0,
				topicComplete: [],
				highScore: { score: 0, time: 0 },
			};

			window.localStorage.setItem(key, JSON.stringify(localData));
		}
		return localData.data;
	};

	const set = (newData) => {
		let localData = JSON.parse(window.localStorage.getItem(key)) || {};
		localData.data = { ...localData.data, ...newData };
		window.localStorage.setItem(key, JSON.stringify(localData));
	};

	return [get, set];
}

/**
 * {"setting":{"quantity":30,"time":20,"type":1},"data":{"name":"Thanh Canh","dayStart":1673937123854,"dayLearned":["17/01/2023","18/01/2023","19/01/2023"],"dayStreak":1,"lastTimeLogin":1674133417060,"learned":[0,1,2,12,84,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,13,14,15,16,17,18,19,20,21,22,23,60,61,62,63,64,65,66],"topicComplete":[31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,0,1],"library":[588,504],"previous":42,"highScore":{"score":300,"time":15}}}
 */
