import React from 'react'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineCollection
} from 'react-icons/hi'
import { RiUserSearchLine } from "react-icons/ri";
import { GiDeathNote } from "react-icons/gi";
import { MdOutlineBookmarks } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";

const navigationIcon = {
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    outlineCollection: <HiOutlineCollection />,
    home: <HiOutlineHome />,
    userSearchLine: <RiUserSearchLine />,
    deathNote: <GiDeathNote />,
    outlineBookmarks: <MdOutlineBookmarks />,
    analytics: <IoAnalytics />
}

export default navigationIcon