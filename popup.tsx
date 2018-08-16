import React, { Fragment } from 'react';
import {
    Modal,
    TouchableOpacity,
    View,
    ViewStyle,
    LayoutChangeEvent,
    LayoutRectangle,
    Dimensions,
} from 'react-native';

interface Props {
    visible: boolean;
    children: React.ReactNode;
    renderContent: () => React.ReactNode;
    style?: ViewStyle;
    containerStyle?: ViewStyle;
    onClose: () => void;
    onPress: () => void;
}
interface State {
    contentLayout: LayoutRectangle;
}
export class PopupButton extends React.Component<Props, State> {
    private triggerElt?: React.ReactNode;
    private arrowOffset = {
        x: 0,
        y: 0,
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
            visible,
            containerStyle,
            style,
            onClose,
            onPress,
        } = this.props;

        return (
            <Fragment>
                <TouchableOpacity
                    ref={elt => (this.triggerElt = elt)}
                    onPress={onPress}
                    onLayout={this.onTriggerContainerLayout}
                    style={style}
                >
                    {children}
                </TouchableOpacity>
                <Modal
                    visible={visible}
                    transparent={true}
                    supportedOrientations={['landscape', 'portrait']}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                        }}
                    >
                        <TouchableOpacity
                            onPress={onClose}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                top: 0,
                            }}
                        />
                        <View>
                            <Arrow
                                style={{
                                    top: this.arrowOffset.y,
                                    left: this.arrowOffset.x - ArrowSize,
                                }}
                            />
                        </View>
                        <View
                            onLayout={this.onContentLayout}
                            style={[
                                containerStyle,
                                {
                                    left: this.calculateContentOffset(),
                                    top: this.arrowOffset.y,
                                },
                            ]}
                        >
                            {renderContent()}
                        </View>
                    </View>
                </Modal>
            </Fragment>
        );
    }

    onTriggerContainerLayout = (event: LayoutChangeEvent) => {
        const { layout } = event.nativeEvent;
        this.arrowOffset = {
            x: layout.x + layout.width / 2,
            y: layout.y + layout.height,
        };

        console.log(this.arrowOffset);
        if (this.props.visible) {
            this.forceUpdate();
        }
    };

    onContentLayout = (event: LayoutChangeEvent) => {
        const { layout } = event.nativeEvent;
        this.setState({ contentLayout: layout });

        console.log(layout);
    };

    private calculateContentOffset() {
        const { width: contentWidth } = this.state.contentLayout;
        const windowWidth = Dimensions.get('window').width;
        let idealOffset = this.arrowOffset.x - contentWidth / 2;

        if (idealOffset + contentWidth > windowWidth) {
            idealOffset -= idealOffset + contentWidth - windowWidth;
        }

        if (idealOffset < 0) {
            idealOffset = 0;
        }

        return idealOffset;
    }
}

const ArrowSize = 10;
function Arrow({ style }: { style: ViewStyle }) {
    return (
        <View
            style={[
                style,
                {
                    borderLeftColor: 'transparent',
                    borderLeftWidth: ArrowSize,
                    borderRightWidth: ArrowSize,
                    borderRightColor: 'transparent',
                    borderBottomColor: 'red',
                    borderBottomWidth: ArrowSize,
                    width: 0,
                    height: 0,
                },
            ]}
        />
    );
}
