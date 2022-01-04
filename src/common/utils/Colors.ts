export const Colors = {
    main_purple: '#C49BDF',
    green_light: '#c5edd6',
    cream: '#ddbea9',
    dark_green: '#6b705c',
    transparent_black: '#00000060',
}

export const allThemes: string[][] = [
    ['themeOne',
        '#1446a0',
        '#db3069',
        '#F5D547',
        '#ddbea9',
        '#FFFFFF',
        '#ffe8d6',
    ],
    [
        'themeTwo',
        '#003844',
        '#006C67',
        '#F194B4',
        '#cb997e',
        '#FFB100',
        '#FFEBC6',
    ],
    [
        'themeThree',
        '#E4572E',
        '#29335C',
        '#F3A712',
        '#e9c46a',
        '#ffe8d6',
        '#FFFFFF',
    ]
]

export interface ThemeProps {
    mode: string;
    primary_color: string;
    secondary_color: string,
    bg_color: string,
    card_color: string;
    text_color: string,
    tint_color: string,
}

export const themeGenerator = (theme: string[]) => {

    let newTheme: ThemeProps = {
        mode: "",
        primary_color: "",
        secondary_color: "",
        bg_color: "",
        card_color: "",
        text_color: "",
        tint_color: "",
    };

    newTheme.mode = theme[0]
    newTheme.primary_color = theme[1]
    newTheme.secondary_color = theme[2]
    newTheme.bg_color = theme[3];
    newTheme.card_color = theme[4];
    newTheme.text_color = theme[5];
    newTheme.tint_color = theme[6];

    return newTheme
}
