# react-native-popup

Popup control that can show above/below the trigger button. Tapping outside closes the popup.

## API and Usage

Exposes a single component `PopupButton`.

```typescript jsx
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
    anchor={'up'}
    renderContent={this.renderPopupBody}
    isOpen={this.state.visible && this.state.index === x}
    onPress={() => this.togglePopup(x)}
    onClose={() => this.togglePopup(x)}
    contentStyle={{
        width: '80%',
        height: '50%',
        backgroundColor: 'lightgray',
    }}
>
    <Text>Open</Text>
</PopupButton>
```

## Popup anchored down

![Down](_screenshots/down.png)

## Popup anchored up

![Up](_screenshots/up.png)
