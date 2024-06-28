import React from "react";
import { createContext } from "react";
import { transformName } from "../assets/utilities/transform_text";

export const TopicContext = createContext();
export const findTopic = (id) => {
	return topicData.find((topic) => topic.id === id);
};

export const findTopicByName = (name) => {
	return topicData.find(
		(topic) => transformName(topic.name) === transformName(name)
	);
};

export default function Topic({ children }) {
	return (
		<TopicContext.Provider value={topicData}>{children}</TopicContext.Provider>
	);
}

const topicData = [
	{
		id: 0,
		name: "contracts",
		display: "contracts",
		meaning: "hợp đồng",
	},
	{
		id: 1,
		name: "marketing",
		display: "marketing",
		meaning: "tiếp thị",
	},
	{
		id: 2,
		name: "warranties",
		display: "warranties",
		meaning: "sự bảo hành",
	},
	{
		id: 3,
		name: "business planning",
		display: "business planning",
		meaning: "kế hoạch kinh doanh",
	},
	{
		id: 4,
		name: "conferences",
		display: "conferences",
		meaning: "hội nghị",
	},
	{
		id: 5,
		name: "computers & the internet",
		display: "computers & internet",
		meaning: "máy tính & Internet",
	},
	{
		id: 6,
		name: "office technology",
		display: "office technology",
		meaning: "công nghệ văn phòng",
	},
	{
		id: 7,
		name: "office procedures",
		display: "office procedures",
		meaning: "thủ tục văn phòng",
	},
	{
		id: 8,
		name: "electronics",
		display: "electronics",
		meaning: "thiết bị điện tử",
	},
	{
		id: 9,
		name: "correspondence",
		display: "correspondence",
		meaning: "thư tín",
	},
	{
		id: 10,
		name: "job ads & recruitment",
		display: "job ads & recruitment",
		meaning: "quảng cáo việc làm & tuyển dụng",
	},
	{
		id: 11,
		name: "apply and interviewing",
		display: "apply and interviewing",
		meaning: "nộp hồ sơ và phỏng vấn",
	},
	{
		id: 12,
		name: "Hiring and Training",
		display: "Hiring and Training",
		meaning: "Tuyển dụng và đào tạo",
	},
	{
		id: 13,
		name: "Salaries & Benefits",
		display: "Salaries & Benefits",
		meaning: "Lương & Phúc lợi",
	},
	{
		id: 14,
		name: "Promotions & Awards",
		display: "Promotions & Awards",
		meaning: "Khuyến mãi & giải thưởng",
	},
	{
		id: 15,
		name: "Shopping",
		display: "Shopping",
		meaning: "Mua sắm",
	},
	{
		id: 16,
		name: "Ordering Supplies",
		display: "Ordering Supplies",
		meaning: "Đặt hàng nhà cung cấp",
	},
	{
		id: 17,
		name: "Shipping",
		display: "Shipping",
		meaning: "Đang chuyển hàng",
	},
	{
		id: 18,
		name: "Invoices",
		display: "Invoices",
		meaning: "hóa đơn",
	},
	{
		id: 19,
		name: "Inventory",
		display: "Inventory",
		meaning: "Hàng tồn kho",
	},
	{
		id: 20,
		name: "Banking",
		display: "Banking",
		meaning: "ngân hàng",
	},
	{
		id: 21,
		name: "Accounting",
		display: "Accounting",
		meaning: "Kế toán",
	},
	{
		id: 22,
		name: "Investments",
		display: "Investments",
		meaning: "đầu tư",
	},
	{
		id: 23,
		name: "Taxes",
		display: "Taxes",
		meaning: "thuế",
	},
	{
		id: 24,
		name: "Financial Statements",
		display: "Financial Statements",
		meaning: "Báo cáo tài chính",
	},
	{
		id: 25,
		name: "Property & Departments",
		display: "Property & Departments",
		meaning: "Tài sản & Bộ phận",
	},
	{
		id: 26,
		name: "Board Meeting",
		display: "Board Meeting",
		meaning: "Họp Hội đồng",
	},
	{
		id: 27,
		name: "Quality Control",
		display: "Quality Control",
		meaning: "Kiểm soát chất lượng",
	},
	{
		id: 28,
		name: "Product Development",
		display: "Product Development",
		meaning: "Phát triển sản phẩm",
	},
	{
		id: 29,
		name: "Renting & Leasing",
		display: "Renting & Leasing",
		meaning: "Thuê & Cho thuê",
	},
	{
		id: 30,
		name: "Selecting A Restaurant",
		display: "Selecting A Restaurant",
		meaning: "Chọn một nhà hàng",
	},
	{
		id: 31,
		name: "Eating Out",
		display: "Eating Out",
		meaning: "Ăn ở ngoài",
	},
	{
		id: 32,
		name: "Ordering Lunch",
		display: "Ordering Lunch",
		meaning: "Đặt bữa trưa",
	},
	{
		id: 33,
		name: "Cooking As A Career",
		display: "Cooking As A Career",
		meaning: "Nấu ăn như một nghề nghiệp",
	},
	{
		id: 34,
		name: "Events",
		display: "Events",
		meaning: "Sự kiện",
	},
	{
		id: 35,
		name: "General Travel",
		display: "General Travel",
		meaning: "du lịch tổng hợp",
	},
	{
		id: 36,
		name: "Airlines",
		display: "Airlines",
		meaning: "hãng hàng không",
	},
	{
		id: 37,
		name: "Trains",
		display: "Trains",
		meaning: "xe lửa",
	},
	{
		id: 38,
		name: "Hotels",
		display: "Hotels",
		meaning: "Nhiều khách sạn",
	},
	{
		id: 39,
		name: "Car Rentals",
		display: "Car Rentals",
		meaning: "Cho thuê ô tô",
	},
	{
		id: 40,
		name: "Movies",
		display: "Movies",
		meaning: "Phim",
	},
	{
		id: 41,
		name: "Theater",
		display: "Theater",
		meaning: "Nhà hát",
	},
	{
		id: 42,
		name: "Music",
		display: "Music",
		meaning: "Âm nhạc",
	},
	{
		id: 43,
		name: "Museums",
		display: "Museums",
		meaning: "viện bảo tàng",
	},
	{
		id: 44,
		name: "Media",
		display: "Media",
		meaning: "Phương tiện truyền thông",
	},
	{
		id: 45,
		name: "Doctor's Office",
		display: "Doctor's Office",
		meaning: "Phòng khám",
	},
	{
		id: 46,
		name: "Dentist's Office",
		display: "Dentist's Office",
		meaning: "Văn phòng nha sĩ của",
	},
	{
		id: 47,
		name: "Health",
		display: "Health",
		meaning: "Sức khỏe",
	},
	{
		id: 48,
		name: "Hopitals",
		display: "Hopitals",
		meaning: "bệnh viện",
	},
	{
		id: 49,
		name: "Pharmacy",
		display: "Pharmacy",
		meaning: "Tiệm thuốc",
	},
];
