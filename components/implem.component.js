import React from 'react';

export default class Implem extends React.Component {
  render() {
    const style = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: '75%',
      backgroundColor: 'white'
    };

    return (
      <section style={style}>
        <h1>{this.props.title}</h1>
        <article dangerouslySetInnerHTML={{__html: this.props.readme}}></article>
      </section>
    );
  }
}
