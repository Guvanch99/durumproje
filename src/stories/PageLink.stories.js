import React from 'react'
import {MemoryRouter} from "react-router-dom";

import PageLink from '../components/page-link'

import {ROUTER_CART} from "../constants/routers";
export default {
    title: 'PageLink',
    component: PageLink,
    argTypes: { eventHandler: { action: 'eventHandler' } }
}
export const baseLook = () => <MemoryRouter><PageLink name='go back Home' direction={ROUTER_CART} /></MemoryRouter>
