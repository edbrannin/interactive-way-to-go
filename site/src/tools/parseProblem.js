import xml2js from 'xml2js-es6-promise';

const coords = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];

const LETTER_COORDINATE_REGEX = /([a-t])([a-t])/i

const convertCoordinateLettersToLetterNumber = original => {
  const [, col, row] = LETTER_COORDINATE_REGEX.exec(original);
  return `${col.toLowerCase()}${coords.findIndex(item => item === row.toLowerCase()) + 1}`;
}

const initialSetup = init => {
  const INIT_REGEX = /([BW])\[([a-t]{2})\]/ig
  const colors = { B: 'black', W: 'white' };
  const answer = {};
  let match = INIT_REGEX.exec(init);
  while (match) {
    const [, color, position] = match;
    answer[convertCoordinateLettersToLetterNumber(position)] = colors[color];
    match = INIT_REGEX.exec(init);
  }
  return answer;
}

const parsePlay = ({ $: { pos, res, message }, play }) => {
  const [msg, style] = message.split('@')
  // Default was called 'zz' in the xml
  const playPosition = pos === 'zz' ? 'default' : pos;
  return [
    playPosition,
    {
      response: res,
      message: msg,
      style,
      // plays: parsePlays(play)
    }
  ];
}

const parsePlays = plays => {
  return plays.map(parsePlay).reduce((o, [pos, value]) => {
    o[pos] = value;
    return o;
  }, {});
}

/*
    {
      "data": {
        "name": [
          "50K-1"
        ],
        "size": [
          "9"
        ],
        "init": [
          "B[de]W[ee]B[ed]B[ef]"
        ],
        "sequence": [
          {
            "play": [
              {
                "$": {
                  "pos": "fe",
                  "message": "success@red"
                }
              },
              {
                "$": {
                  "pos": "zz",
                  "res": "fe",
                  "message": "failed@blue"
                }
              }
            ]
          }
        ]
      }
    }
*/

const parseProblem = async (xmlSource) => {
  const sourceObject = await xml2js(xmlSource);
  console.log(JSON.stringify(sourceObject, null, 2));
  const data = sourceObject.data;
  return {
    size: Number(data.size[0]),
    stones: initialSetup(data.init[0]),
    plays: parsePlays(data.sequence[0].play),
  }
}

export default parseProblem;
export {
  initialSetup,
  convertCoordinateLettersToLetterNumber,
}
