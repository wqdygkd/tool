import './GM.ts'

const NOOP = () => {}
const href = window.location.href
const rules = {
  '://blog.csdn.net/*': {
    addStyle: `* { -webkit-user-select: text !important; -moz-user-select: text !important; } ::selection { color: #fff; background: #3390FF; } .article-search-tip { display: none !important; }`,
    hookEventNames: ['copy']
  }
}

const addEventListener = EventTarget.prototype.addEventListener
// var Event_preventDefault = Event.prototype.preventDefault

function init() {
  console.log('复制限制解除 init')
  Object.entries(rules).forEach(([key, rule]) => {
    if (new RegExp(key).test(href)) {
      if (rule.addStyle) GM_addStyle(rule.addStyle)

      let hookEventNames = rule.hookEventNames || []
      function hockAddEventListener (this: any, ...args: Parameters<typeof addEventListener>): ReturnType<typeof addEventListener> {
        let [type, ,useCapture] = args
        if (hookEventNames.indexOf(type) >= 0) {
          addEventListener.apply(this, [type, NOOP, useCapture])
        } else {
          addEventListener.apply(this, args)
        }
      }

      EventTarget.prototype.addEventListener = hockAddEventListener

      // if(rule.hook_preventDefault) {
      //   Event.prototype.preventDefault = function() {
      //       if(hook_eventNames.indexOf(this.type) < 0) {
      //           Event_preventDefault.apply(this, arguments);
      //       }
      //   }
      // }
    }
  })
}

init()
