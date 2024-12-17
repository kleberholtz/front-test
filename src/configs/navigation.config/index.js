import { 
    NAV_ITEM_TYPE_TITLE, 
    NAV_ITEM_TYPE_COLLAPSE, 
    NAV_ITEM_TYPE_ITEM 
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
		path: '/home',
		title: 'Home',
		translateKey: 'nav.home',
		icon: 'home',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],
        subMenu: []
    },
    {
        key: 'items',
		path: '/items',
		title: 'Items',
		translateKey: 'nav.items',
		icon: 'outlineBookmarks',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],
        subMenu: []
    },
]

export default navigationConfig