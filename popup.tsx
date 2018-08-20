import React, { Fragment } from 'react';
import {
    Modal,
    TouchableOpacity,
    View,
    ViewStyle,
    LayoutChangeEvent,
    LayoutRectangle,
    Dimensions,
    StyleSheet,
    StyleProp,
    UIManager,
    findNodeHandle,
} from 'react-native';

const ArrowSize = 10;

interface Props {
    isOpen: boolean;
    children: React.ReactNode;
    renderContent: () => React.ReactNode;
    style?: ViewStyle;
    contentStyle?: ViewStyle;
    arrowColor: string;
    onClose: () => void;
    onPress: () => void;
    anchor: 'up' | 'down';
}
interface State {
    contentLayout: LayoutRectangle;
}
export class PopupButton extends React.Component<Props, State> {
    private triggerElt?: React.ReactNode;
    private triggerFrame: LayoutRectangle = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    public state = {
        contentLayout: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
    };

    public render() {
        const {
            children,
            renderContent,
            isOpen,
            contentStyle,
            style,
            onClose,
            onPress,
            arrowColor,
        } = this.props;

        return (
            <Fragment>
                <TouchableOpacity
                    ref={elt => (this.triggerElt = elt)}
                    onPress={onPress}
                    // onLayout={this.onTriggerContainerLayout}
                    style={style}
                >
                    {children}
                </TouchableOpacity>
                <Modal
                    visible={isOpen}
                    transparent={true}
                    supportedOrientations={['landscape', 'portrait']}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <Backdrop onPress={onClose} />
                        <View
                            onLayout={this.onContentLayout}
                            style={[
                                contentStyle,
                                { position: 'absolute' },
                                this.calculateContentOffset(),
                            ]}
                        >
                            {renderContent()}
                        </View>

                        <Arrow
                            style={[
                                { position: 'absolute' },
                                this.calculateArrowOffset(),
                                this.calculateArrowShape(),
                            ]}
                        />
                    </View>
                </Modal>
            </Fragment>
        );
    }

    public componentDidMount() {
        console.log(findNodeHandle(this.triggerElt!));
        UIManager.measure(findNodeHandle(this.triggerElt!), (...args) => {
            console.log(args);
        });
    }

    onTriggerContainerLayout = (event: LayoutChangeEvent) => {
        const { layout } = event.nativeEvent;
        this.triggerFrame = layout;

        if (this.props.isOpen) {
            this.forceUpdate();
        }
    };

    onContentLayout = (event: LayoutChangeEvent) => {
        const { layout } = event.nativeEvent;
        this.setState({ contentLayout: layout });
    };

    private calculateContentOffset() {
        const {
            width: contentWidth,
            height: contentHeight,
        } = this.state.contentLayout;
        const windowWidth = Dimensions.get('window').width;
        let xOffset =
            this.triggerFrame.x +
            this.triggerFrame.width / 2 -
            contentWidth / 2;

        if (xOffset + contentWidth > windowWidth) {
            xOffset -= xOffset + contentWidth - windowWidth;
        }

        if (xOffset < 0) {
            xOffset = 0;
        }

        let yOffset = 0;
        switch (this.props.anchor) {
            case 'down':
                yOffset =
                    this.triggerFrame.y + this.triggerFrame.height + ArrowSize;
                break;

            case 'up':
                yOffset = this.triggerFrame.y - ArrowSize - contentHeight;
                break;
        }

        return { left: xOffset, top: yOffset };
    }

    private calculateArrowOffset() {
        const { x, y, width, height } = this.triggerFrame;
        switch (this.props.anchor) {
            case 'down':
                return [
                    {
                        top: y + height,
                        left: x + width / 2 - ArrowSize,
                    },
                    arrowStyles.up(ArrowSize, this.props.arrowColor),
                ];

            case 'up':
                return [
                    {
                        top: y - ArrowSize,
                        left: x + width / 2 - ArrowSize,
                    },
                    arrowStyles.down(ArrowSize, this.props.arrowColor),
                ];
        }
    }

    private calculateArrowShape() {
        switch (this.props.anchor) {
            case 'down':
                return arrowStyles.up(ArrowSize, this.props.arrowColor);

            case 'up':
                return arrowStyles.down(ArrowSize, this.props.arrowColor);
        }
    }
}

interface ArrowProps {
    style: StyleProp<ViewStyle>;
}
function Arrow({ style }: ArrowProps) {
    return <View style={style} />;
}

function Backdrop({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
            }}
        />
    );
}

const arrowStyles = {
    up(size: number, color: string) {
        return {
            borderLeftColor: 'transparent',
            borderLeftWidth: size,
            borderRightWidth: size,
            borderRightColor: 'transparent',
            borderBottomColor: color,
            borderBottomWidth: size,
            width: 0,
            height: 0,
        };
    },

    down(size: number, color: string) {
        return {
            borderLeftColor: 'transparent',
            borderLeftWidth: size,
            borderRightWidth: size,
            borderRightColor: 'transparent',
            borderTopColor: color,
            borderTopWidth: size,
            width: 0,
            height: 0,
        };
    },
};
