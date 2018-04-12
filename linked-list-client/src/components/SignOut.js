import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { auth } from '../firebase';

const SignOutButton = () =>

    <button className="nav-link" onClick={auth.doSignOut}>Sign Out</button>

export default SignOutButton;