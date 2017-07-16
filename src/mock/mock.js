
let data = [
  {
    title: '列表头1',
    item: [
      {
        text: 'this is the first title',
        id: 1,
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: true, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: true, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: true, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: false, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {
          text: '你很可爱你知道吗？？？？？',
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
            userName: 'Liufuwei',
            text: '你是不是傻',
            addtime: new Date('2017 7 4 12:20')
          },
          {
            id: 2,
            userName: 'Xiejunxing',
            text: '可能是',
            addtime: new Date('2017 7 4 14:20')
          },
          {
            id: 3,
            userName: 'Fq',
            text: '憋说了,我傻还不行吗',
            addtime: new Date('2017 7 4 14:21')
          }
        ],
        deadline: new Date('2017 9 10 14:20')
      },
      {
        text: '标题3',
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
    title: '列表头2',
    item: [
      {
        text: 'this is the second title',
        id: 1,
        labels: [
          {id: 1, text: '今天完成', color: 'blue', picked: true, editting: false},
          {id: 2, text: '明晚完成', color: 'yellow', picked: true, editting: false},
          {id: 3, text: '这个很重要', color: 'red', picked: false, editting: false},
          {id: 4, text: '随便做做', color: 'green', picked: true, editting: false},
          {id: 5, text: '其他', color: 'pink', picked: false, editting: false}
        ],
        des: {
          text: '不会做啊',
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
            userName: 'Liufuwei111',
            text: '你是不是傻',
            addtime: new Date('2017 7 4 12:20')
          },
          {
            id: 2,
            userName: 'Xiejunxing',
            text: '可能是2222',
            addtime: new Date('2017 7 4 14:20')
          }
        ],
        deadline: new Date('2016 1 10 14:20')
      },
      {
        text: '标题3',
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
    title: '列表头3',
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
          text: 'Mc俊星',
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
            userName: 'Liufuwei111',
            text: '你是不是傻',
            addtime: new Date('2017 7 4 12:20')
          },
          {
            id: 2,
            userName: 'Xiejunxing',
            text: '可能是2222',
            addtime: new Date('2017 7 4 14:20')
          }
        ],
        deadline: new Date('2017 7 10 14:20')
      },
      {
        text: '标题3',
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
