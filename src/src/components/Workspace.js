import React from "react";
import ItemCard from "./ItemCard";

export default class Workspace extends React.Component {
    
    render() {
        const { currentList, renameItemCallback } = this.props;
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
                        {
                            currentList.items.map((item, index) => (
                                <ItemCard 
                                    index={index}
                                    currentList={currentList}
                                    key={currentList + "-item-" + index}
                                    renameItemCallback={renameItemCallback}
                                />
                            ))
                        }
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