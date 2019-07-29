export default [
	{
		label: '姓名',
		height: '20px'
	},
	{
		label: '年龄',
		height: '20px'
	},
	{
		label: '手机号码',
		height: '20px'
	},
	{
		label: '性别',
		height: '20px'
	},
	{
		label: '感情状态(已婚/未婚/恋爱中/单身)',
		height: '20px'
	},
	{
		label: '微信号',
		height: '20px'
	},
	{
		label: '您的家庭住址（例：霞山区XX小区）',
		height: '40px'
	},
	{
		label: '您的现住址（学生领养必填）',
		height: '40px'
	},
	{
		label: '您的目前从事的职业（例：教师）',
		height: '20px'
	},
	{
		label: '您工作的地点',
		height: '40px'
	},
	{
		label: '您是否已有宠物（例：我已有一只猫/狗）',
		type: 'radio',
		options: [
			{ value: '是' },
			{ value: '否' }
		]
	},
	{
		label: '您的家人支持您养猫吗（例：支持/不支持）',
		type: 'radio',
		options: [
			{ value: '支持' },
			{ value: '不支持' }
		]
	},
	{
		label: '您是否有养猫经验',
		type: 'radio',
		options: [
			{ value: '有' },
			{ value: '没有' }
		]
	},
	{
		label: '家中有猫用品吗',
		type: 'radio',
		options: [
			{ value: '有' },
			{ value: '无' },
			{ value: '接猫之前会准备齐全' }
		]
	},
	{
		label: '您是否真的爱猫，能把猫当作生活中的一员，并能够独立承担自己的生活，尤其是额外承担照顾猫的责任？',
		type: 'radio',
		options: [
			{ value: '能' },
			{ value: '不能' }
		]
	},
	{
		label: '您是否能接受定期向送养者更新猫咪状况？接受回访？能否保证家中经常有人，即便出门，也能妥善安置好猫？',
		type: 'radio',	
		options: [
			{ value: '能' },
			{ value: '不能' }
		]
	},
	{
		label: '您是否能做到给猫适龄绝育，定期驱虫打疫苗？并愿意承担每个月养猫的花销：生病及时看病，包括猫粮、猫砂、零食、玩具等。绝育加疫苗1000左右或者更多。稳定以后，猫每个月的猫粮和猫砂等费用大概在200-300左右？请想好再回答。',
		type: 'radio',
		options: [
			{ value: '能' },
			{ value: '不能' }
		]
	},
	{
		label: '在遇到再遇到家庭生活变化时，您是否能不抛弃不放弃？比如搬家？怀孕养猫？毕业？',
		type: 'radio',
		options: [
			{ value: '应该不会' },
			{ value: '一定不会' },
			{ value: '我不知道' }
		]
	},
	{
		label: '您是否能承受猫的淘气，表现为干扰人正常作息，抓坏沙发，打碎东西等？还有养猫带来的各种“麻烦”，比如掉毛、铲屎、剪指甲等？',
		type: 'radio',
		options: [
			{ value: '能' },
			{ value: '不能' },
			{ value: '我不知道' }
		]
	},
	{
		label: '您是否有为了保证猫的健康成长而了解并学习过科学的养猫知识？',
		type: 'radio',
		options: [
			{ value: '学习过' },
			{ value: '没学习过' },
			{ value: '我已是资深铲屎官' },
			{ value: '不懂但是会认真学' }
		]
	},
	{
		label: '猫的寿命只有十几年，您是否能始终不离不弃？并保证不放养，在家中做好封锁门窗等安全措施？',
		type: 'radio',
		options: [
			{ value: '能' },
			{ value: '不能' }
		]
	},
	{
		label: '您计划购买什么牌子的猫粮？（例：皇家/渴望等）'
	},
	{
		label: '您计划购买什么类型的猫砂？（例：膨润土/松木等）'
	},
	{
		label: '您与猫住的地方是出租屋还是自有住房'
	},
	{
		label: '是否愿意提供身份证复印件照片（写上仅供领养使用）并与领养的猫合照。',
		type: 'radio',
		options: [
			{ value: '愿意' },
			{ value: '不愿意' }
		]
	},
	{
		label: '感谢您的用心填写，填写完毕请主动联系给您发送申请表的领养审核人员。学生领养请往后继续填写，非学生到这可以提交了。'
	},
	{
		label: '您的舍友同意并知道您要领养吗？是否可以做到开门关笼，宿舍散养关紧门窗？',
		type: 'radio',
		options: [
			{ value: '以上问题全部同意并做得到' },
			{ value: '不同意并做不到' }
		]
	},
	{
		label: '家人同意并能做到寒暑假或毕业以后能带猫咪回家，不抛弃不放弃照顾一辈子吗？',
		type: 'checkbox',
		options: [
			{ value: '寒暑假、毕业不能带回家，另想办法处理' },
			{ value: '不抛弃不放弃，一直带在身边' }
		]
	},
	{
		label: '最后，再看一眼第3  4  5  6条，自己真的能做到吗？'
	}
]