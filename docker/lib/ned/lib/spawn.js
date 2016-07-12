const cp = require('child_process')

const spawn = (input, options) => {
  if (Array.isArray(input)) { input = input.join(' ') }
  const parts = input.split(' ')
  const command = parts[0]
  const args = parts.slice(1).filter(v => v !== '')
  return cp.spawn(command, args, options)
}

spawn.through = (command, options, p = process) => {
  const s = spawn(command, options)
  p.stdout && s.stdout.pipe(p.stdout)
  p.stderr && s.stderr.pipe(p.stderr)
  return s
}

module.exports = spawn
