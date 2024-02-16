import { faUser ,faBookmark,faRightFromBracket, faGear ,faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const userboxData = [
    {
        title : 'General Infos',
        icon: faCircleInfo,
        linkTo : '/user/info',
        class : 'c-side-nav'
    },
    {
        title : 'Profile',
        icon:  faUser,
        linkTo : '/user/profile',
        class : 'c-side-nav'
    },
    {
        title : 'My Favorite',
        icon:  faBookmark,
        linkTo : '/user/favorites',
        class : 'c-side-nav'
    },
    {
        title : 'Setting',
        icon:  faGear,
        linkTo : '/user/settings',
        class : 'c-side-nav'
    },
    {
        title : 'Logout',
        icon:  faRightFromBracket,
        linkTo : '/',
        class : 'c-side-nav'
    }
]

export default userboxData;