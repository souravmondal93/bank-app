import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { bgAuth } from "./bg-auth";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { switchStyles } from "./components/switch";
import { CardComponent } from "./additions/card/card";
import { CardBodyComponent } from "./additions/card/card-body";
import { CardHeaderComponent } from "./additions/card/card-header";
import { MainPanelComponent } from "./additions/layout/main-panel";
import { PanelContentComponent } from "./additions/layout/panel-content";
import { PanelContainerComponent } from "./additions/layout/panel-container";

export default extendTheme(
  { breakpoints }, // Breakpoints
  bgAuth, // Global styles
  globalStyles, // Global styles
  buttonStyles, // Button styles
  linkStyles, // Link styles
  drawerStyles, // Sidebar variant for Chakra's drawer
  switchStyles, // Switch styles
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent, // Card Header component
  MainPanelComponent, // Main Panel component
  PanelContentComponent, // Panel Content component
  PanelContainerComponent // Panel Container component
);
