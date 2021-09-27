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
    onDragStart = (event) => {
        event.dataTransfer.setData("text", event.target.id);
    }
    onDragOver = (event) => {
        event.preventDefault();
    }
    onDrop = (event) => {
        event.preventDefault();
        let original = event.dataTransfer.getData("text");
        let originalIndex = parseInt(original.substring(5,6), 10);
        let newIndex = parseInt(event.target.id.substring(15,16), 10);
        if(originalIndex !== newIndex) {
            console.log(originalIndex);
            console.log(newIndex);
            this.props.moveItemCallback(originalIndex, newIndex);
        }
    }

    render() {
        const { currentList, index, moveItemCallback } = this.props;
        if (this.state.editActive) {
            return (
                <input
                    id={"item-" + index}
                    className='top5-item'
                    type='text'
                    onKeyPress={this.handleItemKeyPress}
                    onFocus={this.handleItemFocus}
                    onBlur={this.handleItemBlur}
                    onChange={this.handleItemUpdate}
                    defaultValue={currentList.items[index]}
                    moveItemCallback={moveItemCallback}
                />)
        }

        return (
            
            <div
                id={"item-" + index}
                onClick={this.handleItemClick}
                className={'top5-item '}
                draggable
                onDragStart={(e) => this.onDragStart(e)}
                onDragOver={(e) => this.onDragOver(e, e.target.id)}
                onDrop={(e) => this.onDrop(e)}>
                <span
                    id={"top5-item-text-" + index}
                    className="top5-item-text">
                    {currentList.items[index]}
                </span>
            </div>
        );
    }
}