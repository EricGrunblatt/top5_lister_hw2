import React from "react";

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            currentList: this.props.currentList,
            index: this.props.index,
            text: this.props.currentList.items[this.props.index],
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
        let itemIndex = this.state.index;
        if(textValue !== this.state.currentList.items[itemIndex]) {
            this.props.renameItemCallback(itemIndex, textValue);
        }
        else if(textValue === "") {
            this.props.renameItemCallback(itemIndex, "?");
        }
        this.handleItemToggleEdit();
    }
    onDragStart = (event) => {
        event.dataTransfer.setData("text", event.target.id);
    }
    onDragOver = (event) => {
        event.preventDefault();
        event.target.className = "top5-item top5-item-dragged-to";
    }
    onDragLeave = (event) => {
        event.preventDefault();
        event.target.className = "top5-item ";
    }   
    onDrop = (event) => {
        event.preventDefault();
        let original = event.dataTransfer.getData("text");
        let originalIndex = parseInt(original.substring(5,6), 10);
        let newIndex = parseInt(event.target.id.substring(5,6), 10);

        console.log(originalIndex);
        console.log(newIndex);

        event.target.className = "top5-item ";
        if(originalIndex !== newIndex) {
            this.props.moveItemCallback(originalIndex, newIndex);
        }
    }

    render() {
        const { currentList, index } = this.props;
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
                />)
        }
        return (
            <div
                id={"item-" + index}
                onClick={this.handleItemClick}
                className={'top5-item '}
                draggable
                onDragStart={(e) => this.onDragStart(e)}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e)}
                onDragLeave={(e) => this.onDragLeave(e)}>
                {currentList.items[index]}
            </div>
        );
    }
}