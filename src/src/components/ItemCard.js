import React from "react";

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            text: "",
            editActive: false,
        }
    }
    
    handleItemClick = (event) => {
        if (event.detail === 2) {
            this.handleItemToggleEdit(event);
        }
    }
    handleItemToggleEdit = (event) => {
        this.setState({
            editActive: !this.state.editActive
        });
    }
    handleItemUpdate = (event) => {
        this.setState({ text: event.target.value });
    }
    handleItemKeyPress = (event) => {
        if (event.code === "Enter") {
            this.handleItemBlur();
        }
    }
    handleItemFocus = (event) => {
        event.target.select();
    }
    handleItemBlur = () => {
        let textValue = this.state.text;
        let itemIndex = this.props.index;
        if(textValue !== this.props.currentList.items[itemIndex]) {
            this.props.renameItemCallback(itemIndex, textValue);
        }
        this.handleItemToggleEdit();
    }

    render() {
        const { currentList, index } = this.props;
        if (this.state.editActive) {
            return (
                <input
                    id={"item-" + index+1}
                    className='top5-item'
                    type='text'
                    onKeyPress={this.handleItemKeyPress}
                    onFocus={this.handleItemFocus}
                    onBlur={this.handleItemBlur}
                    onChange={this.handleItemUpdate}
                    defaultValue={currentList.items[index]}
                />)
        }
        return (
            <div
                id={"item-" + index}
                onClick={this.handleItemClick}
                className={'top5-item'}>
                <span
                    id={"top5-item-text-" + index+1}
                    className="top5-item-text">
                    {currentList.items[index]}
                </span>
            </div>
        );
    }
}