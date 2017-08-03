
let data = [
  {
    title: 'List1',
    item: [
      {
        text: 'This is the first title',
        id: 1,
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: true, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: true, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: true, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: false, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {
          text: 'This is List1 description.',
          addtime: new Date('2017 6 4 14:38')
        },
        attachments: [
          {
            id: 1,
            type: 'image',
            title: 'pic1',
            src: 'http://www.semantic-ui-cn.com/images/avatar/large/elliot.jpg',
            addtime: new Date('2017 7 4 12:20')
          }
        ],
        comments: [
          {
            id: 1,
            userName: 'Elliot',
            text: 'How artistic!',
            addtime: new Date('2017 7 4 12:20')
          },
          {
            id: 2,
            userName: 'Matt ',
            text: 'This has been very useful for my research. Thanks as well!',
            addtime: new Date('2017 7 4 14:20')
          },
          {
            id: 3,
            userName: 'Joe Henderson ',
            text: 'Dude, this is awesome. Thanks so much',
            addtime: new Date('2017 7 4 14:21')
          }
        ],
        deadline: new Date('2017 9 10 14:20')
      },
      {
        text: 'Title3',
        id: 3,
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: false, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: false, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: false, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {},
        attachments: [
        ],
        comments: [
        ],
        deadline: null
      }
    ]
  },
  {
    title: 'List2',
    item: [
      {
        text: 'This is the second title',
        id: 1,
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: true, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: true, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: true, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {
          text: 'This is List2 description.',
          addtime: new Date('2017 6 4 14:38')
        },
        attachments: [
          {
            id: 1,
            type: 'image',
            title: 'pic1',
            src: 'http://www.semantic-ui-cn.com/images/avatar/large/stevie.jpg',
            addtime: new Date('2017 8 4 12:20')
          }
        ],
        comments: [
          {
            id: 1,
            userName: 'Stevie Feliciano',
            text: 'Hey guys, I hope this example comment is helping you read this documentation.',
            addtime: new Date('2017 7 4 12:20')
          },
          {
            id: 2,
            userName: 'Tom Lukic',
            text: 'This will be great for business reports. I will definitely download this.',
            addtime: new Date('2017 7 4 14:20')
          }
        ],
        deadline: new Date('2016 1 10 14:20')
      },
      {
        text: 'Title3',
        id: 3,
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: false, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: false, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: false, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {},
        attachments: [
        ],
        comments: [
        ],
        deadline: null
      }
    ]
  },
  {
    title: 'List3',
    item: [
      {
        text: 'this is the third title',
        id: 1,
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: true, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: true, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: false, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {
          text: 'Jehoshaphat',
          addtime: new Date('2017 4 4 14:38')
        },
        attachments: [
          {
            id: 1,
            type: 'image',
            title: 'pic1',
            src: 'http://www.semantic-ui-cn.com/images/avatar/large/steve.jpg',
            addtime: new Date('2017 8 4 12:20')
          }
        ],
        comments: [
          {
            id: 1,
            userName: 'Steve Jobes ',
            text: 'I\'m very interested in this motherboard. Do you know if it\'d work in a Intel LGA775 CPU socket?',
            addtime: new Date('2017 7 4 12:20')
          },
          {
            id: 2,
            userName: 'Jehoshaphat Tse',
            text: 'I re-tweeted this.',
            addtime: new Date('2017 7 4 14:20')
          }
        ],
        deadline: new Date('2017 7 10 14:20')
      },
      {
        text: 'Title3',
        id: 3,
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: false, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: false, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: false, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {},
        attachments: [
        ],
        comments: [
        ],
        deadline: null
      }
    ]
  }
]
export default data
