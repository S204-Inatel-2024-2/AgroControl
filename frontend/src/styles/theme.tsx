import { DefaultTheme } from 'styled-components';
import colors from './colors';

const theme: DefaultTheme = {
    colors: {
        background: colors.background,
        backgroundInput: colors.backgroundInput,
        placeholderInput: colors.placeholderInput,
        text: colors.text,
        textOnClick: colors.textOnClick,
        backgroundButton: colors.backgroundButton,
        secondary: colors.secondary,
        success: colors.success,
        danger: colors.danger,
        warning: colors.warning,
        info: colors.info,
        light: colors.light,
        dark: colors.dark,
    },
};

export default theme;
