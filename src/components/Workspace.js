import React from "react";

export default class Workspace extends React.Component {
    
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
        console.log("Item handleBlur: " + textValue);
        this.handleItemToggleEdit();
    }
/*
    <input
                                    id={"list-" + currentList.items[0]}
                                    className='list-card'
                                    type='text'
                                    onKeyPress={this.handleItemKeyPress}
                                    onFocus={this.handleItemFocus}
                                    onBlur={this.handleItemBlur}
                                    onChange={this.handleItemUpdate}
                                    defaultValue={currentList.items[0]}
                                />)

*/
    

    render() {
        const { currentList } = this.props;
        if(currentList !== null) {
            return (
                <div id="top5-workspace">
                    <div id="workspace-edit">
                        <div id="edit-numbering">
                            <div className="item-number">1.</div>
                            <div className="item-number">2.</div>
                            <div className="item-number">3.</div>
                            <div className="item-number">4.</div>
                            <div className="item-number">5.</div>
                        </div>
                        <div id="edit-items">
                            <div id="item-1" className="top5-item" draggable="true">
                                {currentList.items[0]}
                            </div>
                            <div id="item-2" className="top5-item" draggable="true">{currentList.items[1]}</div>
                            <div id="item-3" className="top5-item" draggable="true">{currentList.items[2]}</div>
                            <div id="item-4" className="top5-item" draggable="true">{currentList.items[3]}</div>
                            <div id="item-5" className="top5-item" draggable="true">{currentList.items[4]}</div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div id="top5-workspace">
                <div id="workspace-edit">
                    <div id="edit-numbering">
                        <div className="item-number">1.</div>
                        <div className="item-number">2.</div>
                        <div className="item-number">3.</div>
                        <div className="item-number">4.</div>
                        <div className="item-number">5.</div>
                    </div>
                </div>
            </div>
        )
    }
}