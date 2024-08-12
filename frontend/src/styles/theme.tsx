import { DefaultTheme } from 'styled-components';
import colors from './colors';

const theme: DefaultTheme = {
    colors: {
        text: colors.text,
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
