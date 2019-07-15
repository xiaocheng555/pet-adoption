// 宠物年龄
const ageOptions = [
	{
		label: '0-3个月',
		value: -3,
	},
	{
		label: '4-6个月',
		value: -2,
	},
	{
		label: '7-12个月',
		value: 0,
	},
	{
		label: '1岁',
		value: 1,
	},
	{
		label: '2岁',
		value: 2,
	},
	{
		label: '3岁',
		value: 3,
	},
	{
		label: '4岁',
		value: 4,
	},
	{
		label: '5岁',
		value: 5,
	},
	{
		label: '6岁',
		value: 6,
	},
	{
		label: '7岁',
		value: 7,
	},
	{
		label: '8岁',
		value: 8,
	},
	{
		label: '9岁',
		value: 9,
	},
	{
		label: '10岁',
		value: 10,
	},
	{
		label: '11岁',
		value: 11,
	},
	{
		label: '12岁',
		value: 12,
	},
	{
		label: '13岁',
		value: 13,
	},
	{
		label: '14岁',
		value: 14,
	},
	{
		label: '15岁',
		value: 15,
	},
	{
		label: '16岁',
		value: 16,
	},
	{
		label: '17岁',
		value: 17,
	},
	{
		label: '18岁',
		value: 18,
	},
	{
		label: '19岁',
		value: 19,
	},
	{
		label: '20岁',
		value: 20,
	},
	{
		label: '不祥',
		value: -1,
	}
]

// 宠物性别选项
const petGenderOptions = [
	{
		label: '男孩',
		value: 0
	},
	{
		label: '女孩',
		value: 1
	},
	{
		label: '不详',
		value: 2
	}
]

// 宠物绝育类型
const petSterilizationOptions = [
	{
		label: '是',
		text: '已绝育',
		value: 0
	},
	{
		label: '否',
		text: '未绝育',
		value: 1
	},
	{
		label: '不详',
		value: 2
	}
]

// 宠物疫苗类型
const petVaccinationOptions = [
	{
		label: '是',
		text: '已注射疫苗',
		value: 0
	},
	{
		label: '否',
		text: '未注射疫苗',
		value: 1
	},
	{
		label: '不详',
		value: 2
	}
]

// 是否免费
const petFreeOptions = [
	{
		label: '是',
		text: '免费',
		value: true
	},
	{
		label: '否',
		text: '不免费',
		value: false
	}
]

// uni-load-more 组件的loading状态
const LOADMORE_STATUS = {
	more: 'more',
	loading: 'loading',
	noMore: 'noMore'
}

// uni-load-more 组件的显示内容
const LOADMORE_CONTENT_TEXT = {
	contentdown: '查看更多',
	contentrefresh: '努力加载中...',
	contentnomore: '没有更多数据了~'
}

// 宠物类型id
const PET_CLASS_ID = {
	cat: 'ba20f11b-8602-44c0-bfb9-98a7f21478ce',
	dog: 'cdd4e5ae-45ec-4e18-bce1-73fd726a0783'
}

export {
	ageOptions,
	petGenderOptions,
	petSterilizationOptions,
	petVaccinationOptions,
	petFreeOptions,
	LOADMORE_STATUS,
	LOADMORE_CONTENT_TEXT,
	PET_CLASS_ID
}