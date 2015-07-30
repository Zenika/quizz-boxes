import React from 'react';

export default class Implem extends React.Component {
  render() {
    return (
      <section>
        <h1>{this.props.title}</h1>
        <article dangerouslySetInnerHTML={{__html: this.props.readme}}></article>
      </section>
    );
  }
}
