const kexecO = require('kexec')

const kexec = (input) => {
  if (Array.isArray(input)) { input = input.join(' ') }
  const parts = input.split(' ')
  const command = parts[0]
  const args = parts.slice(1).filter(v => v !== '')
  return kexecO(command, args)
}

module.exports = kexec
