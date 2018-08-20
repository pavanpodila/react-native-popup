import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules } from 'react-native';
import { PopupButton } from './popup';

type State = {
    visible: boolean;
    index: number;
    height: number;
};
const items = new Array(30).fill(0).map((x, index) => index);
console.log({ NativeModules });
export default class App extends Component<{}, State> {
    public state = {
        visible: false,
        index: -1,
        height: 50,
    };

    private timer: number = 0;

    render() {
        return (
            <View
                style={[
                    styles.container,
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    },
                ]}
            >
                {items.map(x => (
                    <PopupButton
                        key={x}
                        style={{
                            borderWidth: 1,
                            borderColor: 'blue',
                            padding: 10,
                            width: '30%',
                            marginBottom: 20,
                        }}
                        arrowColor={'black'}
                        anchor={'down'}
                        renderContent={this.renderPopupBody}
                        isOpen={this.state.visible && this.state.index === x}
                        onPress={() => this.togglePopup(x)}
                        onClose={() => this.togglePopup(x)}
                        contentStyle={{
                            width: `${this.state.height}%`,
                            height: '50%',
                            backgroundColor: 'lightgray',
                        }}
                    >
                        <Text>Open</Text>
                    </PopupButton>
                ))}
            </View>
        );
    }
    public componentDidMount() {
        // this.timer = setInterval(() => {
        //     this.setState({ height: (this.state.height + 19) % 70 });
        // }, 1000);
    }

    public componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    renderPopupBody = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Text>Hello World</Text>
                <Text>Hello World</Text>
            </View>
        );
    };

    private togglePopup = (index: number) => {
        this.setState({ visible: !this.state.visible, index });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
