import { Box, Flex, useColorMode, FormLabel, Icon, Input, InputGroup } from '@chakra-ui/react';
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import React from 'react';
import * as cookies from 'lib/cookies';
import { COLOR_THEMES } from 'lib/settings/colorTheme';
import SettingsSample from './SettingsSample';

interface SettingsColorThemeProps {
  themeToggleType: 'checker' | 'switch'
}

const SettingsColorTheme: React.FC<SettingsColorThemeProps> = ({themeToggleType}) => {
    const { setColorMode } = useColorMode();
    const [activeHex, setActiveHex] = React.useState<string>();

    const setTheme = React.useCallback((hex: string) => {
        const nextHexTheme = COLOR_THEMES.find((theme) => theme.hex === hex);

        if (!nextHexTheme) {
            return;
        }

        setColorMode(nextHexTheme.colorMode);

        const varName = nextHexTheme.colorMode === 'light' ? '--chakra-colors-white' : '--chakra-colors-black';
        window.document.documentElement.style.setProperty(varName, hex);

        cookies.set(cookies.NAMES.COLOR_MODE_HEX, hex);
        window.localStorage.setItem(cookies.NAMES.COLOR_MODE, nextHexTheme.colorMode);
    }, [setColorMode]);

    React.useEffect(() => {
        const cookieColorMode = cookies.get(cookies.NAMES.COLOR_MODE);

        const nextColorMode = (() => {
            if (!cookieColorMode) {
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            return cookieColorMode;
        })();

        const colorModeThemes = COLOR_THEMES.filter(theme => theme.colorMode === nextColorMode);
        const fallbackHex = colorModeThemes[colorModeThemes.length - 1].hex;
        const cookieHex = cookies.get(cookies.NAMES.COLOR_MODE_HEX) ?? fallbackHex;
        setTheme(cookieHex);
        setActiveHex(cookieHex);
    }, []);

    const activeTheme = COLOR_THEMES.find((theme) => theme.hex === activeHex);

    const handleSelect = React.useCallback((event: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>) => {
        const reversedColor = activeTheme?.colorMode === 'light' ? 'dark' : 'light'
        setColorMode(reversedColor);
        const colorTheme = COLOR_THEMES.find((theme) => theme.colorMode === reversedColor);

        if (!colorTheme) {
            return;
        }

        const hex = colorTheme.hex;

        setTheme(hex);
        setActiveHex(hex);
    }, [setTheme, activeTheme]);


    const ColorSwitch = () => {
        const darkMode = activeTheme?.colorMode === "dark"
        return (
            <FormLabel
                htmlFor="theme-switcher"
                as={"label"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                position="relative"
            >
                <InputGroup>
                    <Input
                        id="theme-switcher"
                        type="checkbox"
                        checked={darkMode}
                        onChange={handleSelect}
                        display="inline-block"
                        appearance="none"
                        cursor="pointer"
                        height="25px"
                        width="55px"
                        marginTop={"5px"}
                        backgroundColor={darkMode ? "#323238" : "#eeeef0"}
                        border="3px solid"
                        borderColor="blue.300"
                        borderRadius="full"
                        paddingTop={0}
                        paddingBottom={0}
                    />
                    <Box
                        className={`iconMove `}
                        transition="all 0.2s ease-in"
                        transform={`${darkMode ? "translateX(30px)" : "translateX(-6px)"}`}
                        position="absolute"
                        cursor="pointer"
                        top={"1px"}
                        w={"30px"}
                        h={"30px"}
                        bg={darkMode ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"}
                        borderRadius="full"
                    >
                        <Icon
                            as={darkMode ? BsFillMoonFill : BsSunFill}
                            padding={darkMode ? "7px" : "5px"}
                            w={"30px"}
                            h={"30px"}
                            rounded="full"
                            color={
                            darkMode ? "rgba(255, 255, 245, .86)" : "rgba(60, 60, 67, .75)"
                            }
                        />
                    </Box>
                </InputGroup>
            </FormLabel>
        );
    };

    const ColorChecker = () => {
        return (
            <div>
                <Box fontWeight={600}>Color theme</Box>
                <Box color="text_secondary" mt={1} mb={2}>{activeTheme?.label}</Box>
                <Flex>
                    {COLOR_THEMES.map((theme) => (
                        <SettingsSample
                            key={theme.label}
                            label={theme.label}
                            value={theme.hex}
                            bg={theme.sampleBg}
                            isActive={theme.hex === activeHex}
                            onClick={handleSelect}
                        />
                    ))}
                </Flex>
            </div>
        )
    }

    return (
      themeToggleType == 'checker' ? <ColorChecker /> : <ColorSwitch />
    );
};

export default React.memo(SettingsColorTheme);