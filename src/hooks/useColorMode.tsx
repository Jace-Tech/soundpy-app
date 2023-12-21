import colorMap from '../utils/colors'
import { useAppSelector } from '../store/hooks'

interface useColorModeType {
  colors: { 
    BG_COLOR: string; 
    TEXT_WHITE: string; 
    TEXT_GRAY: string; 
    PRIMARY_COLOR: string; 
    DIVIDER: string; 
    SECONDARY_COLOR: string; 
    TEXT_DARK: string; 
  };
  hoverColor: string;
  trans: string;
  mode: string;
  isDark: boolean;
}

const useColorMode = (): useColorModeType => {
  const { mode } = useAppSelector(state => state.settingStore)
  const isDark = mode === "dark"
  const hoverColor = isDark ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .05)"
  const trans = !isDark ? "rgba(255, 255, 255, .95)" : "rgba(0, 0, 0, .95)"
  return { colors: colorMap[mode], hoverColor, mode, trans, isDark}
}

export default useColorMode