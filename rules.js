import React from 'react'
import {
      Image,
      Text,
      View,
      } from 'react-native';
import SimpleMarkdown from 'simple-markdown';
import _ from 'lodash'

module.exports = function (styles) {
  return {
    autolink: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.autolink,
          onPress: _.noop
        }, output(node.content, state));
      }
    },
    blockQuote: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.blockQuote
        }, output(node.content, state));
      }
    },
    br: {
      react(node, output, state) {
        return React.createElement(Text, {
          key: state.key,
          style: styles.br
        }, '\n\n');
      }
    },
    codeBlock: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.codeBlock
        }, null);
      }
    },
    del: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.del
        }, output(node.content, state));
      }
    },
    em: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.em
        }, output(node.content, state));
      }
    },
    heading: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: [styles.heading, styles['heading' + node.level]]
        }, output(node.content, state));
      }
    },
    hr: {
      react(node, output, state) {
        return React.createElement(View, {key: state.key, style: styles.hr});
      }
    },
    image: {
      react(node, output, state) {
        return React.createElement(Image, {
          key: state.key,
          source: {uri: node.target},
          style: styles.image
        });
      }
    },
    inlineCode: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.inlineCode
        }, output(node.content, state));
      }
    },
    link: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.autolink
        }, output(node.content, state));
      }
    },
    list: {
      react(node, output, state) {

        var items = _.map(node.items, function (item, i) {
          var bullet;
          if (node.ordered) {
            bullet = React.createElement(Text, {style: styles.listItemNumber}, (i + 1) + '. ');
          }
          else {
            bullet = React.createElement(Text, {style: styles.listItemBullet}, '\u2022 ');
          }
          return React.createElement(View, {
            key: i,
            style: styles.listItem
          }, [bullet, output(item, state)]);
        });

        return React.createElement(View, {key: state.key, style: styles.list}, items);
      }
    },
    mailto: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.mailto,
          onPress: _.noop
        }, output(node.content, state));
      }
    },
    newline: {
      react(node, output, state) {
        return React.createElement(Text, {
          key: state.key,
          style: styles.newline
        }, '\n');
      }
    },
    paragraph: {
      react(node, output, state) {
        return React.createElement(View, {
          key: state.key,
          style: styles.paragraph
        }, output(node.content, state));
      }
    },
    strong: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.strong
        }, output(node.content, state));
      }
    },
    table: {
      react(node, output, state) {
        var headers = _.map(node.header, function (content, i) {
          return React.createElement(Text, {
            style: styles.tableHeaderCell
          }, output(content, state));
        });

        var header = React.createElement(View, {style: styles.tableHeader}, headers);

        var rows = _.map(node.cells, function (row, r) {
          var cells = _.map(row, function (content, c) {
            return React.createElement(View, {
              key: c,
              style: styles.tableRowCell
            }, output(content, state));
          });
          var rowStyles = [styles.tableRow];
          if (node.cells.length - 1 == r) {
            rowStyles.push(styles.tableRowLast);
          }
          return React.createElement(View, {key: r, style: rowStyles}, cells);
        });

        return React.createElement(View, {key: state.key, style: styles.table}, [header, rows]);
      }
    },
    text: {
      react(node, output, state) {
        // Breaking words up in order to allow for text reflowing in flexbox
        var words = node.content.split(' ');
        words = _.map(words, function (word, i) {
          var elements = [];
          if (i != words.length - 1) {
            word = word + ' ';
          }
          var textStyles = [styles.text];
          if (!state.withinText) {
            textStyles.push(styles.plainText);
          }
          return React.createElement(Text, {
            style: textStyles
          }, word);
        });
        return words;
      }
    },
    u: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(View, {
          key: state.key,
          style: styles.u
        }, output(node.content, state));
      }
    },
    url: {
      react(node, output, state) {
        state.withinText = true;
        return React.createElement(Text, {
          key: state.key,
          style: styles.url,
          onPress: _.noop
        }, output(node.content, state));
      }
    }
  }
};
