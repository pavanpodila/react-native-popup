import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PopupButton } from './popup';

type State = {
    visible: boolean;
    index: number;
};
export default class App extends Component<{}, State> {
    public state = {
        visible: false,
        index: -1,
    };

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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => (
                    <PopupButton
                        key={x}
                        style={{
                            borderWidth: 1,
                            borderColor: 'blue',
                            padding: 10,
                            width: '30%',
                            marginBottom: 20,
                        }}
                        renderContent={this.renderPopupBody}
                        visible={this.state.visible && this.state.index === x}
                        onPress={() => this.togglePopup(x)}
                        onClose={() => this.togglePopup(x)}
                        containerStyle={{
                            width: '80%',
                            height: '100%',
                            backgroundColor: 'gray',
                        }}
                    >
                        <Text>Open</Text>
                    </PopupButton>
                ))}
            </View>
        );
    }

    renderPopupBody = () => {
        return (
            <View
                style={{
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
