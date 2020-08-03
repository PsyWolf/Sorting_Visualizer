import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./SortingBars.css";

class SortingBars extends Component {
    render() {
        const { array, currentSwappers, currentSorted, pivot, currentComparison } = this.props;

        var body = document.body,
            html = document.documentElement;

        var realheight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        let numHeight = Math.floor(realheight / (array.length * 1.75));

        const numMargin = array.length < 5 ?
            10 : array.length < 8 ?
                8 : array.length < 11 ?
                    6 : array.length < 20 ?
                        4 : array.length < 50 ?
                            3.5 : 2.5;

        const height = numHeight - numMargin > 1 ? `${numHeight - numMargin}px` : "1px";

        const margin = `${numMargin}px`;
        const color = numHeight > 20 ? "white" : "transparent";
        const numFont = numHeight > 70 ?
            20 : numHeight > 60 ?
                18 : numHeight > 50 ?
                    16 : numHeight > 40 ?
                        14 : numHeight > 30 ?
                            12 : numHeight > 20 ?
                                10 : 0;
        const fontSize = `${numFont}px`;

        return (
            <div id="barsContainer">
                {array.length ? array.map((number, index) => {
                    const backgroundColor = currentSwappers.includes(index) ?
                        "rgba(219, 57, 57, 0.8)" : currentComparison.includes(index) ?
                            "#38b200" : pivot === index ?
                                "rgba(237, 234, 59, 0.8)" : currentSorted.includes(index) ?
                                    "#FCA669" : "#38b200";
                    return <div
                        className="arrayElement"
                        key={index}
                        style={{
                            height: height,
                            width: `${number}px`,
                            marginTop: margin,
                            marginBottom: margin,
                            backgroundColor: backgroundColor,
                            color: color,
                            fontSize: fontSize
                        }}>
                        {number}
                    </div>;
                }) : null
                }
            </div>
        );
    }
}

const mapStateToProps = ({ array, currentSwappers, currentSorted, pivot, currentComparison }) => ({
    array, currentSwappers, currentSorted, pivot, currentComparison
});

export default connect(mapStateToProps, {})(SortingBars);