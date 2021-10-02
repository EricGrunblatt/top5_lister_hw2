import React from "react";

export default class EditToolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editActive: false,
        }
    }

    keydownHandler = (e) => {
        console.log(this.props.tps.hasTransactionToRedo());
        if(e.keyCode===90 && e.ctrlKey) { 
            this.props.undoCallback();
        }
        else if(e.keyCode===89 && e.ctrlKey) {
            this.props.redoCallback();
        }
        this.setState({
            editActive: false
        })
        console.log(this.props.tps.hasTransactionToRedo());
        this.render();
    }
    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }

    render() {
        let buttonUndo = "";
        let buttonRedo = "";
        let buttonClose = "";
        if(this.state.editActive) {
            buttonUndo = "-disabled disabled";
            buttonRedo = "-disabled disabled";
            buttonClose = "-disabled disabled";
        }
        if(!this.props.tps.hasTransactionToUndo()) {
            buttonUndo = "-disabled disabled";
        }
        if(!this.props.tps.hasTransactionToRedo()) {
            buttonRedo = "-disabled disabled";
        }
        if(this.props.currentList === null) {
            buttonClose = "-disabled disabled";
        }

        const { closeCallback, undoCallback, redoCallback } = this.props
        return (
            <div id="edit-toolbar">
                <div 
                    id='undo-button' 
                    className={'top5-button' + buttonUndo}
                    onClick={undoCallback}
                    onKeyDown={this.onKeyPressed}>
                        &#x21B6;
                </div>
                <div
                    id='redo-button'
                    className={'top5-button' + buttonRedo}
                    onClick={redoCallback}
                    onKeyDown={this.onKeyPressed}>
                        &#x21B7;
                </div>
                <div
                    id='close-button'
                    className={'top5-button' + buttonClose}
                    onClick={closeCallback}>
                        &#x24E7;
                </div>
            </div>
        )
    }
}