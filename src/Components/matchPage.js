import React, { Component } from 'react';

class MatchPage extends Component {
    render() {
        return (
            <div>
                MatchPage {this.props.match.params.match_id}
            </div>
        );
    }
}

export default MatchPage;