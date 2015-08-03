import React from 'react';

export default class Implem extends React.Component {
  render() {
    const style = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: '75%',
      backgroundColor: 'white',
      border: '3px solid rgb(175, 30, 58)',
      padding: '5px',
      overflow: 'auto'
    };

    return (
      <section style={style}>
        <h1 style={{marginBottom: '10px'}}>{this.props.title}</h1>
        <article dangerouslySetInnerHTML={{__html: this.props.readme}}></article>
        <a href="../">Back to Quizz Boxes home</a>
      </section>
    );
  }
}
