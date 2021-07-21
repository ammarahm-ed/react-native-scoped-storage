import React from 'react';
import { createFourUIComponent } from "four-ui-kit";
import { LiteralUnion, SimpleComponentProps } from "four-ui-kit/src/helpers/typings";
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps, SimpleComponentProps {
    type?: LiteralUnion<"default" | "error" | "success">
}

let types: { [name: string]: ButtonProps } = {
    default: {
        flexDirection: "column"
    },
    round: {
        border: {
            borderRadius: "circle"
        },
        background: "accent",
        style: {
            paddingVertical: 8,
            paddingHorizontal: 12,
            alignItems: 'center',
        },

    }
}

const Button: React.FC<ButtonProps> = createFourUIComponent(TouchableOpacity, types);

export default Button;