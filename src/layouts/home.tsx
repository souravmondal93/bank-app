// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
// import Configurator from "components/Configurator/Configurator";
import Footer from '@/components/molecules/footer/footer';
// Layout components
import AdminNavbar from '@/components/organisms/navbars/admin-navbar';
import React, { useState } from 'react';
// import { Redirect, Route, Switch } from "react-router-dom";
import routes from '../routes';
// Custom Chakra theme
import theme from '../theme/theme-admin';
// import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from '@/components/molecules/layout/main-panel';
import PanelContainer from '@/components/molecules/layout/panel-container';
import PanelContent from '@/components/molecules/layout/panel-content';
import Sidebar from '@/components/molecules/sidebar/sidebar';
import { useRouter } from 'next/router';

export default function HomeLayout(props) {
  const { children, ...rest } = props;
  let location = useRouter();

  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState('transparent');
  const [fixed, setFixed] = useState(false);
  // ref for main panel div
  const mainPanel = React.createRef();
  // functions for changing the states from components
  const getRoute = () => {
    // return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Sidebar
        routes={routes}
        logoText={'VISION BANK'}
        display='none'
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        ref={mainPanel}
        w={{
          base: '100%',
          xl: 'calc(100% - 275px)',
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={'VISION BANK'}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {/* {getRoute() ? ( */}
        <PanelContent>
          <PanelContainer>{children}</PanelContainer>
        </PanelContent>
        {/* ) : null} */}
        <Footer />
      </MainPanel>
    </ChakraProvider>
  );
}
