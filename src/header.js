import React from 'react'
import connect from './reactRedux'


 class Header extends React.Component {
    render() {
        return (
            <div className="hello-header" onClick={this.props.reverse}>
                {this.props.text}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        text: state.text
    }
}
const mapDispatchToProps = (
    dispatch,
    ownProps
) => {
    return {
        reverse: () => {
            dispatch({
                type: 'reverse_text',
            });
        }
    };
}

const HeaderWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
export default HeaderWrapper
