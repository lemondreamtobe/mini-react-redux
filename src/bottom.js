import React from 'react'
import connect from './reactRedux'

class Bottom extends React.Component {

    render() {
        return (
            <div className="hello-bottom">
                <button onClick={this.props.reverse}>{this.props.bottomText}</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    
    return {
        bottomText: state.bottomText
    }
}
const mapDispatchToProps = (
    dispatch,
    ownProps
) => {
    return {
        reverse: () => {
            dispatch({
                type: 'reverse_button',
            });
        }
    };
}

const BottomWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Bottom)
export default BottomWrapper