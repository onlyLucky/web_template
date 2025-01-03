import { Message } from 'view-ui-plus'
let messageInstance = null;
const resetMessage = (options) => {
  if (messageInstance) {
    Message.destroy()
    console.log(1)
  } else {
    Message[options.type](options.message)
  }
  messageInstance = true
  setTimeout(() => {
    messageInstance = null
  }, 5000);
};
['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})
export const message = resetMessage